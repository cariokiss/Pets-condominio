import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreatePetDto {
    @IsNotEmpty()
    @IsString()
    nomeDono: string;

    @IsNotEmpty()
    @IsString()
    nomeAnimal: string;

    @IsNotEmpty()
    @IsString()
    dataNascimentoAnimal: string;

    @IsNotEmpty()
    @IsString()
    tipoAnimal: string;

    @IsNotEmpty()
    @IsString()
    raca: string;

    @IsNotEmpty()
    @IsString()
    cor: string;

    @IsNotEmpty()
    @IsString()
    blocoApt: string;

    @IsNotEmpty()
    @IsInt()
    numeroApt: number;
}
