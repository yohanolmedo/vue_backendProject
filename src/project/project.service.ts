import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Organization } from 'src/organization/entities/organization.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  //Crear Proyecto
  async create(createProjectDto: CreateProjectDto, user: User) {
    try {
      let projectOwner: User | Organization = user;
      let ownerType = 0;

      if (createProjectDto.ownerId) {
        const organization = await this.organizationRepository.findOne({
          where: { id: createProjectDto.ownerId },
        });

        if (organization.owner.id !== user.id) {
          throw new UnauthorizedException(
            'No eres el creador de esta organización',
          );
        }

        projectOwner = new Organization();
        projectOwner.id = organization.id;
        projectOwner.name = organization.name;
        projectOwner.registered = organization.registered;
        projectOwner.owner = organization.owner;

        ownerType = 1;
      }

      const project = new Project();
      project.name = createProjectDto.name;
      project.resume = createProjectDto.resume;
      project.description = createProjectDto.description;
      project.img = createProjectDto.img;
      project.goal = createProjectDto.goal;
      project.accumulated = createProjectDto.accumulated;
      project.endDate = new Date(createProjectDto.endDate);

      if (ownerType !== 0) {
        project.organization = projectOwner as Organization;
      } else {
        project.user = projectOwner as User;
      }

      if (!createProjectDto.endDate) {
        project.endDate = null;
      }

      return this.projectRepository.save(project);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.handleDBErrors(error);
    }
  }

  //Obtener todos los proyectos
  async findAll() {
    try {
      const projects = await this.projectRepository.find();
      return projects;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.handleDBErrors(error);
    }
  }

  async findOne(id: string) {
    try {
      const project = await this.projectRepository.findOne({
        where: { id },
      });

      return project;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Por favor revisa los logs');
  }
}
