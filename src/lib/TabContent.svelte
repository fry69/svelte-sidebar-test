<!-- TabContent.svelte -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
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
  {#if isEditingTitle}
    <h2>
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
    </h2>
  {:else}
    <h2
      on:click={() => {
        editedTitle = getTab($currentTabId)?.title ?? "";
        isEditingTitle = true;
      }}
    >
      {getTab($currentTabId)?.title}
    </h2>
  {/if}
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
    <pre
      on:click={() => {
        editedContent = getTab($currentTabId)?.content ?? "";
        isEditingContent = true;
      }}>{getTab($currentTabId)?.content}</pre>
  {/if}
{/if}

<style>
  h2 {
    margin-top: 0;
    margin-bottom: 0.5em;
    text-align: center;
  }

  pre {
    background-color: #666;
    white-space: pre-wrap;
    margin: 0;
    padding: 0.5em;
  }

  textarea {
    width: 15em;
    height: 10em;
    font-family: inherit;
    font-size: inherit;
    resize: none;
  }
</style>
