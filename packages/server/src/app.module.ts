import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import DATA_SOURCE from "./config/typeorm-data-source.config";

@Module({
  imports: [TypeOrmModule.forRoot({ ...DATA_SOURCE.options })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
