<script>
    import "../app.css";
    import FenceBox from "./FenceBox.svelte";
    import dummy_lines from "$lib/dummy/lines.json"
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";
    import lines_utils from "./lines";
    import { Button } from "$lib/components/ui/button";
    import Sidebar from "./Sidebar.svelte";
    let lines = dummy_lines;
    lines = lines_utils.createLines(360);
    let tweened_lines = tweened(lines, { duration: 400, easing: cubicOut });
    $: tweened_lines.set(lines);
    let delta_move = 0.1;
    function handleKeydown(event) {
        if (event.key === "ArrowRight") { lines = lines_utils.right(lines) }
        if (event.key === "ArrowLeft") { lines = lines_utils.left(lines) }
        if (event.key === "ArrowUp") { lines = lines_utils.forward(lines) }
        if (event.key === "ArrowDown") { lines = lines_utils.backward(lines) }
    }
</script>


<div class="fullscreen flex flex-row h-screen w-screen bg-gray-200">
    <div class="flex flex-col h-screen flex-1">
        I am the main panel
    </div>
    <div class="sidebar_and_footer flex flex-col h-screen w-1/4 bg-gray-800">
        <Sidebar />
        <div class="footer h-16 bg-gray-700 flex flex-row justify-between items-center p-4 text-base text-white">
            <div><a class="hover:underline" href="/help">Help</a></div>
            <div><a class="hover:underline" href="/about">About</a></div>
        </div>
    </div>
</div>


<div on:keydown={handleKeydown} tabindex="0">

<Button >hello</Button>
<br>
<FenceBox lines={$tweened_lines} />    

</div>