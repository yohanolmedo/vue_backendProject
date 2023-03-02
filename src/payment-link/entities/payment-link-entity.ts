import { Project } from 'src/project/entities/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('paymentLinks')
export class PaymentLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float', {
    nullable: false,
  })
  amount: number;

  @Column('text', {
    nullable: false,
  })
  reference: string;

  @Column('text', {
    nullable: false,
  })
  link: string;

  @ManyToOne(() => Project, (project) => project.paymentLinks)
  project: Project;
}
