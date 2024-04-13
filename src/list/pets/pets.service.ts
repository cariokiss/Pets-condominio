import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PetsEntity } from './entity/pets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePetDto } from './create-pet.dto';

@Injectable()
export class PetsService {
    constructor(
        @InjectRepository(PetsEntity)
        private readonly petsRepository: Repository<PetsEntity>,
    ) {}

    async findAll(): Promise<PetsEntity[]> {
        return await this.petsRepository.find();
    }

    async findOneOrFail(id: string): Promise<PetsEntity> {
        try {
            return await this.petsRepository.findOneOrFail({ where: { id } });
        } catch (error) {
            throw new NotFoundException(`Pet with ID '${id}' not found`);
        }
    }

    async create(data: CreatePetDto): Promise<PetsEntity> {
        // Check if there's an existing pet with the same owner's name (nomeDono)
        let ownerPets = await this.petsRepository.find({ where: { nomeDono: data.nomeDono } });

        if (ownerPets && ownerPets.length > 0) {
            // Owner already has pets, increment the count of animals for the owner
            ownerPets.forEach(pet => {
                pet.quantAnimais++;
            });
        } else {
            // Owner does not have any pets yet, create a new entry for the owner
            ownerPets = [];
        }

        // Create a new pet entry for the current animal
        const newPet = this.petsRepository.create({
            ...data,
            quantAnimais: 1 // Set quantAnimais to 1 for the new animal
        });

        ownerPets.push(newPet); // Add the new pet to the owner's pets list

        // Save all pets (existing and new) to the database
        await this.petsRepository.save(ownerPets);

        return newPet; // Return the newly created pet
    }

    async deleteById(id: string): Promise<void> {
        await this.findOneOrFail(id);
        await this.petsRepository.softDelete(id);
    }
}
