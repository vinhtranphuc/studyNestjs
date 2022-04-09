import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TestDTO } from "src/dto/test.dto";
import { MTest } from "src/entities/MTest";
import { LessThan, Repository } from "typeorm";
import { entityName } from "typeorm-model-generator/dist/src/NamingStrategy";

@Injectable()
export class LearnService {
 
  constructor(
    @InjectRepository(MTest)
    private serviceRep: Repository<MTest>,
  ) {}

  async findAll() {
    const testList = await this.serviceRep.find();
    return testList;
  }

  async findById(id: String) {
    console.log(new Date());
    return await this.serviceRep.find({
      where: {
        id: id
      },
    });
  }

  async saveTest(testDto: TestDTO): Promise<MTest> {
    let testEntity: MTest = new MTest();
    testEntity.id = testDto.id;
    testEntity.delFlg = false;
    testEntity.name = testDto.name;
    testEntity.createDatetime = new Date();
  
    let result = await this.serviceRep.save(testEntity);
    return result;
  }

  async updateTest(testId: TestDTO) {
    let testEntity : MTest = await this.serviceRep.findOne({
      where: {
        id:testId.id
      }
    });
    if(testEntity) {
      throw new NotFoundException('testId not exists!')
    }
    testEntity.updateDatetime = new Date();
    testEntity.name = testId.name;
    let result = await this.serviceRep.save(testEntity);
    return result;
  }
}
