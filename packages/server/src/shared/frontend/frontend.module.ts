import { DynamicModule, Module, ModuleMetadata } from "@nestjs/common";
import { FrontendProxyModule } from "./frontend-proxy.module";
import {
  ServeStaticModule,
  ServeStaticModuleOptions,
} from "@nestjs/serve-static";
import { join } from "path";

@Module({})
export class FrontendModule {
  static register(): DynamicModule {
    const imports: ModuleMetadata["imports"] = [];

    if (process.env.DEV) {
      imports.push(FrontendProxyModule);
    } else {
      const options: ServeStaticModuleOptions = {
        rootPath: join(__dirname, "../../../../client/build/client"),
      };

      imports.push(ServeStaticModule.forRoot(options));
    }

    return {
      imports,
      module: FrontendModule,
      providers: [],
    };
  }
}
