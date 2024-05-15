import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ContactController } from './contact/contact.controller';
import { ContactService } from './contact/contact.service';

@Module({
  imports: [
    SharedModule,
    JwtModule.register({
      secret:
        '9c69398fd89345fba67eef2b298e5dfc1234abcd5678ef90ghijklmnopqrs1234tuvwxyzabcd5678ef90ghijklmnopqrs',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController, UserController, ContactController],
  providers: [AppService, UserService, ContactService],
})
export class AppModule {}
