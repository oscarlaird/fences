<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import { RotateCcw } from 'lucide-svelte';

    const line_counts = [
     {
      value: 36,
      label: "36"
     },
     {
      value: 360,
      label: "360"
     },
     {
      value: 3600,
      label: "3600"
     },
     {
      value: 36000,
      label: "36000"
     },
    ];

    const themes = [
        {
        value: "light",
        label: "Light"
        },
        {
        value: "dark",
        label: "Dark"
        },
        {
        value: "solarized",
        label: "Solarized"
        }
    ];

    const strokes = [
        {
        value: 0.1,
        label: "0.1"
        },
        {
        value: 0.5,
        label: "0.5"
        },
        {
        value: 1,
        label: "1"
        }
    ];
</script>
    
<div class="sidebar_container flex-1 w-100 h-100 bg-gray-400 p-8 gap-8 flex flex-col">

   <Card.Root class="w-100">
    <Card.Header> <Card.Title>Control</Card.Title> </Card.Header>
    <Card.Content>
        <!-- TODO: Do I need a form? -->
        <div class="content_box flex flex-col gap-8">
            <Button class="h-16 text-lg">
                <RotateCcw class="mr-3 h-6 w-6" />
                RESET
            </Button>
            <div class="flex flex-col space-y-1.5">
                <Label for="number_lines">Number of Lines</Label>
                <Select.Root>
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
    <Card.Header> <Card.Title>Style</Card.Title> </Card.Header>
    <Card.Content>
        <!-- TODO: Do I need a form? -->
        <div class="content_box flex flex-col gap-8">
            <div class="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label for="airplane-mode">Show Arrowheads</Label>
            </div>
            <div class="flex flex-col space-y-1.5">
                <Label for="theme">Theme</Label>
                <Select.Root>
                    <Select.Trigger id="theme"> <Select.Value placeholder="Select" /> </Select.Trigger>
                    <Select.Content>
                        {#each themes as theme}
                            <Select.Item value={theme.value} label={theme.label} >{theme.label}</Select.Item >
                        {/each}
                    </Select.Content>
                </Select.Root>
            </div>
            <div class="flex flex-col space-y-1.5">
                <Label for="stroke">Stroke Width</Label>
                <Select.Root>
                    <Select.Trigger id="stroke"> <Select.Value placeholder="Select" /> </Select.Trigger>
                    <Select.Content>
                        {#each strokes as stroke}
                            <Select.Item value={stroke.value} label={stroke.label} >{stroke.label}</Select.Item >
                        {/each}
                    </Select.Content>
                </Select.Root>
            </div>
        </div>
    </Card.Content>
   </Card.Root>


   <Card.Root class="w-100">
    <Card.Header> <Card.Title>Export</Card.Title> </Card.Header>
    <Card.Content>
        <!-- TODO: Do I need a form? -->
        <div class="content_box flex flex-col gap-4">
            <div class="none">
                <Button>Save Wallpaper as .png</Button>
            </div>
            <div class="none">
                <Button>Save Animation as .gif</Button>
            </div>
        </div>
    </Card.Content>
   </Card.Root>

</div>