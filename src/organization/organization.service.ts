import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { Organization } from './entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { isUUID } from 'class-validator';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}
  async create(createOrganizationDto: CreateOrganizationDto, user: User) {
    try {
      const { name, email } = createOrganizationDto;
      const organization = this.organizationRepository.create({
        name,
        email,
        owner: user,
      });

      await this.organizationRepository.save(organization);

      return organization;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(registered: boolean | undefined) {
    const queryBuilder = await this.organizationRepository
      .createQueryBuilder('organization')
      .leftJoinAndSelect('organization.owner', 'owner');
    if (registered !== undefined) {
      queryBuilder.where('organization.registered = :registered', {
        registered,
      });
    }
    return queryBuilder.getMany();
  }

  async findOne(id: string) {
    try {
      if (!isUUID(id)) {
        this.organizationNotFound(id);
      }
      const organization = await this.organizationRepository.findOne({
        where: { id },
        relations: ['owner', 'projects', 'documentation'],
      });

      if (!organization) {
        this.organizationNotFound(id);
      }
      return organization;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.handleDBErrors(error);
    }
  }

  async update(
    id: string,
    updateOrganizationDto: UpdateOrganizationDto,
    user: User,
  ) {
    try {
      const organization = await this.findOne(id);
      if (!organization) {
        this.organizationNotFound(id);
      }

      const toUpdate = { ...updateOrganizationDto };

      if (
        !user.roles.includes('admin') &&
        updateOrganizationDto.registered !== undefined
      ) {
        throw new ForbiddenException(
          `Usuario no autorizado para actualizar este campo: 'registered'`,
        );
      }

      const updatedOrganization = await this.organizationRepository.preload({
        id,
        ...toUpdate,
      });

      return this.organizationRepository.save(updatedOrganization);
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

  private organizationNotFound(id: any): never {
    throw new NotFoundException(
      `La organización con id: ${id} no fue encontrada`,
    );
  }
}
