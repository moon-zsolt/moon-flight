import { UUID } from "crypto";
import { Craft } from "src/feature/craft/craft.entity";

export class CraftDto {
  constructor(craft: Craft) {
    this.id = craft.id;
    this.name = craft.name;
    this.capacity = craft.capacity;
  }

  id: UUID;

  name: string;

  capacity: number;
}
