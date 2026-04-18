<script lang="ts">
import { notes } from '$lib/stores.svelte';
let { openDeleteModal, edithFunction} = $props();
console.log($notes)

</script>

{#if $notes.length > 0}
<div>
  <div>
    <p class="font-semibold text-gray-600">Tap on the note to view its details.</p>
  </div>

  {#each $notes as note, index (index) }

  {#if note.bg}  
      <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
      <a href={`/${index + 1}`} >
        <div style="background-color: {note.bg ? note.bg : 'white'}" class="rounded-2xl p-4 border-l-3 border-celadon-100 mt-4 shadow-l">

            <p class="text-3xl font-bold mb-3">Note {index +1}</p>
            <p>{note.title}</p>
            <p class="my-4">Created At {note.added}</p>
            <button onclick= {(e) =>{
              e.stopPropagation();
              e.preventDefault();
              edithFunction(index)}} class="sbtn bg-blue-500 hover:bg-blue-00">Edit <img src="https://img.icons8.com/material-outlined/24/FFFFFF/create-new.png" alt="" width="20" height="20" class="inline-block">
            </button>

            <button onclick= {(e) =>{
              e.stopPropagation();
              e.preventDefault();
              openDeleteModal(index)}} class="sbtn bg-orange-600 hover:bg-red-600">Delete <img src="https://img.icons8.com/ios-glyphs/30/FFFFFF/filled-trash.png" alt="" width="20" height="20" class="inline-block"> 
            </button>
        </div>
      </a>
  {/if}
       {/each}

</div>
    
{:else}
    <div class="bg-celadon h-27 rounded-2xl pt-10 mt-4">
          <p class="no-note text-center align-middle text-gray-700">
            <i>&#128221;No note found. Add note to get started!</i>
          </p>
        </div>
  {/if}      
