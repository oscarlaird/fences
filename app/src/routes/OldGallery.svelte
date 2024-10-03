<script>
    let scrollContainer;
    import { onMount } from 'svelte';
    import * as Card from "$lib/components/ui/card/index.js";

    onMount(() => {
        scrollContainer.addEventListener('wheel', (e) => {
            e.preventDefault();
            scrollContainer.scrollLeft += e.deltaY;
        });
    });

</script>


<div class="h-full w-full overflow-x-scroll flex flex-row flex-nowrap items-center "
    bind:this={scrollContainer}
>
    {#each Array.from({ length: 13 }, (_, i) => i) as i}
        <div class="sm:w-1/2 md:w-1/3 lg:w-1/4 h-full flex-shrink-0 p-8">
            <div class="w-full h-full border-4 rounded-md shadow-heavy overflow-hidden border-black bg-[url('/background.png')] bg-cover bg-center">
            </div>
        </div>
    {/each}
</div>