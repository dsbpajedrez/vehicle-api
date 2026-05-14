import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

const vehicleExample = {
    id: 1,
    brand: 'Toyota',
    model: 'Corolla',
    year: 2022,
    licensePlate: 'ABC123',
    available: true,
};

@Controller()
@ApiTags('vehicles')
export class VehiclesController {
    constructor(
        private readonly vehiclesService: VehiclesService
    ) {}

    @Post()
    @ApiOperation({ summary: 'Crear un vehiculo' })
    @ApiBody({
        type: CreateVehicleDto,
        examples: {
            vehicle: {
                summary: 'Vehiculo disponible',
                value: {
                    brand: 'Toyota',
                    model: 'Corolla',
                    year: 2022,
                    licensePlate: 'ABC123',
                    available: true,
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Vehiculo creado correctamente',
        schema: {
            example: {
                statusCode: 201,
                message: 'Vehicle created successfully',
                data: vehicleExample,
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'No se pudo crear el vehiculo',
        schema: {
            example: {
                statusCode: 400,
                message: 'Error creating vehicle',
            },
        },
    })
    async create(@Body()newVehicle: CreateVehicleDto) {
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
    @ApiOperation({ summary: 'Listar todos los vehiculos' })
    @ApiResponse({
        status: 200,
        description: 'Vehiculos encontrados',
        schema: {
            example: {
                statusCode: 200,
                message: 'Vehicles retrieved successfully',
                data: [
                    vehicleExample,
                    {
                        id: 2,
                        brand: 'Renault',
                        model: 'Logan',
                        year: 2021,
                        licensePlate: 'XYZ789',
                        available: false,
                    },
                ],
            },
        },
    })
    async findAll() {
        const vehicles = await this.vehiclesService.findAll();
        return {
            statusCode: 200,
            message: 'Vehicles retrieved successfully',
            data: vehicles,
        }
    }

    @Get('brand/:brand')
    @ApiOperation({ summary: 'Buscar vehiculos por marca' })
    @ApiParam({ name: 'brand', example: 'Toyota' })
    @ApiResponse({
        status: 200,
        description: 'Vehiculos encontrados por marca',
        schema: {
            example: {
                statusCode: 200,
                message: 'Vehicle retrieved successfully',
                data: [vehicleExample],
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'No se encontraron vehiculos',
        schema: {
            example: {
                statusCode: 404,
                message: 'Vehicle not found',
            },
        },
    })
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
    @ApiOperation({ summary: 'Buscar vehiculos por modelo' })
    @ApiParam({ name: 'model', example: 'Corolla' })
    @ApiResponse({
        status: 200,
        description: 'Vehiculos encontrados por modelo',
        schema: {
            example: {
                statusCode: 200,
                message: 'Vehicle retrieved successfully',
                data: [vehicleExample],
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'No se encontraron vehiculos',
        schema: {
            example: {
                statusCode: 404,
                message: 'Vehicle not found',
            },
        },
    })
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

    @Get('available/:available')
    @ApiOperation({ summary: 'Buscar vehiculos por disponibilidad' })
    @ApiParam({ name: 'available', example: true, type: Boolean })
    @ApiResponse({
        status: 200,
        description: 'Vehiculos encontrados por disponibilidad',
        schema: {
            example: {
                statusCode: 200,
                message: 'Vehicle retrieved successfully',
                data: [vehicleExample],
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'No se encontraron vehiculos',
        schema: {
            example: {
                statusCode: 404,
                message: 'Vehicle not found',
            },
        },
    })
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
    @ApiOperation({ summary: 'Buscar un vehiculo por id' })
    @ApiParam({ name: 'id', example: 1, type: Number })
    @ApiResponse({
        status: 200,
        description: 'Vehiculo encontrado',
        schema: {
            example: {
                statusCode: 200,
                message: 'Vehicle retrieved successfully',
                data: vehicleExample,
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Vehiculo no encontrado',
        schema: {
            example: {
                statusCode: 404,
                message: 'Vehicle not found',
            },
        },
    })
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
    @ApiOperation({ summary: 'Actualizar un vehiculo' })
    @ApiParam({ name: 'id', example: 1, type: Number })
    @ApiBody({
        type: UpdateVehicleDto,
        examples: {
            availability: {
                summary: 'Cambiar disponibilidad',
                value: {
                    available: false,
                },
            },
            fullVehicle: {
                summary: 'Actualizar todos los campos',
                value: {
                    brand: 'Toyota',
                    model: 'Corolla Cross',
                    year: 2023,
                    licensePlate: 'ABC123',
                    available: true,
                },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Vehiculo actualizado correctamente',
        schema: {
            example: {
                statusCode: 200,
                message: 'Vehicle updated successfully',
                data: {
                    ...vehicleExample,
                    model: 'Corolla Cross',
                    year: 2023,
                },
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Vehiculo no encontrado',
        schema: {
            example: {
                statusCode: 404,
                message: 'Vehicle not found',
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'No se pudo actualizar el vehiculo',
        schema: {
            example: {
                statusCode: 400,
                message: 'Error updating vehicle',
            },
        },
    })
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
    @ApiOperation({ summary: 'Eliminar un vehiculo' })
    @ApiParam({ name: 'id', example: 1, type: Number })
    @ApiResponse({
        status: 200,
        description: 'Vehiculo eliminado correctamente',
        schema: {
            example: {
                statusCode: 200,
                message: 'Vehicle deleted successfully',
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Vehiculo no encontrado',
        schema: {
            example: {
                statusCode: 404,
                message: 'Vehicle not found',
            },
        },
    })
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
