import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./config/database/database.module";
import { ConfigModule } from "@nestjs/config";
import { configuration } from "./config/configuration";
import { NestModule } from "@nestjs/common";
import { LoggingInterceptor } from "./common/helpers/logging.interceptor";
import { MailModule } from "./mail/mail.module";
import { RedisCacheModule } from "./redis/redis.module";
import { LearnModule } from "./module/learn.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./common/jwt/jwt-auth.guard";
import { RolesGuard } from "./common/role/role.guard";
import { SessionGuard } from "./common/role/redis.guard";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/config/env/${
        process.env.NODE_ENV
      }.env`,
      isGlobal: true,
      load: [configuration],
    }),
    MailModule,
    DatabaseModule,
    RedisCacheModule,
    LearnModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: SessionGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggingInterceptor).forRoutes("*");
  }
}
