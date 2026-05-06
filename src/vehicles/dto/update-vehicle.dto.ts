import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { CreateVehicleDto } from './create-vehicle.dto';

export class UpdateVehicleDto implements Partial<CreateVehicleDto> {
}