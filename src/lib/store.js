import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

export const tabs = writable([
  { id: uuidv4(), title: 'Title 1', content: 'Initial content 1' },
  { id: uuidv4(), title: 'Title 2', content: 'Initial content 2' },
]);

export const currentTabId = writable();
