import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const logSqlQueries = process.env.LOG_SQL_QUERIES === 'true';
    super({ log: logSqlQueries ? ['query'] : [] });
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      console.error('Database connection error on init', error);
    }
  }
}

export const isPrismaError = (e) =>
  e instanceof Prisma.PrismaClientKnownRequestError;
