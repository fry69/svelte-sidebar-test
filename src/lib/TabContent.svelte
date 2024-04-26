<!-- TabContent.svelte -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<script>
  import { afterUpdate } from "svelte";
  import { tabs, currentTabId } from "./store" 

  let isEditingTitle = false;
  let isEditingContent = false;
  let editedTitle = "";
  let editedContent = "";
  let titleInput;
  let contentTextarea;

  function getTab(tabId) {
    return $tabs.find((t) => t.id === tabId);
  }

  function updateTabTitle() {
    const changedTab = getTab($currentTabId);
    changedTab.title = editedTitle;
    isEditingTitle = false;
    editedTitle = "";
    tabs.update( (tabs) => tabs );
  }

  function updateTabContent() {
    const changedTab = getTab($currentTabId);
    changedTab.content = editedContent;
    isEditingContent = false;
    editedContent = "";
    tabs.update( (tabs) => tabs );
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
        editedTitle = getTab($currentTabId).title;
        isEditingTitle = true;
      }}
    >
      {getTab($currentTabId).title}
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
        editedContent = getTab($currentTabId).content;
        isEditingContent = true;
      }}>{getTab($currentTabId).content}</pre>
  {/if}
{/if}

<style>
  pre {
    white-space: pre-wrap;
    margin: 0;
  }

  textarea {
    width: 15em;
    height: 10em;
    font-family: inherit;
    font-size: inherit;
    resize: none;
  }
</style>
