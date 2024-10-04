
<script>
    import { Button } from "$lib/components/ui/button/index.js";
    import { ZoomIn, ZoomOut, CircleHelp, Expand, X, Plus, Shrink } from 'lucide-svelte';
    export let fullscreen;
    export let show_help;
    export let zoom_size;
    let open = true;
    function toggle() {
        console.log("toggle");
        open = !open;
    }

</script>
  
<div class="player_controls flex flex-row bg-none p-2 rounded-md border-gray-600 border-2 absolute z-20">
    {#if open}
        <Button class="h-10 border-r-2 border-r-gray-600 rounded-none text-gray-600" variant=ghost on:click={toggle}><X class="h-6 w-6 transform hover:scale-125" /></Button>
        <!-- <Button class="h-10 border-r-2 border-r-gray-600 rounded-none text-gray-600" variant=ghost on:click={() => {show_help = !show_help}}><CircleHelp          class="h-6 w-6 transform hover:scale-125" /></Button> -->
        <Button class="h-10 border-r-2 border-r-gray-600 rounded-none text-gray-600" variant=ghost on:click={() => {zoom_size *= 1.25}}><ZoomOut             class="h-6 w-6 transform hover:scale-125" /></Button>
        <Button class="h-10 border-r-2 border-r-gray-600 rounded-none text-gray-600" variant=ghost on:click={() => {zoom_size *= 0.8}}><ZoomIn              class="h-6 w-6 transform hover:scale-125" /></Button>
        <Button class="h-10 border-r-0 border-r-gray-600 rounded-none text-gray-600" variant=ghost on:click={() => {fullscreen = !fullscreen}}>
            {#if fullscreen}
                <Shrink class="h-6 w-6 transform hover:scale-125" />
            {:else}
                <Expand class="h-6 w-6 transform hover:scale-125" />
            {/if}
        </Button>
    {:else}
        <Button class="h-10 border-r-0 border-r-gray-600 rounded-none text-gray-600 z-10" variant=ghost on:click={toggle}><Plus class="h-6 w-6 transform hover:scale-125" /></Button>
    {/if}
</div>

<style>
    div {
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }
</style>
