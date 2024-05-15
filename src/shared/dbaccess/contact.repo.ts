import { Injectable } from '@nestjs/common';
import { Prisma, contact } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class ContactRepo {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.XOR<
      Prisma.contactCreateInput,
      Prisma.contactUncheckedCreateInput
    >,
  ): Promise<contact> {
    return this.prisma.contact.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.contactWhereUniqueInput;
    data: Prisma.XOR<
      Prisma.contactUpdateInput,
      Prisma.contactUncheckedUpdateInput
    >;
  }): Promise<contact> {
    const { where, data } = params;
    return this.prisma.contact.update({
      data,
      where,
    });
  }

  async firstWith<T>(params: {
    where?: Prisma.contactWhereInput;
    select?: Prisma.contactSelect;
    orderBy?: Prisma.Enumerable<Prisma.contactOrderByWithRelationInput>;
  }): Promise<T> {
    const { where, select, orderBy } = params;
    const contact = await this.prisma.contact.findFirst({
      where,
      select,
      orderBy,
    });

    return contact as T;
  }

  async getAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.contactWhereUniqueInput;
    where?: Prisma.contactWhereInput;
    orderBy?: Prisma.contactOrderByWithRelationInput;
  }): Promise<contact[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.contact.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async getAllWith<T>(params: {
    where?: Prisma.contactWhereInput;
    select?: Prisma.contactSelect;
    orderBy?: Prisma.Enumerable<Prisma.contactOrderByWithRelationInput>;
  }): Promise<T> {
    const { where, select, orderBy } = params;
    const contacts = await this.prisma.contact.findMany({
      where,
      select,
      orderBy,
    });

    return contacts as T;
  }
}

export { contact };
