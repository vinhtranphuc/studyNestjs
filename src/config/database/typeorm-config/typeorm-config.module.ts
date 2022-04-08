import { Module } from "@nestjs/common";
import { DefaultTypeOrmConfigService } from "./default-typeorm-config.service";

@Module({
  exports: [DefaultTypeOrmConfigService],
  providers: [DefaultTypeOrmConfigService],
})
export class TypeOrmConfigModule {}