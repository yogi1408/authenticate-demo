import { Controller, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  createUser(@Res() res: Response, @Req() req: Request) {
    return this.userService.createUser(res, req);
  }

  @Post('login')
  loginUser(@Res() res: Response, @Req() req: Request) {
    return this.userService.loginUser(res, req);
  }
}
