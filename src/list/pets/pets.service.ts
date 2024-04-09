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
}

