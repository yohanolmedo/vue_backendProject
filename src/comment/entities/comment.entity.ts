import { Blog } from 'src/blog/entities/blog.entity';
import { Project } from 'src/project/entities/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
  })
  user_name: string;

  @Column('text', {
    nullable: false,
  })
  message: string;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @ManyToOne(() => Project, (project) => project.comments)
  project: Project;

  @ManyToOne(() => Blog, (blog) => blog.comments)
  blog: Blog;
}
