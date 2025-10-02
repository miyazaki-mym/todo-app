// HTMLの各要素を取得
const input = document.getElementById('taskInput'); // タスク入力欄（再代入しないのでconst）
const addBtn = document.getElementById('addTaskBtn'); // 追加ボタン（再代入しないのでconst）
const todoList = document.getElementById('taskList'); // ToDo一覧を表示するul（再代入しないのでconst）

// 追加ボタンのクリックイベント設定
addBtn.addEventListener('click', () => {
  let task = input.value.trim();
  if (task) {
    addTask(task);
    input.value = '';
  }
});

// タスク追加のための関数定義（アロー関数に統一）
const addTask = (task) => {
  const li = document.createElement('li');
  li.textContent = task;
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '削除';
  deleteBtn.addEventListener('click', () => {
    li.remove();
  });
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
};

// ページ読み込み時（window.onload）に非同期でAPIからデータ取得してリストに追加
window.onload = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos = await response.json();
    const firstFive = todos.slice(0, 5);

    // ここではtodoListを使って統一
    firstFive.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = todo.title;
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '削除';
      deleteBtn.addEventListener('click', () => {
        li.remove();
      });
      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    });
  } catch (error) {
    console.error('データ取得時にエラーが発生しました:', error);
  }
};
