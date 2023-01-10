let allTasks = [];
let valueAddInput = '';
let valueEditInput = '';
let inputAdd = null;
let inputEdit = null;
let activeEditIndex = -1;

window.onload = function init() {
  inputAdd = document.getElementById('add-task-input');
  inputAdd.addEventListener('change', updateAddValue);

  inputEdit = document.getElementById('edit-task-input');
  inputEdit.addEventListener('change', updateEditValue);
}

addItem = () => {
  allTasks.push({
    text: valueAddInput,
    isCompleted: false
  });
  clearInput();
  render();
}

editItem = () => {
  allTasks[activeEditIndex] = {
    text: valueEditInput,
    isCompleted: allTasks[activeEditIndex].isCompleted
  };
  hideModal();
  render();
  activeEditIndex = -1;
}

updateAddValue = (event) => {
  valueAddInput = event.target.value;
}

updateEditValue = (event) => {
  valueEditInput = event.target.value;
}

clearInput = () => {
  valueAddInput = '';
  inputAdd.value = '';
}

clearAll = () => {
  allTasks = [];
  render();
}

hideModal = () => document.getElementById('modal').style.display = 'none';

showModal = () => document.getElementById('modal').style.display = 'flex';

sortItems = () => allTasks.sort((x, y) => x.isCompleted === y.isCompleted ? 0 : x.isCompleted ? 1 : -1);

render = () => {
  const content = document.getElementById('content-page');
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  sortItems();

  allTasks.map((item, index) => {
    const container = document.createElement('div');
    container.id = `task-${index}`;
    container.className = 'content-page__task-container'

    const checkbox = document.createElement('input');
    checkbox.id = `task-checkbox-${index}`;
    checkbox.type = 'checkbox';
    checkbox.checked = item.isCompleted;
    checkbox.onchange = () => {
      allTasks[index].isCompleted = !allTasks[index].isCompleted;
      render();
    }

    const text = document.createElement('p');
    text.innerText = item.text;
    text.id = `task-text-${index}`;
    text.className = item.isCompleted ? 'task-container__text-task done' : 'task-container__text-task';

    const imageEdit = document.createElement('img');
    imageEdit.id = `task-image-edit-${index}`;
    imageEdit.src = 'images/edit.svg';
    imageEdit.className = 'content-page__image';
    imageEdit.addEventListener('click', () => {
      if (!allTasks[index].isCompleted) {
        if (activeEditIndex === index) {
          render();
          activeEditIndex = -1;
          return;
        }

        if (activeEditIndex !== index) {
          activeEditIndex = index;

          const editTaskInput = document.getElementById('edit-task-input');
          editTaskInput.value = allTasks[index].text;

          showModal();
        }
      }
    })

    const imageDelete = document.createElement('img');
    imageDelete.id = `task-image-delete-${index}`;
    imageDelete.src = 'images/delete.svg';
    imageDelete.className = 'content-page__image';
    imageDelete.addEventListener('click', () => {
      allTasks.splice(index, 1);
      render();
      activeEditIndex = -1;
    })

    container.appendChild(checkbox);
    container.appendChild(text);
    if (!allTasks[index].isCompleted) container.appendChild(imageEdit);
    container.appendChild(imageDelete);

    content.appendChild(container);
  });
}