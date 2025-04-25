import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  app.enableShutdownHooks();
}
bootstrap().catch((e) => console.error("Failed to bootstrap", e));
