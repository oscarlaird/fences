<script lang="ts">
    import { Slider } from "$lib/components/ui/slider";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import { RotateCcw } from 'lucide-svelte';
    import { settings, lines, eventBus, full_history, hist_idx, log_line_length, arrowheads } from "$lib/stores.js";
    import lines_utils from "$lib/lines.js";
    let color;

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
    
<div class="sidebar_container flex-1 w-100 h-100 bg-gray-400 p-8 gap-8 flex flex-col">

   <Card.Root class="w-100">
    <Card.Header> <Card.Title class="font-crimson text-4xl font-normal">Control</Card.Title> </Card.Header>
    <Card.Content>
        <!-- TODO: Do I need a form? -->
        <div class="content_box flex flex-col gap-8">
            <Button class="h-16 text-lg" on:click={reset}
            >
                <RotateCcw class="mr-3 h-6 w-6" />
                RESET
            </Button>
            <div class="flex flex-col space-y-1.5">
                <Label for="number_lines">Number of Lines</Label>
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
        </div>
    </Card.Content>
   </Card.Root>


   <Card.Root class="w-100">
    <Card.Header> <Card.Title class="font-crimson text-4xl font-normal">Style</Card.Title> </Card.Header>
    <Card.Content>
        <!-- TODO: Do I need a form? -->
        <div class="content_box flex flex-col gap-8">
            <div class="flex items-center space-x-2">
                <Switch id="airplane-mode" bind:checked={$arrowheads} />
                <Label for="airplane-mode">Show Arrowheads</Label>
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
                <Slider bind:value={$log_line_length} max={1} min={-2} step={0.01} />
            </div>

            <div class="flex flex-col space-y-1.5">
                <Label for="theme">Theme</Label>
                <Select.Root
                    selected={themes[0]}
                    onSelectedChange={(v) => {
                        v && ($settings.colors = v.value);
                    }}
                >
                    <Select.Trigger id="theme"> <Select.Value placeholder="Select" /> </Select.Trigger>
                    <Select.Content>
                        {#each themes as theme}
                            <Select.Item value={theme.value} label={theme.label} >{theme.label}</Select.Item >
                        {/each}
                    </Select.Content>
                </Select.Root>
            </div>
            <div class="flex flex-row justify-around">
                <input type=color bind:value={$settings.colors.start} class="block h-16 w-32 rounded-md" />
                <input type=color bind:value={$settings.colors.end} class="block h-16 w-32 rounded-md" />
                <input type=color bind:value={$settings.colors.bg} class="block h-16 w-32 rounded-md" />
            </div>
            
        </div>
    </Card.Content>
   </Card.Root>


   <Card.Root class="w-100">
    <Card.Header> <Card.Title class="font-crimson text-4xl font-normal">Export</Card.Title> </Card.Header>
    <Card.Content>
        <!-- TODO: Do I need a form? -->
        <div class="content_box flex flex-col gap-4">
            <div class="none">
                <Button
                    on:click={() => {
                        eventBus.set({type: "dl_png"});
                    }}
                >Save Wallpaper as .png</Button>
            </div>
            <div class="none">
                <Button>Save Animation as .gif</Button>
            </div>
        </div>
    </Card.Content>
   </Card.Root>

</div>