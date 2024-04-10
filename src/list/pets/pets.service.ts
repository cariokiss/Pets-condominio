import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PetsEntity } from './entity/pets.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PetsService {
    constructor(
        @InjectRepository(PetsEntity)
        private readonly petsRepository: Repository<PetsEntity>,
        ) {}

        async findAll() {
            return await this.petsRepository.find();
        }

        async findOne(nomeDono: string) {
          try {
            return await this.petsRepository.findOneOrFail({where:{nomeDono}});
          } catch (error) {
            throw new NotFoundException(error.message);
          }
        }
        async create(data: any) {
            return await this.petsRepository.save(this.petsRepository.create(data))
        }


    async adicionarPet(petData: Partial<PetsEntity>): Promise<PetsEntity> {
        const { nomeDono } = petData;

        // Verificar se o dono já existe
        let owner = await this.petsRepository.findOne({ where: { nomeDono } });

        if (owner) {
            // Se o dono já existe, incrementar a quantidade de animais
            owner.quantAnimais += 1;
            await this.petsRepository.save(owner);
            return owner;
        } else {
            // Se o dono não existe, criar um novo registro
            const newPet = this.petsRepository.create({
                ...petData,
                quantAnimais: 1 // Iniciar com 1 animal
            });
            return this.petsRepository.save(newPet);
        }
    }
}


