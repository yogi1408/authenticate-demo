import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('contact')
  createUser(@Res() res: Response, @Req() req: Request) {
    return this.contactService.createContact(res, req);
  }

  @Post('spam/:phone')
  spamContact(
    @Res() res: Response,
    @Req() req: Request,
    @Param('phone') phone: string,
  ) {
    return this.contactService.spamContact(res, req, phone);
  }

  @Get('search/phone/:phone')
  searchContactByPhone(
    @Res() res: Response,
    @Req() req: Request,
    @Param('phone') phone: string,
  ) {
    return this.contactService.searchContactByPhone(res, req, phone);
  }

  @Get('search')
  searchContact(@Res() res: Response, @Req() req: Request) {
    return this.contactService.searchContact(res, req);
  }

  @Get('search/name/:name')
  searchContactByName(
    @Res() res: Response,
    @Req() req: Request,
    @Param('name') name: string,
  ) {
    return this.contactService.searchContactByName(res, req, name);
  }
}
