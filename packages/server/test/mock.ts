import { InjectionToken } from "@nestjs/common";
import { ModuleMocker } from "jest-mock";

export function mock(token?: InjectionToken): unknown {
  const moduleMocker = new ModuleMocker(global);
  const mockMetadata = moduleMocker.getMetadata(token);

  if (!mockMetadata) {
    throw new Error("Cannot get metadata from moduleMocker");
  }

  const Mock = moduleMocker.generateFromMetadata(mockMetadata);

  if (!Mock) {
    throw new Error("Mock is undefined");
  }

  switch (typeof token) {
    case "function":
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return new Mock();
    case "string":
      return Mock;
    default:
      throw new Error("Unexpected token type " + typeof token);
  }
}
