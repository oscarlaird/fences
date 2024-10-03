<script>
    import "../app.css";
    import FenceBox from "./FenceBox.svelte";
    import lines_utils from "$lib/lines";
    import { Button } from "$lib/components/ui/button";
    import Sidebar from "./Sidebar.svelte";
    import Gallery from "./Gallery.svelte";
    import { lines } from "$lib/stores.js";
    import ShaderTest from "./ShaderTest.svelte";
    function handleKeydown(event) {
        if (event.key === "ArrowRight") { lines.set(lines_utils.right($lines)) }
        if (event.key === "ArrowLeft") { lines.set(lines_utils.left($lines)) }
        if (event.key === "ArrowUp") { lines.set(lines_utils.forward($lines)) }
        if (event.key === "ArrowDown") { lines.set(lines_utils.backward($lines)) }
    }
</script>

<div on:keydown={handleKeydown} tabindex="0">

<div class="fullscreen flex flex-row h-screen w-screen bg-gray-200">
    <div class="h-screen w-3/4">
        <div class="bg-[url('/background.png')] bg-cover bg-center w-full h-full">
            <div class="flex flex-col items-center backdrop-blur-md justify-between pt-8 w-full h-full">
                <div class="bg-white p-8 flex flex-col items-center gap-4 border-4 border-black rounded-sm shadow-heavy">
                    <div class="text-5xl font-crimson">Gordian</div>
                    <div class="text-2xl italic font-crimson">Another Mesmerizing Example of Emergent Complexity</div>
                </div>
                <div class="h-[60%] aspect-square bg-white border-4 border-black rounded-sm shadow-heavy">
                    <FenceBox />    
                    <!-- <ShaderTest /> -->
                </div>
                <div class="gallery h-1/6 w-full flex flex-row justify-center">
                    <Gallery />
                </div>
            </div>
        </div>
    </div>
    <div class="sidebar_and_footer flex flex-col h-screen w-1/4 bg-gray-800">
        <Sidebar />
        <div class="footer h-16 bg-gray-700 flex flex-row justify-between items-center p-4 text-base text-white">
            <div><a class="hover:underline" href="/help">Help</a></div>
            <div><a class="hover:underline" href="/about">About</a></div>
        </div>
    </div>
</div>


</div>
