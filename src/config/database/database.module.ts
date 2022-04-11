import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigModule } from "./typeorm-config/typeorm-config.module";
import { DefaultTypeOrmConfigService } from "./typeorm-config/default-typeorm-config.service";
@Global()
@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: "postgres",
    //     host: configService.get("POSTGRES_HOST"),
    //     port: configService.get("POSTGRES_PORT"),
    //     username: configService.get("POSTGRES_USER"),
    //     password: configService.get("POSTGRES_PASSWORD"),
    //     database: configService.get("POSTGRES_DB"),
    //     entities: [__dirname + "../../../entities/*{.ts,.js}"],
    //     synchronize: false,
    //     // extra: {
    //     //     decimalNumbers: false
    //     // }
    //   }),
    // }),
    TypeOrmModule.forRootAsync({
      imports: [TypeOrmConfigModule],
      name: DefaultTypeOrmConfigService.connectionName,
      useExisting: DefaultTypeOrmConfigService
    }),
  ],
})
export class DatabaseModule {}
