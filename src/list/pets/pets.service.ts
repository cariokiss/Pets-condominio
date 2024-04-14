import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetsEntity } from './entity/pets.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
    constructor(
        @InjectRepository(PetsEntity)
        private readonly petsRepository: Repository<PetsEntity>,
    ) {}

    async create(createPetDto: CreatePetDto): Promise<PetsEntity> {
        const newPet = this.petsRepository.create(createPetDto);
        return await this.petsRepository.save(newPet);
    }

    async findAll(): Promise<PetsEntity[]> {
        return await this.petsRepository.find();
    }

    async findOne(id: string): Promise<PetsEntity> {
        const pet = await this.petsRepository.findOne({ where: { id } });
        if (!pet) {
            throw new NotFoundException(`Pet with ID '${id}' not found`);
        }
        return pet;
    }

    async update(id: string, updatePetDto: UpdatePetDto): Promise<PetsEntity> {
        const pet = await this.findOne(id);
        Object.assign(pet, updatePetDto);
        return await this.petsRepository.save(pet);
    }

    async delete(id: string): Promise<void> {
        const pet = await this.findOne(id);
        await this.petsRepository.softRemove(pet);
    }
}
