import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TestController } from "src/controllers/test.controller";
import { Test } from "src/entities/test";
import { LearnService } from "src/services/learn.service";

@Module({
  imports: [TypeOrmModule.forFeature([Test])],
  controllers: [TestController],
  providers: [LearnService],
  exports: [LearnService],
})
export class LearnModule {}
