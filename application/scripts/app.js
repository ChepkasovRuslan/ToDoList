const URL = 'http://localhost:8000/';

let allTasks = [];
let inputAdd = null;
let inputEdit = null;
let activeEditIndex = -1;

window.onload = async function init() {
  inputAdd = document.getElementById('add-task-input');
  inputEdit = document.getElementById('edit-task-input');

  render();
}

getAllItems = async () => {
  try {
    const response = await fetch(URL + 'tasks', {
      method: 'GET',
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}

addItem = async () => {
  if (inputAdd.value) {
    try {
      await fetch(URL + 'tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          text: inputAdd.value,
          isCompleted: false
        })
      });
      clearInput();
      await render();
    } catch (error) {
      console.log(error);
    }
  } else {
    emptyTaskAlert();
  }
}

clearInput = () => {
  inputAdd.value = '';
}

deleteItem = async (index) => {
  try {
    await fetch(URL + 'tasks/' + allTasks[index]._id, {
      method: 'DELETE',
    });
    clearInput();
    await render();
  } catch (error) {
    console.log(error);
  }

  render();
  activeEditIndex = -1;
}

deleteAll = async () => {
  try {
    await fetch(URL + 'tasks', {
      method: 'DELETE',
    });
    clearInput();
    await render();
  } catch (error) {
    console.log(error);
  }

  render();
}

changeText = async () => {
  try {
    if (inputEdit.value) {
      await fetch(URL + 'tasks/text/' + allTasks[activeEditIndex]._id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          text: inputEdit.value,
        })
      });
      hideModal();
      await render();
      activeEditIndex = -1;
    } else {
      emptyTaskAlert();
    }
  } catch (error) {
    console.log(error);
  }

  render();
}

changeCompleted = async (index) => {
  try {
    await fetch(URL + 'tasks/completed/' + allTasks[index]._id, {
      method: 'PATCH',
    });
    clearInput();
    await render();
  } catch (error) {
    console.log(error);
  }

  render();
}

emptyTaskAlert = () => alert('Your task is empty');

hideModal = () => document.getElementById('modal').style.display = 'none';

showModal = () => document.getElementById('modal').style.display = 'flex';

sortItems = () => allTasks.sort((x, y) => x.isCompleted === y.isCompleted ? 0 : x.isCompleted ? 1 : -1);

openEdit = (index) => {
  activeEditIndex = index;

  const editTaskInput = document.getElementById('edit-task-input');
  editTaskInput.value = allTasks[activeEditIndex].text;

  showModal();
}

render = async () => {
  allTasks = await getAllItems();

  const content = document.getElementById('content-page');

  content.innerHTML = '';

  sortItems();

  allTasks.forEach((item, index) => {
    const container = document.createElement('div');
    container.id = `task-${index}`;
    container.className = 'content-page__task-container'

    const checkbox = document.createElement('input');
    checkbox.id = `task-checkbox-${index}`;
    checkbox.type = 'checkbox';
    checkbox.checked = item.isCompleted;
    checkbox.onchange = async () => await changeCompleted(index);

    const text = document.createElement('p');
    text.innerText = item.text;
    text.id = `task-text-${index}`;
    text.className = item.isCompleted ? 'task-container__text-task done' : 'task-container__text-task';

    const imageEdit = document.createElement('img');
    imageEdit.id = `task-image-edit-${index}`;
    imageEdit.src = 'images/edit.svg';
    imageEdit.className = 'content-page__image';
    imageEdit.addEventListener('click', () => openEdit(index))

    const imageDelete = document.createElement('img');
    imageDelete.id = `task-image-delete-${index}`;
    imageDelete.src = 'images/delete.svg';
    imageDelete.className = 'content-page__image';
    imageDelete.addEventListener('click', async () => await deleteItem(index));

    container.appendChild(checkbox);
    container.appendChild(text);
    if (!allTasks[index].isCompleted) container.appendChild(imageEdit);
    container.appendChild(imageDelete);

    content.appendChild(container);
  });
}