import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger'; // Importamos los decoradores de Swagger
import { GetUser } from 'src/auth/decorators';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from 'src/auth/entities/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { ProjectService } from './project.service';

@ApiTags('Proyecto') // Agregamos una etiqueta para el controlador
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('register')
  @Auth() // Agregamos el decorador de autenticación
  @ApiOperation({ summary: 'Crear un nuevo proyecto' }) // Agregamos una descripción para el endpoint
  @ApiResponse({
    status: 201,
    description: 'El proyecto ha sido creado exitosamente',
    type: Project,
  }) // Agregamos una respuesta exitosa
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createProjectDto: CreateProjectDto, @GetUser() user: User) {
    return this.projectService.create(createProjectDto, user);
  }

  // Obtener todos los proyectos
  @Get()
  @ApiOperation({ summary: 'Obtener todos los proyectos' }) // Agregamos una descripción para el endpoint
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los proyectos',
    type: Project,
    isArray: true,
  }) // Agregamos una respuesta exitosa
  findAll() {
    return this.projectService.findAll();
  }

  // Obtener un proyecto en particular
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un proyecto' }) // Agregamos una descripción para el endpoint
  @ApiResponse({
    status: 200,
    description: 'Proyecto encontrado',
    type: Project,
  }) // Agregamos una respuesta exitosa
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }
}
