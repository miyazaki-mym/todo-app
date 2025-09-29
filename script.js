const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addTaskBtn');
const todoList = document.getElementById('taskList');

addBtn.addEventListener('click', () => {
  const task = input.value.trim();
  if (task) {
    addTask(task);
    input.value = '';
  }
});

const addTask = (task) => {
  const li = document.createElement('li');
  li.textContent = task;
  const delBtn = document.createElement('button');
  delBtn.textContent = '削除';
  delBtn.addEventListener('click', () => {
    li.remove();
  });
  li.appendChild(delBtn);
  todoList.appendChild(li);
};

window.onload = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos = await response.json();
    const firstFive = todos.slice(0, 5);
    const listElement = document.getElementById('taskList');
    firstFive.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = todo.title;
      listElement.appendChild(li);
    });
  } catch (error) {
    console.error('データ取得時にエラーが発生しました:', error);
  }
};
