import { Column, Entity, Index, JoinColumn, OneToMany } from "typeorm";
import { UserEntity } from "./user.entity";

// @Index("role_pkey", ["roleId"], { unique: true })
@Entity("role", { schema: "public" })
export class RoleEntity {

  @Column("integer", { primary: true, name: "role_id" })
  roleId: number;

  @Column("character varying", {
    name: "role_name",
    nullable: false,
    length: 64
  })
  username: string;

  @OneToMany(type => UserEntity, user => user.role)
  @JoinColumn({name: "role_id"})
  users: UserEntity[];
}
