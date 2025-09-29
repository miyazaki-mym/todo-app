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
