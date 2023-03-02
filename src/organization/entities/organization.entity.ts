import { User } from 'src/auth/entities/user.entity';
import { Documentation } from 'src/documentation/entities/documentation.entity';
import { Project } from 'src/project/entities/project.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
    nullable: false,
  })
  name: string;

  @Column('text', {
    nullable: false,
  })
  email: string;

  @Column('bool', {
    default: false,
  })
  registered: boolean;

  @OneToOne(() => Documentation, (documentation) => documentation.organization) // specify inverse side as a second parameter
  @JoinColumn()
  documentation: Documentation;

  @ManyToOne(() => User, (user) => user.organizations, { eager: true })
  owner: User;

  @OneToMany(() => Project, (project) => project.organization)
  projects?: Project[];
}
