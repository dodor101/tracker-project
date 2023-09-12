const displayTimeEl = $('.display-time');
const projectNameInput = $('#project-name-input');
const projectTypeInput = $('#project-type-input');
const projectDueDate = $('#project-date-input');
const projectForm = $('#project-form');
const displayProjectData = $('#project-display');

// let's read the projects from localStorage

function readProjectsFromLocalStorage() {
  let projects = localStorage.getItem('projects');
  if (projects) {
    projects = JSON.parse(projects);
  } else {
    projects = [];
  }
  return projects;
}

// save projects to local storage.
function saveProjectsToStorage(projects) {
  localStorage.setItem('projects', JSON.stringify(projects));
}

// print project data
function printProjectData() {
  displayProjectData.empty();
  let projects = readProjectsFromLocalStorage();

  projects.forEach((project, index) => {
    let projectDate = dayjs(project.date);
    let today = dayjs().startOf('day');

    // create row and column
    let rowEl = $('<tr>');
    let nameEl = $('<td>').text(project.name);
    let typeEl = $('<td>').text(project.type);
    let dateEl = $('<td>').text(projectDate.format('MM/DD/YYYY'));

    // create delete button
    let deleteEl = $(
      `<td><button class="btn btn-sm btn-delete-project" data-index=${index}><i class="fa fa-trash-o" style="font-size:48px;color:red"></i></button></td>`
    );

    if (projectDate.isBefore(today)) {
      rowEl.addClass('project-late');
    } else if (projectDate.isSame(today)) {
      rowEl.addClass('project-today');
    }

    rowEl.append(nameEl, typeEl, dateEl, deleteEl);
    displayProjectData.append(rowEl);
  });
}
// handleDeleteProject
function handleDeleteProject() {
  let projectIndex = parseInt($(this).attr('data-index'));

  // read project from localStorage

  let projects = readProjectsFromLocalStorage();
  // projects.splice(projectIndex, 1);
  const filteredProjects = projects.filter((project, index) => index !== projectIndex);

  saveProjectsToStorage(filteredProjects);
  printProjectData();
}

//
function displayTime() {
  let rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  displayTimeEl.text(rightNow);
}
displayTime();
setInterval(displayTime, 1000);

const handleFormSubmit = (e) => {
  e.preventDefault();
  const projectName = projectNameInput.val().trim();
  const projectType = projectTypeInput.val().trim();
  const projectDate = projectDueDate.val();

  const newProject = {
    name: projectName,
    type: projectType,
    date: projectDate,
  };
  const projects = readProjectsFromLocalStorage();
  projects.push(newProject);

  saveProjectsToStorage(projects);
  printProjectData();

  projectNameInput.val('');
  projectTypeInput.val('');
  projectDueDate.val('');
};

projectForm.on('submit', handleFormSubmit);

displayProjectData.on('click', '.btn-delete-project', handleDeleteProject);
printProjectData();
