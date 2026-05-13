import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Vehicle } from './entities/vehicle.entity';
import { VehiclesService } from './vehicles.service';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller()
export class VehiclesController {
    constructor(
        private readonly vehiclesService: VehiclesService
    ) {}

    @Post()
    async create(@Body()newVehicle: Vehicle) {
        const vehicle = await this.vehiclesService.create(newVehicle);
        if (vehicle === null) {
            return {
                statusCode: 400,
                message: 'Error creating vehicle',
            }
        }
        return {
            statusCode: 201,
            message: 'Vehicle created successfully',
            data: vehicle,
        }
    }

    @Get("get-all")
    async findAll() {
        const vehicles = await this.vehiclesService.findAll();
        return {
            statusCode: 200,
            message: 'Vehicles retrieved successfully',
            data: vehicles,
        }
    }

    @Get('brand/:brand')
    async findByBrand(@Param('brand') brand: string) {
        const vehicle = await this.vehiclesService.findByBrand(brand);
        if (vehicle === null) {
            return {
                statusCode: 404,
                message: 'Vehicle not found',
            }
        }
        return {
            statusCode: 200,
            message: 'Vehicle retrieved successfully',
            data: vehicle,
        }
    }

    @Get('model/:model')
    async findByModel(@Param('model') model: string) {
        
        const vehicle = await this.vehiclesService.findByModel(model);
        if (vehicle === null) {
            return {
                statusCode: 404,
                message: 'Vehicle not found',
            }
        }
        return {
            statusCode: 200,
            message: 'Vehicle retrieved successfully',
            data: vehicle,
        }
    }

    // Es util esto?
    @Get('available/:available')
    async findByState(@Param('available') available: boolean) {
        const vehicle = await this.vehiclesService.findByState(available);
        if (vehicle === null) {
            return {
                statusCode: 404,
                message: 'Vehicle not found',
            }
        }
        return {
            statusCode: 200,
            message: 'Vehicle retrieved successfully',
            data: vehicle,
        }
    }

    @Get('vehicle/:id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const vehicle = await this.vehiclesService.findOne(id);
        if (vehicle === null) {
            return {
                statusCode: 404,
                message: 'Vehicle not found',
            }
        }
        return {
            statusCode: 200,
            message: 'Vehicle retrieved successfully',
            data: vehicle,
        }
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateVehicleDto: UpdateVehicleDto) {
        const vehicleToUpdate = await this.vehiclesService.findOne(id);
        if (vehicleToUpdate === null) {
            return {   
                statusCode: 404,
                message: 'Vehicle not found',
            }
        }
        try {
            const vehicle = await this.vehiclesService.update(id, updateVehicleDto);
            return {
                statusCode: 200,
                message: 'Vehicle updated successfully',
                data: vehicle,
            }
        } catch (error) {
            return {
                statusCode: 400,
                message: 'Error updating vehicle',
            }
        }
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        const result = await this.vehiclesService.remove(id);
        if (result.statusCode === 404) {
            return result;
        }     
        return {
            statusCode: 200,
            message: 'Vehicle deleted successfully',
        }
    }
}
