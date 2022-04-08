import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MTest } from "src/entities/MTest";
import { LessThan, Repository } from "typeorm";

@Injectable()
export class LearnService {
  
  constructor(
    @InjectRepository(MTest)
    private serviceRep: Repository<LearnService>,
  ) {}

  async findAll() {
    const testList = await this.serviceRep.find({
      where: {
        id: 1,
        createId: LessThan(new Date()),
        createDatetime: new Date()
      }
    });
    return testList;
  }

  async findById(id: String) {
    console.log(new Date())
    return await this.serviceRep.find({
      where: {
        id: id,
        createId: LessThan(new Date()) 
      }
    });
  }
}
