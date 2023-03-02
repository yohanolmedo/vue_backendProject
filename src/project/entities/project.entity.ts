import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';
import { BankAccount } from 'src/bank-account/entities/bank-account.entity';
import { Blog } from 'src/blog/entities/blog.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Donation } from 'src/donation/entities/donation.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { PaymentLink } from 'src/payment-link/entities/payment-link-entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('projects')
export class Project {
  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'ID del proyecto',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Mi proyecto',
    description: 'Nombre del proyecto',
  })
  @Column('text', {
    nullable: false,
  })
  name: string;

  @ApiProperty({
    example: 'Resumen del proyecto',
    description: 'Resumen del proyecto',
  })
  @Column('text', {
    nullable: false,
  })
  resume: string;

  @ApiProperty({
    example: 'Descripción del proyecto',
    description: 'Descripción del proyecto',
  })
  @Column('text', {
    nullable: false,
  })
  description: string;

  @ApiProperty({
    example: 'https://ejemplo.com/imagen.jpg',
    description: 'URL de la imagen del proyecto',
  })
  @Column('text', {
    nullable: false,
  })
  img: string;

  @ApiProperty({
    example: 50000,
    description: 'Objetivo de financiamiento del proyecto',
  })
  @Column('float', {
    nullable: false,
  })
  goal: number;

  @ApiProperty({
    example: 25000,
    description: 'Monto acumulado del financiamiento del proyecto',
  })
  @Column('float', {
    default: 0,
  })
  accumulated: number;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true, default: null })
  endDate: Date | null;

  @Column({ nullable: true })
  userId: string;

  @Column({ nullable: true })
  organizationId: string;

  @ManyToOne(() => Organization, (organization) => organization.projects)
  organization: Organization;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @OneToMany(() => Blog, (blog) => blog.project)
  blogs: Blog[];

  @OneToMany(() => BankAccount, (bankAccount) => bankAccount.project)
  bankAccounts: BankAccount[];

  @OneToMany(() => PaymentLink, (paymentLink) => paymentLink.project)
  paymentLinks: PaymentLink[];

  @OneToMany(() => Donation, (donation) => donation.project)
  donations: Donation[];

  @OneToMany(() => Comment, (comment) => comment.project)
  comments: Comment[];
}
