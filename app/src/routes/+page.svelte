<script>
    import "../app.css";
    import { Button } from "$lib/components/ui/button";
    import Sidebar from "./Sidebar.svelte";
    import Gallery from "./Gallery.svelte";
    import { settings, full_history, derived_freqs, hist_idx, preview_hist_idx, previewing } from "$lib/stores.js";
    import Viewer from "./Viewer.svelte";
    import Player from "./Player.svelte";
    // function handleKeydown(event) {
    //     if (event.key === "ArrowRight") { lines.set(lines_utils.right($lines)) }
    //     if (event.key === "ArrowLeft") { lines.set(lines_utils.left($lines)) }
    //     if (event.key === "ArrowUp") { lines.set(lines_utils.forward($lines)) }
    //     if (event.key === "ArrowDown") { lines.set(lines_utils.backward($lines)) }
    // }
    function handleKeydown(event) {
        if (event.key === "w" || event.key === "k") { append_history([0, 1]); }  // rotate right
        if (event.key === "s" || event.key === "j") { append_history([0, -1]); }  // rotate left
        if (event.key === "d" || event.key === "l") { append_history([1, 1.0]); }  // forward
        if (event.key === "a" || event.key === "h") { append_history([1, -1.0]); }  // backward
    }
    function append_history(entry) {
        full_history.update(h => [...h.slice(0, $hist_idx), entry]);
        $hist_idx+=1;
    }
</script>

<div on:keydown={handleKeydown} tabindex="0">

<div class="fullscreen flex flex-row h-screen w-screen bg-gray-200 relative">
    <div class="h-screen flex-1 z-10">
        <div class="bg-[url('/background.png')] bg-cover bg-center w-full h-full">
            <div class="flex flex-col items-center backdrop-blur-md justify-between pt-2 pb-2 gap-4 w-full h-full">
                <div class="bg-white p-4 flex flex-col items-center gap-2 border-4 border-black rounded-sm shadow-heavy">
                    <div class="text-5xl font-crimson">Gordian</div>
                    <div class="text-2xl italic font-crimson">Another Mesmerizing Example of Emergent Complexity</div>
                </div>
                <div class="flex-1 aspect-square max-w-full bg-white border-4 border-black rounded-sm shadow-heavy z-10">
                    <!-- <FenceBox />     -->
                    <Viewer />
                </div>
                <div class="w-3/4 bg-white border-4 border-black rounded-sm shadow-heavy">
                    <Player bind:N={$full_history.length} bind:chosen_n={$hist_idx} bind:preview_n={$preview_hist_idx} bind:previewing={$previewing} />
                </div>
                <!-- <div class="gallery h-1/6 w-full flex flex-row justify-center">
                    <Gallery />
                </div> -->
            </div>
        </div>
    </div>
    <div class="sidebar_and_footer flex flex-col h-screen max-h-screen overflow-y-scroll w-1/4 min-w-[400px] bg-gray-800
    ">
        <Sidebar />
        <div class="footer h-16 bg-gray-700 flex flex-row justify-between items-center p-4 text-base text-white">
            <div><a class="hover:underline" href="/help">Help</a></div>
            <div><a class="hover:underline" href="/about">About</a></div>
        </div>
    </div>
</div>


</div>
