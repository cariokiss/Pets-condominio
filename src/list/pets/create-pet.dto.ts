import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsOptional } from "class-validator";

export class CreatePetDto {
    @IsNotEmpty()
    @ApiProperty()
    nomeDono: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    nomeAnimal: string;

    @IsNotEmpty()
    @ApiProperty()
    dataNascimentoAnimal: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    tipoAnimal: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    raca: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    cor: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    blocoApt: string;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    numeroApt: number;
}
