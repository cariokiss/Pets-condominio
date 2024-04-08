import { ApiProperty } from "@nestjs/swagger";

export class NotfoundSwagger {
    @ApiProperty()  
    statusCode: number;
   
    @ApiProperty()
    message: string;

    @ApiProperty()
    error: string;
}