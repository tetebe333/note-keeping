<script lang="ts">
  import { page } from '$app/state'; 
  import { notes} from '$lib/stores.svelte';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { noteAction } from '$lib/stores.svelte';

  //getting the index from the url
   const id = $derived(Number(page.params.id) - 1);
   const note = $derived(browser ? $notes[id] : null);

   
    //modal state
    let showModal = $state(false);
   // let indexToDelete = $state<number | null>(null);


   function triggerAction(type: 'edit' | 'delete') {
    // 1. Save the action and index
    noteAction.set({ type, index: id });
    
    // eslint-disable-next-line svelte/no-navigation-without-resolve 
    goto('/');
  }

</script>

{#if note}

<div class="relative">

</div>
<main class="m-y-0 py-5 mx-auto w-80% max-w-800">

    <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
    <a href="/">
        <img class="absolute sm:left-10 left-5" width="35" height="35" src="https://img.icons8.com/pulsar-color/48/home-page.png" alt="">
    </a>
    <h1 class="sm:ms-0 ms-10 text-2xl font-bold mb-4 text-gray-600 text-center">Note Keeping App📝</h1>
   
    <div class="flex justify-center mb-4 mt-10">
        <img width="250" height="250" class="rounded-full " src="https://epe.brightspotcdn.com/dims4/default/de2095e/2147483647/strip/true/crop/7062x4792+34+0/resize/840x570!/quality/90/?url=https%3A%2F%2Fepe-brightspot.s3.us-east-1.amazonaws.com%2Fb9%2Fd3%2F8a6831fc4711b36f463f6dc720b1%2Freading-struggles-102025-1819843065.jpg" alt="">
    </div>

    <h1 class="text-2xl font-bold my-5 text-center text-gray-600">📘Note {id + 1}</h1>


    <div class="bg-blue-200 rounded-2xl p-4 border-l-3 border-celadon-100 shadow-lg">
    <i><p class="uppercase text-3xl font-bold mb-4 text-gray-600">{note.title}</p></i>
    <p class="text-gray-600 mb-5">{note.content}</p>
    <button onclick= {() =>{
         triggerAction('edit')}} class="sbtn bg-blue-500"><img src="https://img.icons8.com/material-outlined/24/FFFFFF/create-new.png" alt="" width="20" height="20" class="inline-block">
    </button>

    <button onclick= {() =>{showModal = true}} class="sbtn bg-orange-600"><img src="https://img.icons8.com/ios-glyphs/30/FFFFFF/filled-trash.png" alt="" width="20" height="20" class="inline-block"> 
    </button>
    </div> 
    <p class="text-gray-600 mb-2 text-center mt-20">@created at {note.added}</p> 
</main>


{:else if browser}
     <!-- NOT FOUND STATE -->
    <div class="mt-20 text-center">
        <p class="text-gray-500">Note not found.</p>
        <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
        <a href="/" class="text-blue-500 hover:underline">Return home</a>
    </div>
    {:else}
        <!-- LOADING STATE (Pulse Animation) -->
    <div class="mt-10 p-6 max-w-2xl mx-auto border border-gray-100 rounded-2xl">
        <div class="animate-pulse space-y-4 mb-20">
            <div class="h-8 bg-gray-200 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/4"></div>
            <div class="space-y-2 pt-4">
                <div class="h-4 bg-gray-100 rounded"></div>
                <div class="h-4 bg-gray-100 rounded"></div>
                <div class="h-4 bg-gray-100 rounded w-5/6"></div>
            </div>
        </div>
    </div>
{/if}

{#if showModal}
<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in duration-200">
        <h3 class="text-xl font-bold text-gray-800">Delete Note?</h3>
        <p class="text-gray-600 mt-2">This action cannot be undone. Are you sure you want to remove this note?</p>
        
        <div class="flex gap-3 mt-6">
            <button 
                onclick={() => showModal = false}
                class="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
            >
                Cancel
            </button>
            <button 
                onclick= {() =>{ triggerAction('delete')}}   
                class="flex-1 px-4 py-2 bg-orange-600 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-red-200"
            >
                Delete
            </button>
        </div>
    </div>
</div>


{/if}





