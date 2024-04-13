import { Controller, Get, Post, Body, Param, NotFoundException, Put, Delete } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './create-pet.dto';
import { PetsEntity } from './entity/pets.entity';

@Controller('api/v1/pets')
export class PetsController {
    constructor(private readonly petsService: PetsService) {}

    @Get()
    async getAllPets(): Promise<PetsEntity[]> {
        return await this.petsService.findAll();
    }

    @Get(':id')
    async getPetById(@Param('id') id: string): Promise<PetsEntity> {
        return await this.petsService.findOneOrFail(id);
    }

    @Post()
    async createPet(@Body() createPetDto: CreatePetDto): Promise<PetsEntity> {
        return await this.petsService.create(createPetDto);
    }

    @Put(':id')
    async updatePet(@Param('id') id: string, @Body() updatePetDto: CreatePetDto): Promise<PetsEntity> {
        // Aqui você pode implementar a lógica de atualização específica, se necessário
        return await this.petsService.findOneOrFail(id);
    }

    @Delete(':id')
    async deletePet(@Param('id') id: string): Promise<void> {
        await this.petsService.deleteById(id);
    }
}
