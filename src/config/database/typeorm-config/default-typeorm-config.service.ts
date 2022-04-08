// typeorm-config/default-typeorm-config.service.ts
import { Global, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { TYPEORM_CONNECTION_NAMES, TypeOrmConnectionName } from "./constants";

import { TypeOrmLoggerContainer } from "./typeorm-logger.container";

@Global()
@Injectable()
export class DefaultTypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {};

  static connectionName: TypeOrmConnectionName =
    TYPEORM_CONNECTION_NAMES.DEFAULT;

  createTypeOrmOptions(): TypeOrmModuleOptions {
    
    return {
      logger: TypeOrmLoggerContainer.ForConnection(
        DefaultTypeOrmConfigService.connectionName,
        "all" 
      ),
      name: DefaultTypeOrmConfigService.connectionName,
      synchronize: false,
      type: "postgres",
      host: this.configService.get("POSTGRES_HOST"),
      port: this.configService.get("POSTGRES_PORT"),
      username: this.configService.get("POSTGRES_USER"),
      password: this.configService.get("POSTGRES_PASSWORD"),
      database: this.configService.get("POSTGRES_DB"),
      entities: [__dirname + "../../../../entities/*{.ts,.js}"],
    };
  }
}