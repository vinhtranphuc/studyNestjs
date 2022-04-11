import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TestController } from "src/controllers/test.controller";
import { TestEntity } from "src/entities/test.entity";
import { LearnService } from "src/services/learn.service";

@Module({
  imports: [TypeOrmModule.forFeature([TestEntity])],
  controllers: [TestController],
  providers: [LearnService],
  exports: [LearnService],
})
export class LearnModule {}
