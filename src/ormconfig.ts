import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default class TypeOrmConfig {
  static getConfig(configService: ConfigService): PostgresConnectionOptions {
    const DATABASE_URL = `postgres://${configService.get('POSTGRES_USER')}:${configService.get('POSTGRES_PASSWORD')}@${configService.get('POSTGRES_HOST')}:${configService.get('POSTGRES_PORT')}/${configService.get('POSTGRES_NAME')}`
    console.log('configService.get(database :>> ', configService.get('database'));
    if (configService.get('POSTGRES_DB_ENV') === 'prod') {
      return {
        type: 'postgres',
        // url: DATABASE_URL,
        host: configService.get('POSTGRES_DB_HOST', { infer: true }),
        port: parseInt(configService.get('POSTGRES_DB_PORT', { infer: true })),
        username: configService.get('POSTGRES_DB_USERNAME', { infer: true }),
        password: configService.get('POSTGRES_DB_PASSWORD', { infer: true }),
        database: configService.get('POSTGRES_DB_NAME', { infer: true }),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // This for development
        ssl: {
          rejectUnauthorized: false,
        },
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      };
    } else if (configService.get('POSTGRES_DB_ENV') === 'development') {
      return {
        type: 'postgres',
        // url: DATABASE_URL,
        host: configService.get('POSTGRES_DB_HOST', { infer: true }),
        port: configService.get('database.port', { infer: true }),
        username: configService.get('database.username', { infer: true }),
        password: configService.get('database.password', { infer: true }),
        database: configService.get('database.name', { infer: true }),
        ssl: false,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // This for development
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      };
    }
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<PostgresConnectionOptions> =>
    TypeOrmConfig.getConfig(configService),
  inject: [ConfigService],
};
