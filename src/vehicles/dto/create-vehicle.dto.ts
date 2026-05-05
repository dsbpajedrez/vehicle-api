import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsNumber()
  year: number; 

  @IsBoolean()
  available: boolean;
}