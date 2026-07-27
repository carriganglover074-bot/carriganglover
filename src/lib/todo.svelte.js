const STORAGE_KEY = 'todos';

/**
 * Naive localStorage helper.
 * Reads/writes the entire todos array as JSON.
 * Not efficient for large lists, but perfect for learning.
 */
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(todos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    // TODO: How should we handle this?
    console.error('Failed to save todos to localStorage');
  }
}

/**
 * TodoStore — manages all todo state.
 *
 * Students: you'll implement the four CRUD methods below.
 * Each method should update `this.todos` and the UI will react
 * automatically thanks to $state.
 */
class TodoStore {
  /** @type {{ id: number, text: string, done: boolean }[]} */
  todos = $state(loadFromStorage());

  // ---- derived values (reactive, computed from this.todos) ----

  get completedCount() {
    return this.todos.filter((t) => t.done).length;
  }

  get remainingCount() {
    return this.todos.filter((t) => !t.done).length;
  }

  // ---- localStorage sync ----

  constructor() {
    // $effect.root creates an independent effect scope — needed because
    // the store is created at module level, outside any component.
    $effect.root(() => {
      // Every time this.todos changes, persist to localStorage.
      $effect(() => {
        // Accessing this.todos inside the effect tells Svelte to
        // re-run whenever the array (or its contents) change.
        saveToStorage(this.todos);
      });
    });
  }

  // ================================================================
  // CRUD METHODS — implement these!
  // ================================================================

  /**
   * Add a new todo with the given text.
   * @param {string} text
   */
  addTodo(text) {
    //{id: number, text: string, done: boolean}
    // TODO: create a new todo object and add it to this.todos.
    // Hint: use Date.now() for a simple unique id.
    const id = Date.now();
    const todo = {id: id, text: text, done: false};
    this.todos.push (todo);
      
    const newTodo = createTodo(text);
    this.todos = [...this.todos, newTodo];
  }

  /**
   * Remove a todo by its id.
   * @param {number} id
   */
  removeTodo(id) {
    // TODO: remove the todo with the matching id from this.todos.
    this.todos = this.todos.filter(todo => todo.id !== id);

  }

  /**
   * Toggle the done status of a todo by its id.
   * @param {number} id
   */
  toggleTodo(id) {
    // TODO: flip the `done` property of the todo with the matching id.
  }

  /**
   * Update the text of a todo by its id.
   * @param {number} id
   * @param {string} text
   */
  updateTodo(id, text) {
    // TODO: change the `text` property of the todo with the matching id.
  }
}

/** Single shared instance — import this wherever you need todo state. */
export const store = new TodoStore();
