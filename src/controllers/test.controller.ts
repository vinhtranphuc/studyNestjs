import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TestDTO } from "src/dto/test.dto";
import { LearnService } from "src/services/learn.service";

@Controller("test")
@ApiTags("TestController")
export class TestController {
  constructor(private readonly mLearnService: LearnService) {}

  @Get("list")
  async getList() {
    return await this.mLearnService.findAll();
  }

  @Get("get/:id")
  async get(@Param("id") id: String) {
    let list = await this.mLearnService.findById(id);
    return list;
  }

  @Post("save")
  async save(@Body() testDto: TestDTO) {
    const result = await this.mLearnService.saveTest(testDto);
    return result;
  }

  @Post("update")
  async update(@Body() testDto: TestDTO) {
    const result = await this.mLearnService.updateTest(testDto);
    return result;
  }
}
