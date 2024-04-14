import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PetsEntity } from './entity/pets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePetDto } from './dto/create-pet.dto';

@Injectable()
export class PetsService {
    constructor(
        @InjectRepository(PetsEntity)
        private readonly petsRepository: Repository<PetsEntity>,
    ) {}

    async findAll(): Promise<PetsEntity[]> {
        return await this.petsRepository.find();
    }

    async findOne(id: string): Promise<PetsEntity> {
        try {
            return await this.petsRepository.findOneOrFail({ where: { id } });
        } catch (error) {
            throw new NotFoundException(`Pet with ID '${id}' not found`);
        }
    }

    async create(data: CreatePetDto): Promise<PetsEntity> {
        let ownerPets = await this.petsRepository.find({ where: { nomeDono: data.nomeDono } });

        if (ownerPets && ownerPets.length > 0) {
            // Incrementa a quantidade de animais para o dono existente
            ownerPets.forEach(pet => {
                pet.quantAnimais++;
            });
        } else {
            // Cria um novo registro para o dono se não existir
            ownerPets = [];
        }

        // Cria um novo animal com os dados fornecidos
        const newPet = this.petsRepository.create({
            ...data,
            quantAnimais: 1 // Define a quantidade inicial como 1 para o novo animal
        });

        ownerPets.push(newPet); // Adiciona o novo animal à lista de animais do dono

        // Salva todos os animais (existentes e novos) no banco de dados
        await this.petsRepository.save(ownerPets);

        return newPet; // Retorna o novo animal criado
    }

    async update(id: string, data: any): Promise<PetsEntity> {
        const pet = await this.findOne(id);
        return await this.petsRepository.save({ ...pet, ...data });
    }

    async delete(id: string): Promise<void> {
        await this.findOne(id);
        await this.petsRepository.softDelete(id);
    }

    async updateQuantAnimaisByOwnerName(nomeDono: string): Promise<PetsEntity[]> {
        const ownerPets = await this.petsRepository.find({ where: { nomeDono } });

        if (ownerPets && ownerPets.length > 0) {
            ownerPets.forEach(pet => {
                pet.quantAnimais = ownerPets.length; // Atualiza a quantidade de animais para o dono
            });

            await this.petsRepository.save(ownerPets); // Salva as alterações no banco de dados
        }

        return ownerPets; // Retorna a lista de animais do dono após a atualização
    }
}
