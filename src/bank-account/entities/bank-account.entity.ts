import { Project } from 'src/project/entities/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('bankAccounts')
export class BankAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
  })
  bank: string;

  @Column('text', {
    nullable: false,
  })
  CVU: string;

  @Column('text', {
    nullable: false,
  })
  alias: string;

  @ManyToOne(() => Project, (project) => project.bankAccounts)
  project: Project;
}
