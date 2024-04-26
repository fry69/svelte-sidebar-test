<!-- App.svelte -->
<script lang="ts">
  import TabContent from "./lib/TabContent.svelte";
  import Sidebar from "./lib/Sidebar.svelte";
  import { tabs, currentTabId, isSidebarCollapsed } from "./lib/store";

  currentTabId.set($tabs[0].id);
</script>

<div class="header">
  {#if $isSidebarCollapsed}
  <button
    class="toggle-button"
    on:click={() => isSidebarCollapsed.set(false)}
  >
    <img src="hamburger.svg" height="20" width="20" alt="Show/hide sidebar" />
  </button>
  {:else}
  <button
    class="toggle-button"
    on:click={() => isSidebarCollapsed.set(true)}
  >
    <img src="x.svg" height="20" width="20" alt="Show/hide sidebar" />
  </button>
  {/if}
  <h3 class="title">Svelte Sidebar Experiment</h3>
</div>

<div class="container">
  <Sidebar />
  <div class="main-container">
    <TabContent />
  </div>
</div>

<style>
  .header {
    display: grid;
    grid-template-columns: 1.5em auto;
  }

  .title {
    margin: 0;
    padding-bottom: 0.3em;
    text-align: center;
    color: #aaa;
    text-decoration: underline;
  }

  .container {
    display: grid;
    grid-template-columns: auto 1fr;
    height: 100vh;
  }

  .main-container {
    padding-left: 1em;
    overflow: auto;
  }

  .toggle-button {
    position: sticky;
    top: 0;
    background-color: #666;
    padding: 0;
    margin: 0;
    border: none;
    cursor: pointer;
    font-size: 1px;
    text-align: center;
    border-radius: 0;
  }

  .toggle-button:hover {
    background-color: darkred;
  }
</style>
