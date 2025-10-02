// HTMLの各要素を取得
const input = document.getElementById('taskInput'); // タスク入力欄
const addBtn = document.getElementById('addTaskBtn'); // 追加ボタン
const todoList = document.getElementById('taskList'); // ToDo一覧を表示するul

// 追加ボタンのクリックイベント設定
addBtn.addEventListener('click', () => {
  const task = input.value.trim(); // 入力値の前後の空白を削除
  if (task) {
    addTask(task); // タスク追加処理を呼び出す
    input.value = ''; // 入力欄を空にする
  }
});

// タスク追加のための関数定義
const addTask = (task) => {
  const li = document.createElement('li'); // 新しいli要素を作成
  li.textContent = task; // liにタスクのテキストをセット

  const delBtn = document.createElement('button'); // 削除ボタンを作成
  delBtn.textContent = '削除';
  delBtn.addEventListener('click', () => {
    li.remove(); // 削除ボタンを押されたら、そのli要素を削除
  });
  
  li.appendChild(delBtn); // liの中に削除ボタンを追加
  todoList.appendChild(li); // ulにliを追加して画面に表示
};

// ページ読み込み時（window.onload）に非同期でAPIからデータ取得してリストに追加
window.onload = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos'); // APIにリクエスト
    const todos = await response.json(); // JSON形式で結果を取得
    const firstFive = todos.slice(0, 5); // 最初の5件だけに絞る
    const listElement = document.getElementById('taskList'); // ulの取得（すでに取得しているが重複してもOK）
    
    // 5件それぞれに対してliを作成してリストに追加
    firstFive.forEach(todo => {
      const li = document.createElement('li'); // 新しいli要素を作成
      li.textContent = todo.title; // タイトル文字列をセット

      const deleteBtn = document.createElement('button'); // 削除ボタンを作成
      deleteBtn.textContent = '削除';
      deleteBtn.addEventListener('click', () => {
        li.remove(); // 削除ボタンを押されたら、そのli要素を削除
      });

      li.appendChild(deleteBtn); // liの中に削除ボタンを追加
      listElement.appendChild(li); // ulにliを追加して画面に表示
    });
  } catch (error) {
    console.error('データ取得時にエラーが発生しました:', error); // エラー処理
  }
};
