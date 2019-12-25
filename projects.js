document.addEventListener("DOMContentLoaded", function() {
  buildProjects();
  displayProjects();
});

buildProjects = () => {
  const projectsArray = projectsInfo;
  projectsArray.forEach(el => {
    new Project(el);
  });
};

displayProjects = () => {
  const projectsHTML = document.querySelector("#projects");
  const projects = Project.getAll();

  projects.forEach(project => {
    projectsHTML.innerHTML += project.displayHTML();
  });
};

/*  Project Object  */
class Project {
  static all = [];
  /* 
        Constructor Method
        input: args => {name: name, description: description, technology: technology}
      */
  constructor(args) {
    this.name = args.name;
    this.description = args.description;
    this.technology = args.technology;
    Project.all.push(this);
  }

  /* Returns an Array of all Projects */
  static getAll() {
    return Project.all;
  }

  displayTechnology = () => {
    return this.technology
      .map(el => {
        return `<li>${el}</li>`;
      })
      .join("");
  };

  displayHTML = () => {
    return `<div class='item'><h2>${this.name}</h2><p>${
      this.description
    }</p><p>Technology:</p>
    <ul>
      ${this.displayTechnology()}
    </ul></div>`;
  };
}
