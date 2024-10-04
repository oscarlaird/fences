<script lang="ts">
    import { toast } from "svelte-sonner";
    import { Slider } from "$lib/components/ui/slider";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import { RotateCcw, Download, Image, ImagePlay, ImageUp } from 'lucide-svelte';
    import Gallery from "./Gallery.svelte";
    import { settings,  eventBus, full_history, hist_idx, restore_metadata } from "$lib/stores.js";
    import { getJsonDataFromPNG } from "$lib/png_metadata.js";
    let color;
    let file_input_element;
    const line_counts = [ { value: 36, label: "36" }, { value: 360, label: "360" }, { value: 3600, label: "3600" }, { value: 36000, label: "36000" }, ];

    const themes = [ 
                     {  label: "Dark", value: { start: "#000000", end: "#ffffff", bg: "#000000" } },
                     {  label: "Light", value: { start: "#ffffff", end: "#000000", bg: "#ffffff" } },
                     {  label: "Purple", value: { start: "#ff0000", end: "#0000ff", bg: "#000000" } },
                     {  label: "Blues", value: { start: "#0000ff", end: "#00ffff", bg: "#777777" } },
                     {  label: "Peach", value: { start: "#f6d365", end: "#fda085", bg: "#777777" } },
                ];

    const strokes = [ { value: 1, label: "Thin" }, { value: 2, label: "Medium" }, { value: 3, label: "Thick" } ];

    function reset() {
        hist_idx.set(0);
        full_history.set([]);
        console.log("reset");
    }
</script>
    
