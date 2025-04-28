import { HttpServer, Module, OnModuleInit } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { legacyCreateProxyMiddleware } from "http-proxy-middleware";

@Module({})
export class FrontendProxyModule implements OnModuleInit {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  onModuleInit() {
    this.setupProxy(this.httpAdapterHost.httpAdapter.getInstance());
  }

  private setupProxy(app: HttpServer) {
    app.use(
      "/",
      legacyCreateProxyMiddleware(() => true, {
        target: "http://localhost:5173",
        ws: true,
      }),
    );
  }
}
