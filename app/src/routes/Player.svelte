<script>
    import { onMount } from "svelte";
    import { Button } from "$lib/components/ui/button/index.js";
    import { ChevronFirst, ChevronLeft, ChevronRight, ChevronLast } from 'lucide-svelte';
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    let progress_container;

    export let N = 10;
    export let chosen_n = 5;
    export let preview_n = 3;
    export let previewing = false;

    $: preview_perc = N===0 ? 0 : Math.round(100.0 * preview_n / N);
    $: chosen_perc = N===0 ? 0 : Math.round(100.0 * chosen_n / N);
    let tweened_preview_perc = tweened(preview_perc, { duration: 100, easing: cubicOut });
    let tweened_chosen_perc = tweened(chosen_perc, { duration: 400, easing: cubicOut });
    $: tweened_preview_perc.set(preview_perc);
    $: tweened_chosen_perc.set(chosen_perc);
    function handleMouseMove(event) {
        let frac = (event.clientX - progress_container.getBoundingClientRect().left) / progress_container.clientWidth;
        // N.B. you'll get bugs if you split this into two lines
        // if you assign to preview_n in multiple steps, then 
        // derived stores will react to the intermediate values
        preview_n = Math.max(0, Math.min(N, Math.round(frac * N)));
        previewing = true;
    }
    function handleMouseLeave(event) {
        previewing = false;
    }
    function handleBlur(event) {
        previewing = false;
    }
    function handleClick(event) {
        chosen_n = preview_n;
    }
    function goStart() {
        chosen_n = 0;
    }
    function prev() {
        chosen_n = Math.max(0, chosen_n - 1);
    }
    function next() {
        chosen_n = Math.min(N, chosen_n + 1);
    }
    function goEnd() {
        chosen_n = N;
    }

</script>

<div class="box h-full pr-8 pl-4 flex flex-row items-center gap-8">
    <div class="player_controls flex flex-row bg-white p-2 rounded-md border-gray-500 border-2">
        <Button class="h-10" variant=ghost on:click={goStart}><ChevronFirst class="h-6 w-6" /></Button>
        <Button class="h-10" variant=ghost on:click={prev}><ChevronLeft class="h-6 w-6" /></Button>
        <Button class="h-10" variant=ghost on:click={next}><ChevronRight class="h-6 w-6" /></Button>
        <Button class="h-10" variant=ghost on:click={goEnd}><ChevronLast class="h-6 w-6" /></Button>
    </div>
    <div class="progress_container flex-1 pt-12 pb-12 flex flex-col justify-center relative"
        bind:this={progress_container}
        on:mousemove={handleMouseMove}
        on:mouseleave={handleMouseLeave}
        on:blur={handleBlur}
        on:click={handleClick}
    >
        <!-- Outer and inner bar -->
        <div class="progress bg-gray-300 h-6 rounded-full relative">
            <div class="progress_bar bg-gray-400 h-6 rounded-full absolute"
              style:width={previewing ? `${$tweened_preview_perc}%` : `${$tweened_chosen_perc}%`}
            ></div>
            <div class="progress_bar h-6 rounded-full absolute"
              class:bg-gray-600={true}
              style:width={$tweened_chosen_perc}%
            ></div>
        </div>
        <!-- Slider handle / Black circle with white inner circle -->
        <div class="circle h-12 w-12 rounded-full bg-black absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
            style:left={previewing ? `${$tweened_preview_perc}%` : `${$tweened_chosen_perc}%`}
        >
            <div class="inner_circle h-8 w-8 rounded-full"
                class:bg-white={previewing}
            ></div>
        </div>

    </div>

</div>