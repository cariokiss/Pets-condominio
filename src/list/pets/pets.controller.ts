import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsEntity } from './entity/pets.entity';

@Controller('api/v1/pets')
export class PetsController {
    constructor(private readonly petsService: PetsService) {}

    @Get()
    async findAll(): Promise<PetsEntity[]> {
        return await this.petsService.findAll();
    }

    @Get(':nomeDono')
    async findOne(@Param('nomeDono') nomeDono: string): Promise<PetsEntity> {
        const pet = await this.petsService.findOne(nomeDono);
        if (!pet) {
            throw new NotFoundException(`Pets not found for owner: ${nomeDono}`);
        }
        return pet;
    }

    @Post()
    async adicionarPet(@Body() petData: Partial<PetsEntity>): Promise<PetsEntity> {
        const pet = await this.petsService.adicionarPet(petData);
        return pet;
    }
}
