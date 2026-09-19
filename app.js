// 待辦清單應用程式：只使用原生 JavaScript，資料保存在 localStorage
(function () {
  "use strict";

  const STORAGE_KEY = "todo-list-items";

  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");
  const emptyHint = document.getElementById("empty-hint");
  const remainingCount = document.getElementById("remaining-count");

  // 從 localStorage 讀取待辦事項，讀取失敗時回傳空陣列
  function loadTodos() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  }

  // 將待辦事項寫入 localStorage
  function saveTodos(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  let todos = loadTodos();

  // 根據目前的 todos 陣列重新繪製整個清單
  function render() {
    list.innerHTML = "";

    // 清單為空時顯示提示文字，否則隱藏
    emptyHint.style.display = todos.length === 0 ? "block" : "none";

    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.className = "todo-item" + (todo.completed ? " completed" : "");
      li.dataset.id = todo.id;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "todo-checkbox";
      checkbox.checked = todo.completed;
      checkbox.addEventListener("change", () => toggleTodo(todo.id));

      const span = document.createElement("span");
      span.className = "todo-text";
      span.textContent = todo.text;

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "刪除";
      deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      list.appendChild(li);
    });

    const remaining = todos.filter((todo) => !todo.completed).length;
    remainingCount.textContent = `未完成：${remaining} 項`;
  }

  // 新增一筆待辦事項
  function addTodo(text) {
    const trimmed = text.trim();
    if (!trimmed) return; // 空白內容不新增

    todos.push({
      id: Date.now().toString(),
      text: trimmed,
      completed: false,
    });

    saveTodos(todos);
    render();
  }

  // 切換完成狀態
  function toggleTodo(id) {
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos(todos);
    render();
  }

  // 刪除指定待辦事項
  function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    saveTodos(todos);
    render();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    addTodo(input.value);
    input.value = "";
    input.focus();
  });

  render();
})();
