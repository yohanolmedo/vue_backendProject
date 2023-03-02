import { Controller, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto, CreateUserDto } from './dto';

@ApiTags('Auth User')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'El usuario ha sido creado satisfactoriamente.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Los datos proporcionados son inválidos o ya existe un usuario con este correo.',
  })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'El usuario ha sido autenticado satisfactoriamente.',
  })
  @ApiResponse({
    status: 401,
    description: 'Las credenciales proporcionadas son inválidas.',
  })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
