import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Mi proyecto',
    description: 'Nombre del proyecto',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  @MaxLength(350)
  @ApiProperty({
    example:
      'Este proyecto tiene como objetivo construir una escuela en la comunidad X para mejorar la educación de los niños y niñas.',
    description: 'Resumen del proyecto',
  })
  resume: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  @MaxLength(350)
  @ApiProperty({
    example:
      'El proyecto consiste en construir una escuela de 3 aulas con materiales sostenibles y de bajo costo.',
    description: 'Descripción detallada del proyecto',
  })
  description: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    example: 'https://www.example.com/my-project-image.jpg',
    description: 'URL de la imagen que representa el proyecto',
  })
  img: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 5000,
    description: 'Objetivo de financiación del proyecto',
  })
  goal: number;

  @IsNumber()
  @ApiProperty({
    example: 2500,
    description: 'Cantidad acumulada de financiación del proyecto',
  })
  accumulated = 0;

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    example: '2023-08-31T23:59:59Z',
    description: 'Fecha de finalización del proyecto en formato ISO 8601',
  })
  endDate?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'user',
    description: 'Tipo de propietario del proyecto (user, organization, etc.)',
  })
  ownerType?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '1234-5678-abcd-efgh',
    description: 'ID del propietario del proyecto',
  })
  ownerId?: string;
}
