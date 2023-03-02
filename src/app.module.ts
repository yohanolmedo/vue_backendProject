import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';
import { AuthModule } from './auth/auth.module';
import { OrganizationModule } from './organization/organization.module';
import { DocumentationModule } from './documentation/documentation.module';
import { ProjectModule } from './project/project.module';
import { BlogModule } from './blog/blog.module';
import { BankAccountModule } from './bank-account/bank-account.module';
import { PaymentLinkModule } from './payment-link/payment-link.module';
import { CommentModule } from './comment/comment.module';
import { DonationModule } from './donation/donation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    OrganizationModule,
    DocumentationModule,
    ProjectModule,
    BlogModule,
    BankAccountModule,
    PaymentLinkModule,
    CommentModule,
    DonationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log('Running in port: ' + process.env.PORT);
  }
}
