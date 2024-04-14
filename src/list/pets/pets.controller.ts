import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsEntity } from './entity/pets.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('api/v1/pets')
export class PetsController {
    constructor(private readonly petsService: PetsService) {}

    @Post()
    async create(@Body() createPetDto: CreatePetDto): Promise<PetsEntity> {
        return await this.petsService.create(createPetDto);
    }

    @Get()
    async findAll(): Promise<PetsEntity[]> {
        return await this.petsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<PetsEntity> {
        return await this.petsService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto): Promise<PetsEntity> {
        return await this.petsService.update(id, updatePetDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        await this.petsService.delete(id);
    }

    // Rota customizada para atualizar a quantidade de animais por nome do dono
    @Put('update-quantidade/:nomeDono')
    async updateQuantAnimaisByOwnerName(@Param('nomeDono') nomeDono: string): Promise<PetsEntity[]> {
        return await this.petsService.updateQuantAnimaisByOwnerName(nomeDono);
    }
}
