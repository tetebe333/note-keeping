<script lang="ts">
import { notes, type Note  } from '$lib/stores.svelte';
import NoteList from './noteList.svelte';
import { noteAction } from '$lib/stores.svelte';
import { fly } from 'svelte/transition';

    //btn state
    let btnState = $state(true);
    let selectedIndex = $state(-1);

    //alert state
    let alertMessage = $state("");
    let showAlert = $state(false);

    //toast state
    let toastMessage = $state("");
    let showToast = $state(false);

    //modal state
    let showModal = $state(false);
    let indexToDelete = $state<number | null>(null);

    //added time
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    //added time
    const time = new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    //note object state
    let noteInfo = $state({ title: "", content: "", date:day + "/" + month + "/" + year+"  " + time, bg:"#F2EF91"});

    export function triggerToast(msg: string) {
        toastMessage = msg;
        showToast = true;

        // Automatically hide after 2 seconds
        setTimeout(() => {
         showToast = false;
        }, 2500);
    }


    function submitFunction(e: SubmitEvent) { // 'any' works, but 'SubmitEvent' is better
        e.preventDefault();

        if (!noteInfo.title.trim() || !noteInfo.content.trim()) {
            alertMessage = "😪Both title and content are required to add a note.";
            showAlert = true;
            return;
        }
        

        //changing bg color
        if (noteInfo.bg === "#F2EF91") {
            noteInfo.bg = "#B5DCB0"
        } else {
            noteInfo.bg = "#F2EF91"
        }

        // Creating the object
        let note: Note = {
            title: noteInfo.title,
            content: noteInfo.content,
            added: noteInfo.date,
            bg: noteInfo.bg
        };

        // 2. This will no longer throw the 'never' error
        $notes = [
            { ...note },
            ...$notes
        ];

        // Clear the form after submit
        noteInfo.title = "";
        noteInfo.content = "";

       // localStorage.clear();

        console.log($notes[0].title + $notes[0].content + $notes[0].added)

        // Show success toast
        triggerToast("Note added successfully!");

        
    }

    function deleteFunction(index: number) {
        $notes = $notes.filter((_, i) => i !== index);

        // 3. Optional: Trigger your new toast!
        triggerToast("Note deleted successfully!");
    }


    $effect(() => {
        if ($noteAction) {
            const { type, index } = $noteAction;

            if (type === 'edit') {
                edithFunction(index);
                } else if (type === 'delete') {
                    deleteFunction(index);
            }

            // RESET the action immediately so it doesn't run again if you refresh
            noteAction.set(null);
        }
     });

     // Function to open the delete confirmation modal
    function openDeleteModal(index: number) {
        indexToDelete = index;
        showModal = true;
    } 

    function confirmDelete() {
        if (indexToDelete !== null) {
    
        $notes = $notes.filter((_, i) => i !== indexToDelete);
        
        // Close modal
        showModal = false;
        indexToDelete = null;
        }

        // Show success toast
        triggerToast("Note deleted successfully!");
    }

    function edithFunction(index: number) {

      //setting object index number
      selectedIndex = index

      // populate the form with user info
      noteInfo.title = $notes[index].title
      noteInfo.content = $notes[index].content
      
      
      //hiding add user btn and unhiding update
      btnState = false

      window.scrollTo({ top: 0, behavior: 'smooth' });
        
    }

    const updateFunction = () => {

        //updating the note
        $notes[selectedIndex].title = noteInfo.title
        $notes[selectedIndex].content = noteInfo.content

        // setting object index number back to null
        selectedIndex = -1

        // clearing the form
        noteInfo.title = ''
        noteInfo.content = ''
       

        //hiding update btn and unhiding add user btn
        btnState = true


        // Show success toast
        triggerToast("Note updated successfully!");
    }

    const cancleFunction = () => {

        // clearing the form
        noteInfo.title = ''
        noteInfo.content = ''

        // setting object index number back to null
        selectedIndex = -1
        
        //hiding update btn and unhiding add user btn
        btnState = true
    }

</script>

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
                onclick={confirmDelete}
                class="flex-1 px-4 py-2 bg-orange-600 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-red-200"
            >
                Delete
            </button>
        </div>
    </div>
</div>
{/if}



<main class="m-y-0 py-5 mx-auto w-80% max-w-800">
<h1 class="font-semibold text-3xl text-center text-gray-700">Note Keeping App📝</h1>
<div class="text-gray-600 mt-8">

<div>  
    <form action="" onsubmit={submitFunction}>
        <div class="relative shadow-lg">
            <label class="text-gray-600 font-medium absolute left-4 top-2 " for="title">Title:</label>
            <input bind:value={noteInfo.title} class="text-gray-700 w-full py-3 ps-13  h-10 input" type="text" id="text">
        </div>
      
        
        <div class="relative mt-1 shadow-lg">
            <label class="text-gray-600 font-medium absolute left-4 top-3 " for="title">Content:</label>
            <textarea bind:value={noteInfo.content} class="text-gray-700 ps-20 w-full pt-2 pb-3 input h-30" id="content"></textarea>
        </div>
        
        {#if btnState}
            <button class=" shadow-lg btn font-semibold px-3 py-1 sm:bg-green-600 bg-amber-500 text-white rounded mt-4 sm:hover:bg-amber-500 hover:bg-green-500">Add Note</button>
        {/if}
    </form>

    {#if !btnState}
        <div>
             <button onclick= {updateFunction} class=" shadow-lg btn font-semibold px-3 py-1 sm:bg-green-600 bg-amber-500 text-white rounded mt-4 sm:hover:bg-amber-500 hover:bg-green-500">update Note</button>
              <button onclick={cancleFunction} class=" shadow-lg btn font-semibold px-3 py-1 bg-gray-500  text-white rounded mt-4  hover:bg-gray-800">cancel</button>
        </div>
    {/if}
</div>  

<div>
    <NoteList {openDeleteModal} {edithFunction}/>
</div>

</div>

</main>

{#if showAlert}
<!-- Overlay -->
<div class="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-100 flex items-center justify-center p-4">
    <!-- Alert Box -->
    <div class="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border-t-4 border-amber-500 animate-in fade-in zoom-in duration-200">
        <div class="flex items-center gap-3 mb-3">
            <span class="text-2xl">⚠️</span>
            <h3 class="text-lg font-bold text-gray-800">Note App Message</h3>
        </div>
        
        <p class="text-gray-600 leading-relaxed">
            {alertMessage}
        </p>
        
        <button 
            onclick={() => showAlert = false}
            class="w-full mt-6 py-2 bg-gray-800 hover:bg-black text-white rounded-xl font-semibold transition-all active:scale-95"
        >
            Got it!
        </button>
    </div>
</div>
{/if}

{#if showToast}
  <div 
    transition:fly={{ y: -50, duration: 500 }}
    class="fixed top-8 left-1/2 -translate-x-1/2 z-100 w-[90%] max-w-xs"
  >
    <div class="bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-2xl border-l-4 border-amber-500 flex items-center gap-3">
      <!-- Icon with a little bounce -->
      <span class="animate-bounce">🔔</span>
      <p class="text-sm font-semibold tracking-wide">{toastMessage}</p>
    </div>
  </div>
{/if}


