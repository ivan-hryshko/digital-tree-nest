import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import appDataSource from './db/app-data-source';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfigAsync } from './ormconfig';

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        load: [
          databaseConfig,
        ],
        envFilePath: ['./env/backend.env'],
      }),
      TypeOrmModule.forRootAsync(typeOrmConfigAsync),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
