<!-- TabContent.svelte -->
<script lang="ts">
  import { afterUpdate } from "svelte";
  import { tabs, currentTabId } from "./store";

  let isEditingTitle = false;
  let isEditingContent = false;
  let editedTitle = "";
  let editedContent = "";
  let titleInput: HTMLElement;
  let contentTextarea: HTMLElement;

  function getTab(tabId: string) {
    return $tabs.find((t) => t.id === tabId);
  }

  function updateTabTitle() {
    const changedTab = getTab($currentTabId);
    if (changedTab) {
      changedTab.title = editedTitle;
      tabs.update((tabs) => tabs);
    }
    isEditingTitle = false;
    editedTitle = "";
  }

  function updateTabContent() {
    const changedTab = getTab($currentTabId);
    if (changedTab) {
      changedTab.content = editedContent;
      tabs.update((tabs) => tabs);
    }
    isEditingContent = false;
    editedContent = "";
  }

  afterUpdate(() => {
    if (titleInput) {
      titleInput.focus();
    }
    if (contentTextarea) {
      contentTextarea.focus();
    }
  });
</script>

{#if $currentTabId}
  <div class="title-container">
    <div class="empty-container"></div>
    {#if isEditingTitle}
      <input
        type="text"
        bind:this={titleInput}
        bind:value={editedTitle}
        on:blur={() => updateTabTitle()}
        on:keydown={(event) => {
          if (event.key === "Enter" || event.key === "Escape") {
            event.currentTarget.blur();
          }
        }}
      />
      <div class="empty-container"></div>
    {:else}
      <h2>{getTab($currentTabId)?.title}</h2>
      <button
        class="title-edit-button"
        on:click={() => {
          editedTitle = getTab($currentTabId)?.title ?? "";
          isEditingTitle = true;
        }}
      >
        <svg
          id="pencil"
          width="32x"
          height="32px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5H9C7.11438 5 6.17157 5 5.58579 5.58579C5 6.17157 5 7.11438 5 9V15C5 16.8856 5 17.8284 5.58579 18.4142C6.17157 19 7.11438 19 9 19H15C16.8856 19 17.8284 19 18.4142 18.4142C19 17.8284 19 16.8856 19 15V12M9.31899 12.6911L15.2486 6.82803C15.7216 6.36041 16.4744 6.33462 16.9782 6.76876C17.5331 7.24688 17.5723 8.09299 17.064 8.62034L11.2329 14.6702L9 15L9.31899 12.6911Z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    {/if}
  </div>
  <div class="content-container">
    {#if isEditingContent}
      <textarea
        bind:this={contentTextarea}
        bind:value={editedContent}
        on:blur={() => updateTabContent()}
        on:keydown={(event) => {
          if (
            (event.key === "Enter" && event.shiftKey) ||
            event.key === "Escape"
          ) {
            event.currentTarget.blur();
          }
        }}
      />
    {:else}
      <pre>{getTab($currentTabId)?.content}</pre>
      <button
        class="content-edit-button"
        on:click={() => {
          editedContent = getTab($currentTabId)?.content ?? "";
          isEditingContent = true;
        }}
      >
        <svg
          width="40px"
          height="40px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5H9C7.11438 5 6.17157 5 5.58579 5.58579C5 6.17157 5 7.11438 5 9V15C5 16.8856 5 17.8284 5.58579 18.4142C6.17157 19 7.11438 19 9 19H15C16.8856 19 17.8284 19 18.4142 18.4142C19 17.8284 19 16.8856 19 15V12M9.31899 12.6911L15.2486 6.82803C15.7216 6.36041 16.4744 6.33462 16.9782 6.76876C17.5331 7.24688 17.5723 8.09299 17.064 8.62034L11.2329 14.6702L9 15L9.31899 12.6911Z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    {/if}
  </div>
{/if}

<style>
  h2,
  input {
    margin-top: 0.3em;
    margin-bottom: 0.5em;
    text-align: center;
    cursor: pointer;
    font-size: 28px;
  }

  .title-container {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    justify-content: stretch;
  }

  .title-edit-button {
    justify-self: start;
    margin: 0;
    padding: 0;
    padding-left: 5px;
    background-color: transparent;
    border: none;
    stroke: #4caf50;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .title-edit-button:hover {
    stroke: red;
  }

  .title-container:hover .title-edit-button {
    opacity: 1;
  }

  .content-container {
    background-color: #666;
    width: 100%;
    height: 75%;
    display: inline-block;
    position: relative;
  }

  .content-edit-button {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: none;
    stroke: #4caf50;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .content-edit-button:hover {
    stroke: red;
  }

  .content-container:hover .content-edit-button {
    opacity: 1;
  }

  pre {
    background-color: #666;
    white-space: pre-wrap;
    margin: 0;
    padding: 0.5em;
    cursor: pointer;
  }

  textarea {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-family: inherit;
    font-size: inherit;
    resize: none;
  }
</style>
