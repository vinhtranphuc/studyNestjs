import { Column, Entity, Index } from "typeorm";

@Index("test_pkey", ["name"], { unique: false })
@Entity("test", { schema: "public" })
export class TestEntity {

  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("character varying", { name: "test_name", length: 20 })
  name: string;

  @Column("boolean", {
    name: "del_flg",
    nullable: true,
    default: () => "false",
  })
  delFlg: boolean | null;

  @Column("timestamp without time zone", {
    name: "create_datetime",
    nullable: true,
    default: () => 'NOW()'
  })
  createDatetime: Date | null;

  @Column("character varying", {
    name: "create_id",
    nullable: true,
    length: 64,
  })
  createId: string | null;

  @Column("timestamp without time zone", {
    name: "update_datetime",
    nullable: true,
    default: () => 'NOW()'
  })
  updateDatetime: Date | null;

  @Column("character varying", {
    name: "update_id",
    nullable: true,
    length: 64,
  })
  updateId: string | null;
}
