let allTasks = [];
let valueInput = '';
let input = null;
let activeEditIndex = -1;

window.onload = function init() {
  input = document.getElementById('add-task-input');
  input.addEventListener('change', updateValue);
}

addItem = () => {
  allTasks.push({
    text: valueInput,
    isCompleted: false
  });
  clearInput();
  render();
}

updateValue = (event) => {
  valueInput = event.target.value;
}

clearInput = () => {
  valueInput = '';
  input.value = '';
}

clearAll = () => {
  allTasks = [];
  render();
}

sortItems = () => {
  allTasks.sort((x, y) => x.isCompleted === y.isCompleted ? 0 : x.isCompleted ? 1 : -1);
  render();
}

render = () => {
  const content = document.getElementById('content-page');
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

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

    const taskTextInput = document.createElement('input');
    taskTextInput.id = `task-edit-${index}`;
    taskTextInput.className = 'task-container__task-edit input';
    taskTextInput.type = 'text';
    taskTextInput.style.display = 'none';
    taskTextInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        allTasks[activeEditIndex] = {
          text: taskTextInput.value,
          isCompleted: false
        }
        render();
        activeEditIndex = -1;
      }
    })

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

          const taskText = document.getElementById(`task-text-${index}`);
          taskText.style.display = 'none';

          const taskEdit = document.getElementById(`task-edit-${index}`);
          taskEdit.style.display = 'initial';
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
    container.appendChild(taskTextInput);
    container.appendChild(imageEdit);
    container.appendChild(imageDelete);

    content.appendChild(container);
  });
}