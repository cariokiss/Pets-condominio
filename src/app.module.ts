import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsModule } from './list/pets/pets.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get('DB_HOST', 'localhost'),
        port: Number(configService.get('DB_PORT', 3306)),
        username: configService.get('DB_USERNAME', 'root'),
        password: configService.get('DB_PASSWORD', '123'),
        database: configService.get('DB_DATABASE', 'pets_condominio'),
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        synchronize: true,
      })
    }),
    PetsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