<div class="sidebar_container flex-1 w-100 h-100 bg-gray-400 p-8 gap-8 flex flex-col overflow-y-scroll">

    <div class="content_box flex flex-col gap-8">
        <Button class="h-16 text-lg bg-red-800" on:click={reset}
        >
            <RotateCcw class="mr-3 h-6 w-6" />
            RESET
        </Button>
    </div>

   <Card.Root class="w-100">
    <Card.Header> <Card.Title class="font-crimson text-4xl font-normal">Style</Card.Title> </Card.Header>
    <Card.Content>
        <!-- TODO: Do I need a form? -->
        <div class="content_box flex flex-col gap-8">
            <div class="flex flex-row space-x-8">
                <div class="flex items-center space-x-1">
                    <Switch id="airplane-mode" bind:checked={$settings.arrowheads} />
                    <Label for="airplane-mode">Arrowheads</Label>
                </div>
                <div class="flex items-center space-x-1">
                    <Switch id="airplane-mode" bind:checked={$settings.verticalOrientation} />
                    <Label for="airplane-mode">Vertical</Label>
                </div>
                <div class="flex items-center space-x-1">
                    <Switch id="airplane-mode" bind:checked={$settings.halfCircle} />
                    <Label for="airplane-mode">Half Circle</Label>
                </div>
            </div>
            <div class="flex flex-col space-y-1.5 text-md">
                <Label for="number_lines" class="text-sm">Number of Lines</Label>
                <Select.Root
                    selected={line_counts[0]}
                    onSelectedChange={(v) => {
                        v && ($settings.number_of_lines = v.value);
                    }}
                >
                    <Select.Trigger id="number_lines"> <Select.Value placeholder="Select" /> </Select.Trigger>
                    <Select.Content>
                    {#each line_counts as line_count}
                        <Select.Item value={line_count.value} label={line_count.label} >{line_count.label}</Select.Item >
                    {/each}
                    </Select.Content>
                </Select.Root>
            </div>
            <div class="flex flex-col space-y-1.5">
                <Label for="stroke">Stroke Width</Label>
                <Select.Root
                    selected={strokes[1]}
                    onSelectedChange={(v) => {
                        v && ($settings.stroke_width = v.value);
                    }}
                >
                    <Select.Trigger id="stroke"> <Select.Value placeholder="Select" /> </Select.Trigger>
                    <Select.Content>
                        {#each strokes as stroke}
                            <Select.Item value={stroke.value} label={stroke.label} >{stroke.label}</Select.Item >
                        {/each}
                    </Select.Content>
                </Select.Root>
            </div>
                
            <div class="flex flex-col space-y-4">
                <Label>Line Length</Label>
                <Slider bind:value={$settings.log_line_length} max={1} min={-2} step={0.01} />
            </div>

            <div class="flex flex-col space-y-1.5">
                <Label for="theme">Theme</Label>
                <div class="flex flex-row gap-2 justify-stretch items-center">
                <Select.Root
                    selected={themes[0]}
                    onSelectedChange={(v) => {
                        v && ($settings.colors = v.value);
                    }}
                >
                    <Select.Trigger id="theme"> <Select.Value placeholder="Select" /> </Select.Trigger>
                    <Select.Content>
                        {#each themes as theme}
                            <Select.Item value={theme.value} label={theme.label} >
                        <div class="flex flex-row gap-2 justify-between items-center w-full">
                            <div>
                                {theme.label}
                            </div>
                            <div class="flex flex-row gap-2 justify-stretch items-center">
                                <input type=color bind:value={theme.value.start} class="block h-8 w-8 rounded-md" />
                                <input type=color bind:value={theme.value.end} class="block h-8 w-8 rounded-md" />
                                <input type=color bind:value={theme.value.bg} class="block h-8 w-8 rounded-md" />
                            </div>
                        </div>
                            </Select.Item >
                        {/each}
                    </Select.Content>
                </Select.Root>
                <input type=color bind:value={$settings.colors.start} class="block h-8 w-12 rounded-md" />
                <input type=color bind:value={$settings.colors.end} class="block h-8 w-12 rounded-md" />
                <input type=color bind:value={$settings.colors.bg} class="block h-8 w-12 rounded-md" />
                </div>
            </div>
            
        </div>
    </Card.Content>
   </Card.Root>


   <Card.Root class="w-100">
    <Card.Header> <Card.Title class="font-crimson text-4xl font-normal">
        <div class="flex flex-row gap-2 items-center">
            Export
            <!-- <Download class="" /> -->
        </div>
    </Card.Title> </Card.Header>
    <Card.Content>
        <!-- TODO: Do I need a form? -->
        <div class="content_box w-100 flex flex-row gap-4 justify-stretch flex-wrap">
            <div class="none flex-1">
                <Button
                    class="w-full flex flex-row gap-2"
                    on:click={() => {
                        eventBus.set({type: "dl_png"}); // handled by the Viewer component
                    }}
                >
                <Image class="h-6 w-6"/>
                Wallpaper (.png)</Button>
            </div>
            <div class="none flex-1">
                <Button
                    class="w-full flex flex-row gap-2"
                >
                <ImagePlay class="h-6 w-6"/> 
                Animation (.gif)</Button>
            </div>
        </div>
        <i class="mt-4 mb-4 block">You can load these images later and keep editing them...</i>
        <div class="none flex-1">
            <Button
                variant="outline"
                class="w-full flex flex-row gap-2"
                on:click={() => {
                    file_input_element.click();
                }}
            >
            <ImageUp class="h-6 w-6"/> 
            Load Saved Drawing</Button>
            <input type="file" accept="image/png" class="hidden" bind:this={file_input_element}
                on:change={(e) => {
                    const file = e.target.files[0];
                    console.log(file.name);
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const dataUrl = e.target.result;
                        const png_meta = getJsonDataFromPNG(dataUrl);
                        console.log(png_meta);
                        if (!png_meta) {
                            toast.error("Could Not Restore Drawing", {
                                description: "No Gordian metadata found in PNG file.",
                            });
                            return;
                        }
                        restore_metadata(png_meta);
                    };
                    reader.readAsDataURL(file);
                }}
            />
        </div>
    </Card.Content>
   </Card.Root>

   <Card.Root class="w-100">
    <Card.Header> <Card.Title class="font-crimson text-4xl font-normal">Gallery</Card.Title> </Card.Header>
    <Card.Content>
        <!-- TODO: Do I need a form? -->
        <div class="content_box flex flex-col gap-8">
        <div class="content_box flex flex-col gap-8">
            <div class="flex flex-col space-y-1.5">
                <Label for="number_lines">History</Label>
                <Gallery />
            </div>
        </div>
        <div class="content_box flex flex-col gap-8">
            <div class="flex flex-col space-y-1.5">
                <Label for="number_lines">Drawings</Label>
                <Gallery />
            </div>
        </div>
        <div class="content_box flex flex-col gap-8">
            <div class="flex flex-col space-y-1.5">
                <Label for="number_lines">Words</Label>
                <Gallery />
            </div>
        </div>
        <div class="content_box flex flex-col gap-8">
            <div class="flex flex-col space-y-1.5">
                <Label for="number_lines">Geometric</Label>
                <Gallery />
            </div>
        </div>
        </div>
    </Card.Content>
   </Card.Root>
   
</div>