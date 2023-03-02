import { User } from 'src/auth/entities/user.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

export enum Status {
  NONE = 'none',
  PENDING = 'pending',
  APPROVE = 'approve',
  REJECTED = 'rejected',
}
@Entity('documentations')
export class Documentation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: true,
  })
  documents: string;

  @Column('enum', {
    enum: Status,
    default: Status.NONE,
  })
  status: string;

  @OneToOne(() => User, (user) => user.documentation)
  @JoinColumn()
  admin: User;

  @OneToOne(() => Organization, (organization) => organization.documentation) // specify inverse side as a second parameter
  organization: Organization;
}
