import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Repository } from 'typeorm';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {
    constructor(
        @InjectRepository(Vehicle)
        private readonly vehicleRepository: Repository<Vehicle>,
    ) {}

    async create(newVehicle: CreateVehicleDto) {
        const vehicle = await this.vehicleRepository.create(newVehicle);
        return this.vehicleRepository.save(vehicle);
    }

    async findAll() {
        return this.vehicleRepository.find();
    }

    async findByBrand(brand: string) {
        return this.vehicleRepository.findBy({ brand: brand });
    }

    async findByModel(model: string) {
    return this.vehicleRepository.findBy({ model: model });
    }

    async findByState(available: boolean) {
    return this.vehicleRepository.findBy({ available: available });
    }
    async findOne(id: number) {
    return this.vehicleRepository.findOneBy({ id });
    }

    async update(id: number, updateVehicleDto: UpdateVehicleDto) {
        const vehicle = await this.findOne(id);
        if (!vehicle) {
            return {
                statusCode: 404,
                message: 'Vehicle not found',
            };
        }
        await this.vehicleRepository.update(id, updateVehicleDto);
        return this.findOne(id);
    }   

    async remove(id: number) {
        const vehicle = await this.findOne(id);
        if (!vehicle) {
            return {
                statusCode: 404,
                message: 'Vehicle not found',
            };
        }
        this.vehicleRepository.delete(id);
        return {
            statusCode: 200,
            message: 'Vehicle deleted successfully',
        }
    }

}
