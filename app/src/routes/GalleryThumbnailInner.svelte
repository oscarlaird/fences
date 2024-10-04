<script>
    export let idx;
    import GalleryThumbnailInner from "./GalleryThumbnailInner.svelte";
    import * as Carousel from "$lib/components/ui/carousel/index.js";
    import { getEmblaContext } from "$lib/components/ui/carousel/context.js";
    import { getContext } from "svelte";
    let ctx = getContext();
    ctx = getEmblaContext();
</script>


<Carousel.Item class="h-16 max-w-16 m-1 p-0">
    <div class="flex justify-center items-center h-full w-full rounded-lg shadow-lg border overflow-hidden bg-[url('/background.png')] bg-cover bg-center
        hover:pointer hover:cursor-pointer hover:border-red-500 transform "
        on:click={() => {
            ctx.scrollTo(idx);
        }}
        >
        hello
        {idx}
    </div>
</Carousel.Item>