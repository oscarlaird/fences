	
<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Carousel from "$lib/components/ui/carousel/index.js";
    import { getEmblaContext } from "$lib/components/ui/carousel/context.js";
    import { onMount } from "svelte";
    import GalleryThumbnailInner from "./GalleryThumbnailInner.svelte";
    let embla_api;
    onMount(() => {
      // embla inserts a div between the root and the content
      // we need it to propogate the height to the content
      // const carousel_root = document.querySelector(".carousel_root");
      // const first_child = carousel_root.firstElementChild;
      // first_child.classList.add("h-full");
      // remove hidden class from the root
      // carousel_root.classList.remove("hidden");
    });
  </script>
   
  <Carousel.Root
    opts={{
      align: "center",
      loop: true,
      dragFree: true,
    }}
    class="carousel_root h-full gap-0"
    bind:api={embla_api}
  >
    <Carousel.Content class="w-full gap-0 p-0">
      {#each Array(15) as _, i (i)}
        <GalleryThumbnailInner idx={i} />
      {/each}
    </Carousel.Content>
  </Carousel.Root>