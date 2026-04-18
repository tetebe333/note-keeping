import { persisted } from 'svelte-persisted-store';
import { writable } from 'svelte/store';

// 1. Define the shape of your data
export interface Note {
	added: string;
    title: string;
    content: string;
    bg: string;
}

export const notes = persisted<Note[]>('note_preferences', []);
export const noteAction = writable<{ type: 'edit' | 'delete', index: number } | null>(null)