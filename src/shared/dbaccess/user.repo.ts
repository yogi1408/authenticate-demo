import { Injectable } from '@nestjs/common';
import { Prisma, user } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserRepo {
  constructor(private prisma: PrismaService) {}

  async getById(id: number): Promise<user> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getByPhone(phone: string): Promise<user> {
    return this.prisma.user.findUnique({
      where: {
        phone,
      },
    });
  }

  async create(
    data: Prisma.XOR<Prisma.userCreateInput, Prisma.userUncheckedCreateInput>,
  ): Promise<user> {
    return this.prisma.user.create({
      data,
    });
  }

  async firstWith<T>(params: {
    where?: Prisma.userWhereInput;
    select?: Prisma.userSelect;
    orderBy?: Prisma.Enumerable<Prisma.userOrderByWithRelationInput>;
  }): Promise<T> {
    const { where, select, orderBy } = params;
    const user = await this.prisma.user.findFirst({
      where,
      select,
      orderBy,
    });

    return user as T;
  }
}

export { user };
