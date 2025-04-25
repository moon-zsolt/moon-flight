import { Module } from "@nestjs/common";
import { CraftRepository } from "./craft.repository";

@Module({
  imports: [],
  exports: [CraftRepository],
  providers: [CraftRepository],
})
export class CraftModule {}
