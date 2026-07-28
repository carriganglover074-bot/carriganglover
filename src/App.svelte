
<script>
import { store } from './lib/todo.svelte.js';

let newText = $state('');

  function handleAdd() {
    const text = newText.trim();
    if (!text) return;
    store.addTodo(text);
    newText = '';
  }

  function handleKeydown(e) {
    if (e.key === 'Enter') handleAdd();
  }
</script>

<main>
  <h1> My Todo List</h1>

  <!-- Add new todo -->
  <div class="add-row">
    <input
      type="text"
      placeholder="What needs to be done?"
      bind:value={newText}
      onkeydown={handleKeydown}
    />
    <button onclick={handleAdd}>Add</button>
  </div>

  <!-- Summary -->
  <p class="summary">
    {store.remainingCount} of {store.todos.length} remaining
  </p>

  <!-- Todo list -->
  {#if store.todos.length > 0}
    <ul>
      {#each store.todos as todo (todo.id)}
        <li class:done={todo.done}>
          <input
            type="checkbox"
            checked={todo.done}
            onchange={() => store.toggleTodo(todo.id)}
          />
          <input
            type="text"
            class="text"
            value={todo.text}
            disabled={todo.done}
            onchange={(evt) => store.updateTodo(todo.id, evt.target.value)}
          />
          <button class="delete" onclick={() => store.removeTodo(todo.id)}>
            ✕
          </button>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="empty">No todos yet. Add one above!</p>
  {/if}
</main>

<style>
  .add-row {
    display: flex;
    gap: 0.5rem;
  }

  .add-row input {
    flex: 1;
  }

  .summary {
    color: #888;
    font-size: 0.9em;
  }

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid #333;
  }

  .done .text {
    text-decoration: line-through;
    opacity: 0.5;
  }

  .text {
    flex: 1;
  }

  .delete {
    background: transparent;
    border: none;
    color: #ff4444;
    font-size: 1.1em;
    padding: 0.25em 0.5em;
  }

  .empty {
    color: #666;
    font-style: italic;
  }
</style>
