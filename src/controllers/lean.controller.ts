import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LearnService } from "src/services/learn.service";

@Controller("learn")
@ApiTags("LearnController")
export class LearnController {
  constructor(private readonly mLearnService: LearnService) {}

  @Get("getList")
  async getList() {
    return await this.mLearnService.findAll();
  }

  @Get("getListWithPathVariable/:id")
  async getListWithPathVariable(@Param("id") id: String) {
    let list = await this.mLearnService.findById(id);
    return list;
  }
}
