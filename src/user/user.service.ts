import { Injectable, HttpStatus } from '@nestjs/common';
import { UserRepo } from 'src/shared/dbaccess/user.repo';
import { ContactRepo } from 'src/shared/dbaccess/contact.repo';
import { hashPassword, comparePassword } from 'src/utils/password';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly contactRepo: ContactRepo,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(res, req) {
    const { name, phone, email, password } = req.body;

    try {
      const existingUser = await this.userRepo.getByPhone(phone);
      if (existingUser) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          message: 'User already exists',
        });
      }
      const hashedPassword = await hashPassword(password);
      const newUser = await this.userRepo.create({
        name,
        phone,
        email,
        password: hashedPassword,
      });
      await this.contactRepo.create({
        name,
        phone,
        email,
        user_link: newUser.id,
      });
      const token = this.generateJwtToken(newUser);

      return res.status(HttpStatus.CREATED).send({
        data: newUser,
        token,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Internal server error',
      });
    }
  }

  async loginUser(res, req) {
    const { phone, password } = req.body;

    try {
      const user = await this.userRepo.getByPhone(phone);
      if (!user || !(await comparePassword(password, user.password))) {
        return res.status(HttpStatus.UNAUTHORIZED).send({
          message: 'Invalid phone or password',
        });
      }
      const token = this.generateJwtToken(user);
      return res.status(HttpStatus.OK).send({
        message: 'User successfully logged in',
        token,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Internal server error',
      });
    }
  }
  private generateJwtToken(user) {
    const payload = { userId: user.id, phone: user.phone };
    return this.jwtService.sign(payload);
  }

  async validateToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.userRepo.getById(decoded.userId);
      if (user) {
        return user;
      }
    } catch (error) {
      return null;
    }
  }
}
