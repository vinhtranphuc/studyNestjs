import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TestDTO } from "src/dto/test.dto";
import { LearnService } from "src/services/learn.service";

@Controller("learn")
@ApiTags("LearnController")
export class LearnController {
  constructor(private readonly mLearnService: LearnService) {}

  @Get("getList")
  async getList() {
    return await this.mLearnService.findAll();
  }

  @Get("get/:id")
  async get(@Param("id") id: String) {
    let list = await this.mLearnService.findById(id);
    return list;
  }

  @Post("saveTest")
  async saveTest(@Body() testDto: TestDTO) {
    const result = await this.mLearnService.saveTest(testDto);
    return result;
  }

  @Post("updateTest")
  async updateTest(@Body() testDto: TestDTO) {
    const result = await this.mLearnService.updateTest(testDto);
    return result;
  }
}
