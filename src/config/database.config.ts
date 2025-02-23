import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from './config.type';
import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
  ValidateIf,
  IsBoolean,
} from 'class-validator';
import validateConfig from 'src/utils/validate-config';

class EnvironmentVariablesValidator {
  @ValidateIf((envValues) => envValues.POSTGRES_DB_HOST)
  @IsString()
  POSTGRES_DB_HOST: string;

  @ValidateIf((envValues) => !envValues.POSTGRES_DB_USERNAME)
  @IsString()
  POSTGRES_DB_USERNAME: string;

  @ValidateIf((envValues) => !envValues.POSTGRES_DB_PASSWORD)
  @IsString()
  POSTGRES_DB_PASSWORD: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  POSTGRES_DB_PORT: number;

  @ValidateIf((envValues) => !envValues.POSTGRES_DB_NAME)
  @IsString()
  @IsOptional()
  POSTGRES_DB_NAME: string;
}

export default registerAs<DatabaseConfig>('database', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);
  return {
    type: 'postgres',
    host: process.env.POSTGRES_DB_HOST || 'localhost',
    port: Number(process.env.POSTGRES_DB_PORT) || 5432,
    username: process.env.POSTGRES_DB_USERNAME,
    password: process.env.POSTGRES_DB_PASSWORD,
    name: process.env.POSTGRES_DB_NAME,
    entities: [],
    synchronize: false,
  };
});
