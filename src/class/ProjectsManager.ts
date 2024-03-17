import { Iproject, Project } from "./project";

export class ProjectsManager {
  projectlist: Project[] = [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onProjectCreated = (project: Project) => {};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onProjectDeleted = (id: string) => {};

  newProject(data: Iproject, id?: string) {
    const projectNames = this.projectlist.map((project) => {
      return project.name;
    });
    const nameInuse = projectNames.includes(data.name);
    if (nameInuse) {
      throw new Error(`A project with the name "${data.name}" already exists`);
    }
    const project = new Project(data, id);
    this.projectlist.push(project);
    this.onProjectCreated(project);
    return project;
  }
  getProjects(id: string) {
    const project = this.projectlist.find((project) => {
      return project.id === id;
    });
    return project;
  }
  delectProject(id: string) {
    const project = this.getProjects(id);
    if (!project) {
      return;
    }
    const remainingProjects = this.projectlist.filter((project) => {
      return project.id !== id;
    });
    this.projectlist = remainingProjects;
    this.onProjectDeleted(id);
  }
}
