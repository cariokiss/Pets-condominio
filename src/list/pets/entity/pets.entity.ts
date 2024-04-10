import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'pets' })
export class PetsEntity {
    @PrimaryGeneratedColumn() // Esta coluna será sua chave primária e será automaticamente incrementada
    id: number;

    @Column({ name: 'nome_do_dono' })
    nomeDono: string;

    @Column({ name: 'quantidade_de_animais' })
    quantAnimais: number;

    @Column({ name: 'nome_do_animal' })
    nomeAnimal: string;

    @Column({ name: 'data_de_nascimento_do_animal' })
    dataNascimentoAnimal: string;
    
    @Column({ name: 'tipo_de_animal' })
    tipoAnimal: string;

    @Column({ name: 'raça_do_animal' })
    raca: string;

    @Column({ name: 'cor_do_animal' })
    cor: string;

    @Column({ name: 'bloco_do_apartamento' })
    blocoApt: string;

    @Column({ name: 'número_do_apartamento' })
    numeroApt: number;  
}

@Injectable()
export class PetsService {
    constructor(
        @InjectRepository(PetsEntity)
        private readonly petsRepository: Repository<PetsEntity>,
    ) {}

    async criarPet(novoPetData: Partial<PetsEntity>): Promise<PetsEntity> {
        const novoPet = this.petsRepository.create(novoPetData);
        return await this.petsRepository.save(novoPet);
    }
}