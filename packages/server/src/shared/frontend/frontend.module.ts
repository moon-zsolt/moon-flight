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
        // Needs double client because omitting client from react-router build config will empty packages and delete server build.
        rootPath: join(__dirname, "../../../client/client"),
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
