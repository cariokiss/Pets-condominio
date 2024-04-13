import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";

@Entity({ name: 'pets' })
export class PetsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'nome_do_dono' })
    nomeDono: string;

    @Column({ name: 'quantidade_de_animais', type: 'int', default: 1 })
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

    // Método que será chamado antes de inserir um novo registro
    @BeforeInsert()
    updateQuantAnimais() {
        this.quantAnimais = 1; // Define a quantidade inicial como 1 ao inserir
    }
}
    