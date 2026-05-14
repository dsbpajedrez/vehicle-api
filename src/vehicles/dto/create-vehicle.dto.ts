import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty({
    description: 'Marca del vehiculo',
    example: 'Toyota',
  })
  @IsString()
  brand!: string;

  @ApiProperty({
    description: 'Modelo del vehiculo',
    example: 'Corolla',
  })
  @IsString()
  model!: string;

  @ApiProperty({
    description: 'Anio de fabricacion del vehiculo',
    example: 2022,
  })
  @IsNumber()
  year!: number; 

  @ApiProperty({
    description: 'Placa del vehiculo',
    example: 'ABC123',
  })
  @IsString()
  licensePlate!: string;

  @ApiProperty({
    description: 'Indica si el vehiculo esta disponible para alquiler',
    example: true,
  })
  @IsBoolean()
  available!: boolean;
}
