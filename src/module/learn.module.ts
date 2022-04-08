import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LearnController } from "src/controllers/lean.controller";
import { MTest } from "src/entities/MTest";
import { LearnService } from "src/services/learn.service";

@Module({
  imports: [TypeOrmModule.forFeature([MTest])],
  controllers: [LearnController],
  providers: [LearnService],
  exports: [LearnService],
})
export class LearnModule {}
