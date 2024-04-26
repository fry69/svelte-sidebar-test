<!-- App.svelte -->
<script lang="ts">
  import TabContent from "./lib/TabContent.svelte";
  import Sidebar from "./lib/Sidebar.svelte";
  import { tabs, currentTabId, isSidebarCollapsed } from "./lib/store";

  currentTabId.set($tabs[0].id);
</script>

<div class="container">
  <Sidebar />
  <div class="main-container">
    <button
      class="toggle-button"
      on:click={() => isSidebarCollapsed.set(!$isSidebarCollapsed)}
    >
      <img src="hamburger.svg" height="20" width="20" alt="Show/hide sidebar" />
    </button>
    <TabContent />
  </div>
</div>

<style>
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
    background-color: #777;
    padding: 0;
    margin: 0;
    border: none;
    cursor: pointer;
    font-size: 1px;
    text-align: start;
  }

  .toggle-button:hover {
    background-color: darkred;
  }
</style>
