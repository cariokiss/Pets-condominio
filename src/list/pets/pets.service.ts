import { Injectable } from '@nestjs/common';
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
        return await this.petsRepository.findOne({ where: { id } });
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
        if (!pet) {
            throw new Error(`Pet with ID '${id}' not found`);
        }
        const updatedPet = { ...pet, ...data };
        return await this.petsRepository.save(updatedPet);
    }

    async delete(id: string): Promise<void> {
        const pet = await this.findOne(id);
        if (!pet) {
            throw new Error(`Pet with ID '${id}' not found`);
        }
        await this.petsRepository.softDelete(id);
    }

    // Método para atualizar a quantidade de animais de todos os donos
    async updateQuantidadeAnimais(): Promise<void> {
        const allPets = await this.petsRepository.find();

        const ownerMap = new Map<string, number>();

        // Itera sobre todos os animais para mapear a quantidade por dono
        allPets.forEach(pet => {
            const ownerName = pet.nomeDono;
            if (ownerMap.has(ownerName)) {
                ownerMap.set(ownerName, ownerMap.get(ownerName) + 1);
            } else {
                ownerMap.set(ownerName, 1);
            }
        });

        // Atualiza a quantidade de animais por dono no banco de dados
        const promises: Promise<PetsEntity>[] = [];
        for (const [ownerName, quantity] of ownerMap.entries()) {
            const ownerPets = await this.petsRepository.find({ where: { nomeDono: ownerName } });
            ownerPets.forEach(pet => {
                pet.quantAnimais = quantity;
                promises.push(this.petsRepository.save(pet));
            });
        }

        // Espera todas as atualizações serem concluídas
        await Promise.all(promises);
    }
}
