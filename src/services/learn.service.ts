import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TestDTO } from "src/dto/test.dto";
import { TestEntity } from "src/entities/test.entity";
import { Repository } from "typeorm";
@Injectable()
export class LearnService {
 
  constructor(
    @InjectRepository(TestEntity)
    private serviceRep: Repository<TestEntity>,
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

  async saveTest(testDto: TestDTO): Promise<TestEntity> {
    let testEntity: TestEntity = new TestEntity();
    testEntity.id = testDto.id;
    testEntity.delFlg = false;
    testEntity.name = testDto.name;
    testEntity.createDatetime = new Date();
  
    let result = await this.serviceRep.save(testEntity);
    return result;
  }

  async updateTest(testId: TestDTO) {
    let testEntity : TestEntity = await this.serviceRep.findOne({
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
