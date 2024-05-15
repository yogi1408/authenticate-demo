import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ContactRepo } from 'src/shared/dbaccess/contact.repo';
import { UserRepo } from 'src/shared/dbaccess/user.repo';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ContactService {
  constructor(
    private contactRepo: ContactRepo,
    private userRepo: UserRepo,
    private userService: UserService,
  ) {}
  async createContact(res, req) {
    const token = req.headers['authorization'];
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }
    const user = await this.userService.validateToken(token.split(' ')[1]);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    const { name, phone, email } = req.body;
    const newContact = await this.contactRepo.create({
      name,
      phone,
      email,
      user_link: user.id,
    });

    return res.status(201).send({
      data: newContact,
    });
  }

  async spamContact(res, req, phone) {
    const token = req.headers['authorization'];
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }
    const user = await this.userService.validateToken(token.split(' ')[1]);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    const contacts = await this.contactRepo.getAll({
      where: {
        phone: phone,
      },
    });

    if (contacts.length === 0) {
      return res.status(404).send({
        message: 'Contacts not found for the provided phone number',
      });
    }

    for (let contact of contacts) {
      await this.contactRepo.update({
        where: {
          id: contact.id,
        },
        data: {
          is_spam: true,
          spam_count: { increment: 1 },
        },
      });
    }

    return res.status(200).send({
      message: 'Contacts marked as spam',
    });
  }

  async searchContactByPhone(res, req, phone: string) {
    const token = req.headers['authorization'];
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }
    const user = await this.userService.validateToken(token.split(' ')[1]);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    const contactWithUserLink: any = await this.contactRepo.getAllWith({
      where: {
        phone: phone,
        user_link: {
          not: null,
        },
      },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        is_spam: true,
        spam_count: true,
      },
    });

    if (contactWithUserLink && contactWithUserLink.length > 0) {
      return res.status(200).send({
        data: contactWithUserLink,
      });
    } else {
      const contacts: any = await this.contactRepo.getAllWith({
        where: {
          phone: phone,
        },
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
          is_spam: true,
          spam_count: true,
        },
      });

      if (contacts.length === 0) {
        return res.status(404).send({
          message: `Contact with phone: ${phone} not found`,
        });
      }
      return res.status(200).send({
        data: contacts,
      });
    }
  }

  async searchContactByName(res, req, name: string) {
    const token = req.headers['authorization'];
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }
    const user = await this.userService.validateToken(token.split(' ')[1]);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    const contacts: any = await this.contactRepo.getAllWith({
      where: {
        OR: [
          { name: { startsWith: name } },
          { name: { contains: name, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        is_spam: true,
        spam_count: true,
      },
    });

    if (contacts.length === 0) {
      return res.status(404).send({
        message: `Contact with name: ${name} not found`,
      });
    }
    return res.status(200).send({
      data: contacts,
    });
  }

  async searchContact(res, req) {
    const token = req.headers['authorization'];
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }
    const user = await this.userService.validateToken(token.split(' ')[1]);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    const contacts: any = await this.contactRepo.getAllWith({});

    if (contacts.length === 0) {
      return res.status(404).send({
        message: `No contact found`,
      });
    }

    const modifiedContacts = contacts.map((contact) => {
      if (contact.user_link === user.id || contact.user_link !== null) {
        return {
          ...contact,
          email: contact.email,
        };
      } else {
        return {
          ...contact,
          email: null,
        };
      }
    });

    return res.status(200).send({
      data: contacts,
    });
  }
}
