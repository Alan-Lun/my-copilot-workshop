// 待辦清單應用程式：只使用原生 JavaScript，資料保存在 localStorage
(function () {
  "use strict";

  const STORAGE_KEY = "todo-list-items";

  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");
  const emptyHint = document.getElementById("empty-hint");
  const remainingCount = document.getElementById("remaining-count");
  const themeToggle = document.getElementById("theme-toggle");
  const filterButtons = document.querySelectorAll(".filter-btn");

  const THEME_STORAGE_KEY = "todo-list-theme";
  const filterEmptyMessages = {
    all: "還沒有任何待辦事項，新增一個吧！",
    active: "目前沒有未完成的待辦事項。",
    completed: "目前沒有已完成的待辦事項。",
  };
  let currentFilter = "all";
  const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // 套用手動選擇的主題；沒有選擇時交由 CSS 配合系統設定處理
  function applyTheme(theme) {
    const hasManualTheme = theme === "light" || theme === "dark";
    document.documentElement.toggleAttribute("data-theme", hasManualTheme);
    if (hasManualTheme) {
      document.documentElement.dataset.theme = theme;
    }

    const isDark = hasManualTheme
      ? theme === "dark"
      : systemThemeQuery.matches;
    themeToggle.textContent = isDark ? "☀️ 淺色模式" : "🌙 深色模式";
    themeToggle.setAttribute("aria-pressed", String(isDark));
  }

  // 初始化主題，沒有使用者選擇時跟隨作業系統
  applyTheme(localStorage.getItem(THEME_STORAGE_KEY));

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

    const visibleTodos = todos.filter((todo) => {
      if (currentFilter === "active") return !todo.completed;
      if (currentFilter === "completed") return todo.completed;
      return true;
    });

    // 篩選後沒有項目時顯示對應提示文字
    emptyHint.textContent = filterEmptyMessages[currentFilter];
    emptyHint.style.display = visibleTodos.length === 0 ? "block" : "none";

    visibleTodos.forEach((todo) => {
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

  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.dataset.theme === "dark" ||
      (!document.documentElement.dataset.theme && systemThemeQuery.matches);
    const nextTheme = isDark ? "light" : "dark";
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  });

  systemThemeQuery.addEventListener("change", () => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme();
    }
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentFilter = button.dataset.filter;
      filterButtons.forEach((filterButton) => {
        const isActive = filterButton === button;
        filterButton.classList.toggle("active", isActive);
        filterButton.setAttribute("aria-pressed", String(isActive));
      });
      render();
    });
  });

  render();
})();
