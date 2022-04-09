import { ApiProperty } from "@nestjs/swagger";

export class TestDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
