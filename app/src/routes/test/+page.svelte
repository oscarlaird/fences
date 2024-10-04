<script>
    import '../../kbd.css';
    import Player from "../Player.svelte";
    import { Button } from "$lib/components/ui/button";
    import { ChevronFirst, ChevronLeft, ChevronRight, ChevronLast } from 'lucide-svelte';
    import { ZoomIn, ZoomOut, CircleHelp, Expand, X } from 'lucide-svelte';

</script>
  
<div class="player_controls flex flex-row bg-white p-2 rounded-md border-gray-200 border-2 absolute">
    <Button class="h-10 border-r-2 border-r-gray-200 rounded-none text-gray-600" variant=ghost><X class="h-6 w-6" /></Button>
    <Button class="h-10 border-r-2 border-r-gray-200 rounded-none text-gray-600" variant=ghost><CircleHelp class="h-6 w-6" /></Button>
    <Button class="h-10 border-r-2 border-r-gray-200 rounded-none text-gray-600" variant=ghost><Expand class="h-6 w-6" /></Button>
    <Button class="h-10 border-r-2 border-r-gray-200 rounded-none text-gray-600" variant=ghost><ZoomIn class="h-6 w-6" /></Button>
    <Button class="h-10 border-r-0 border-r-gray-200 rounded-none text-gray-600" variant=ghost><ZoomOut class="h-6 w-6" /></Button>
</div>

<Player />

<style>
    div {
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(255, 255, 255, 0.8);
    }
</style>
