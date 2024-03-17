import { v4 as uuidv4 } from "uuid";

export type ProjectStatus =
  | "Design"
  | "Detail Design"
  | "Fabrication"
  | "Finish";

export interface Iproject {
  name: string;
  status: ProjectStatus;
  description: string;
}

export class Project implements Iproject {
  name: string;
  status: "Design" | "Detail Design" | "Fabrication" | "Finish";
  description: string;

  id: string;

  constructor(data: Iproject, id = uuidv4()) {
    this.name = data.name;
    this.status = data.status;
    this.description = data.description;
    this.id = id;
  }
}
