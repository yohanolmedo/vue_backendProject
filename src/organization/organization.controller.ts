import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  Patch,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from 'src/auth/entities/user.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { OrganizationService } from './organization.service';
import { ValidRoles } from '../auth/interfaces/valid-roles.interface';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Organización')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post('register')
  @Auth()
  @ApiResponse({
    status: 201,
    description: 'Se ha registrado la organización.',
  })
  create(
    @Body() createOrganizationDto: CreateOrganizationDto,
    @GetUser() user: User,
  ) {
    return this.organizationService.create(createOrganizationDto, user);
  }

  @Get()
  @Auth(ValidRoles.admin)
  @ApiResponse({
    status: 200,
    description: 'Se han obtenido todas las organizaciones.',
  })
  findAll(@Query('registrado') registrado: boolean) {
    return this.organizationService.findAll(registrado);
  }

  @Get(':id')
  @Auth(ValidRoles.admin)
  @ApiResponse({ status: 200, description: 'Se ha obtenido la organización.' })
  @ApiResponse({
    status: 404,
    description: 'No se ha encontrado la organización.',
  })
  findOne(@Param('id') id: string) {
    return this.organizationService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  @ApiResponse({
    status: 200,
    description: 'Se ha actualizado la organización.',
  })
  @ApiResponse({
    status: 403,
    description: 'No tienes permiso para actualizar esta organización.',
  })
  @ApiResponse({
    status: 404,
    description: 'No se ha encontrado la organización.',
  })
  update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
    @GetUser() user: User,
  ) {
    return this.organizationService.update(id, updateOrganizationDto, user);
  }
}
