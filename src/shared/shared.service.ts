import { Global, Module } from '@nestjs/common';
import { UserRepo } from './dbaccess/user.repo';
import { PrismaService } from './dbaccess/prisma.service';
import { ContactRepo } from './dbaccess/contact.repo';

@Global()
@Module({
  controllers: [],
  providers: [UserRepo, ContactRepo, PrismaService],
  exports: [UserRepo, ContactRepo, PrismaService],
})
export class SharedModule {}
