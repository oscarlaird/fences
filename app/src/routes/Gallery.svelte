	
<script lang="ts">
    import { onMount } from "svelte";
    import { restore_metadata } from "$lib/stores.js";
    import { getJsonDataFromPNG } from "$lib/png_metadata.js";
    let manifest = [ "a1.png", "a2.png", "a3.png", "a4.png", "a5.png", "a6.png", "a7.png", "a8.png", "a9.png", "a10.png", "a11.png", "a12.png"];
    onMount(() => {
    });
</script>

<div class="grid grid-cols-3 gap-4 p-4 flex-1 overflow-y-auto">
    {#each manifest as filename}
        <button 
            class="cursor-pointer transform hover:scale-105 transition-transform"
            on:click={() => {
                fetch(`/examples/${filename}`)
                    .then(response => response.blob())
                    .then(blob => {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const dataUrl = e.target.result;
                            const png_meta = getJsonDataFromPNG(dataUrl);
                            console.log(png_meta);
                            if (!png_meta) {
                                // toast.error("Could Not Restore Drawing", {
                                //     description: "No Gordian metadata found in PNG file.",
                                // });
                                return;
                            }
                            restore_metadata(png_meta);
                        };
                        reader.readAsDataURL(blob);
                    });
            }}
        >
            <img 
                src="/examples/{filename}" 
                alt={filename} 
                class="w-48 h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow" 
            />
        </button>
    {/each}
</div>
