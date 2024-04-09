import { Body, Controller, Get, Post } from '@nestjs/common';
import { PetsService } from './pets.service';

@Controller('api/v1/pets')
export class PetsController {
    constructor(private readonly petsService: PetsService) {}

    @Get()
    async index() {
        return await this.petsService.findAll();
    }

    @Post()
    async create(@Body() body) {
        return await this.petsService.create(body);
    }
}
