import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { RoleEntity } from "./role.entity";

// @Index("user_pkey", ["userId"], { unique: true })
@Entity("user", { schema: "public" })
export class UserEntity {

  @Column("integer", { primary: true, name: "user_id" })
  userId: number;

  @Column("integer", { name: "contract_id" })
  contractId: number;

  @Column("character varying", { name: "email", length: 100 })
  email: string;

  @Column("character varying", { name: "avatar", length: 500 })
  avatar: string;

  @Column("character varying", {
    name: "username",
    nullable: false
  })
  username: string;

  @Column("character varying", {
    name: "password",
    nullable: false
  })
  password: string;

  @Column("boolean", {
    name: "status",
    nullable: false,
    default: () => "true",
  })
  status: boolean;

  @Column("timestamp without time zone", {
    name: "last_login_time",
    nullable: true,
    default: () => 'NOW()'
  })
  lastLoginTime: Date;

  @Column("character varying", {
    name: "invite_key",
    nullable: true
  })
  inviteKey: string;

  @Column("timestamp without time zone", {
    name: "login_fail_time",
    nullable: true,
    default: () => 'NOW()'
  })
  loginFailTime: Date;

  @Column("timestamp without time zone", {
    name: "account_lock_time",
    nullable: true
  })
  accountLockTime: Date;

  @Column("boolean", {
    name: "delete_flag",
    nullable: true,
    default: () => "false",
  })
  deleteFlag: boolean;

  @Column("timestamp without time zone", {
    name: "create_at",
    nullable: false,
    default: () => 'NOW()'
  })
  createAt: Date;

  @Column("character varying", {
    name: "create_by",
    nullable: true
  })
  createBy: string;

  @ManyToOne(type => RoleEntity, role => role.roleId)
  @JoinColumn({name:"role_id"})
  role: RoleEntity;
}
