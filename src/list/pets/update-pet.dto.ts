import { IsNotEmpty, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePetDto {
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @ApiProperty()
    quantAnimais: number;
}
