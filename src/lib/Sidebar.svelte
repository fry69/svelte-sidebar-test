<!-- Sidebar.svelte -->
<script lang="ts">
  import { v4 as uuidv4 } from "uuid";
  import { tabs, currentTabId, isSidebarCollapsed } from "./store";

  function switchTab(tabId: string) {
    currentTabId.set(tabId);
  }

  function createNewTab() {
    const randomNumber = Math.floor(Math.random() * 999);
    const newId = uuidv4();
    const newTab = {
      id: newId,
      title: `New Title ${randomNumber}`,
      content: `New content ${randomNumber}`,
    };
    tabs.update(($tabs) => {
      $tabs.push(newTab);
      return $tabs;
    });
    currentTabId.set(newId);
  }
</script>

<aside class="sidebar" class:collapsed={$isSidebarCollapsed}>
  <button class="new-tab-button" on:click={createNewTab}>New Tab</button>
  {#each $tabs as { id, title }, i}
    <button
      class="tab-button"
      class:active={id === $currentTabId}
      on:click={() => switchTab(id)}
    >
      {i + 1} - {title}
    </button>
  {/each}
</aside>

<style>
  .sidebar {
    display: grid;
    grid-template-rows: 3em repeat(auto-fill, 2.5em);

    background-color: #7777;
    border-right: 1px solid #111;
    overflow: auto;
  }

  .sidebar:not(collapsed) {
    visibility: visible;
    width: 10em;
    padding: 1em;
    transition: all 0.1s ease-in-out;
  }

  .sidebar.collapsed {
    visibility: hidden;
    width: 0;
    padding: 0;
    transition: all 0.1s ease-in-out;
  }

  .sidebar .new-tab-button,
  .sidebar .tab-button {
    display: block;
    align-self: center;
    width: 100%;
    background-color: #333;
    padding: 0.5em;
    border: none;
    cursor: pointer;
    font-size: 14px;
    text-align: start;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 1em;
  }

  .sidebar .tab-button.active {
    background-color: darkblue;
  }

  .sidebar .tab-button:hover:not(.active) {
    background-color: #888;
  }

  .sidebar .new-tab-button {
    grid-row: 1;
    align-self: start;
    background-color: darkred;
    text-align: center;
  }

  .sidebar .new-tab-button:hover {
    background-color: red;
  }
</style>
