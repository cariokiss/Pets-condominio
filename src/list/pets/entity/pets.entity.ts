import { Column, Entity, PrimaryGeneratedColumn, } from "typeorm";

@Entity({ name: 'pets' })
export class PetsEntity {
    @PrimaryGeneratedColumn() // Esta coluna será sua chave primária e será automaticamente incrementada
    id: number;

    @Column({ name: 'nome do dono' })
    nomeDono: string;

    @Column({ name: 'nome do animal' })
    nomeAnimal: string;

    @Column({ name: 'data de nascimento do animal' })
    dataNascimentoAnimal: Date;
    
    @Column({ name: 'tipo de animal' })
    tipoAnimal: string;

    @Column({ name: 'raça do animal' })
    raca: string;

    @Column({ name: 'cor do animal' })
    cor: string;

    @Column({ name: 'bloco do apartamento' })
    blocoApt: string;

    @Column({ name: 'número do apartamento' })
    numeroApt: number;  
}