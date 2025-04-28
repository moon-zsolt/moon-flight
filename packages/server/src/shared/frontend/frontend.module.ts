import { DynamicModule, Module } from "@nestjs/common";
import { FrontendProxyModule } from "./frontend-proxy.module";

@Module({})
export class FrontendModule {
  static register(): DynamicModule {
    return {
      imports: [FrontendProxyModule],
      module: FrontendModule,
      providers: [],
    };
  }
}
