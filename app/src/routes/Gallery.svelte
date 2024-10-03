	
<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Carousel from "$lib/components/ui/carousel/index.js";
    import { onMount } from "svelte";
    onMount(() => {
      // embla inserts a div between the root and the content
      // we need it to propogate the height to the content
      const carousel_root = document.querySelector(".carousel_root");
      const first_child = carousel_root.firstElementChild;
      first_child.classList.add("h-full");
      // remove hidden class from the root
      carousel_root.classList.remove("hidden");
    });
  </script>
   
  <Carousel.Root
    opts={{
      align: "center",
      loop: true,
    }}
    class="hidden carousel_root w-3/4 h-full p-8"
  >
    <Carousel.Content class="h-full w-full ">
      {#each Array(5) as _, i (i)}
        <Carousel.Item class="h-full md:basis-1/2 lg:basis-1/3">
            <div class="h-full w-full shadow-heavy border-4 border-black rounded-lg shadow-sm overflow-hidden border-black bg-[url('/background.png')] bg-cover bg-center
              hover:pointer hover:scale-x-105 transform
            ">
          </div>
        </Carousel.Item>
      {/each}
    </Carousel.Content>
    <Carousel.Previous class="h-16 w-16 border-black border-1" />
    <Carousel.Next class="h-16 w-16 border-black border-1" />
  </Carousel.Root>