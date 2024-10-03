<script>
    import { settings, lines, eventBus } from "$lib/stores.js";

    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";
    import { onMount } from "svelte";
    let tweened_lines = tweened($lines, { duration: 400, easing: cubicOut });
    let fences_svg;
    // reset tweened_lines when the number of lines changes
    $: if ($lines.length !== $tweened_lines.length) {
        tweened_lines = tweened($lines, { duration: 400, easing: cubicOut });
    }
    $: tweened_lines.set($lines);


    let line_length = 5;
    $: computed_lines = $tweened_lines.map((line) => {
        return {
            x1: line[0] - Math.cos(line[2]) * line_length/2,
            y1: line[1] - Math.sin(line[2]) * line_length/2,
            x2: line[0] + Math.cos(line[2]) * line_length/2,
            y2: line[1] + Math.sin(line[2]) * line_length/2,
        }
    })
    $: computed_straight_lines = $tweened_lines.map((line) => {
        return {
            x1: line[0] - line_length/2,
            y1: line[1],
            x2: line[0] + line_length/2,
            y2: line[1],
        }
    })
    onMount(() => {
        let eventBusUnsubscribe = eventBus.subscribe((event) => {
            if (event === null) {
                return;
            }
            if (event.type === "dl_png") {
                console.log("dl_png");
                // create a url from the svg data
                // draw it on a big canvas and create a png url from the canvas
                // create a link and click it
                const svgData = new XMLSerializer().serializeToString(fences_svg);
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                const scale_factor = 4;
                canvas.width = fences_svg.clientWidth * scale_factor;
                canvas.height = fences_svg.clientHeight * scale_factor;
                const img = new Image();
                const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
                const url = URL.createObjectURL(svgBlob);
                img.onload = () => {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    const pngData = canvas.toDataURL("image/png");
                    const a = document.createElement("a");
                    a.download = "fences.png";
                    a.href = pngData;
                    a.click();
                    URL.revokeObjectURL(pngData);
                };
                img.src = url;
            }
        });
        return () => {
            eventBusUnsubscribe();
        }
    });
</script>

<svg bind:this={fences_svg} viewBox="-20 -20 40 40"
    class="w-full h-full border-4 border-black"
    style="background-color: {$settings.colors.bg};"
>
    {#each computed_lines as {x1, y1, x2, y2}, i}
        <defs>
            <linearGradient id="grad{i}" x1={x1} y1={y1} x2={x2} y2={y2} gradientUnits="userSpaceOnUse">
            <stop offset="0%" style="stop-color:{$settings.colors.start};stop-opacity:1" />
            <stop offset="100%" style="stop-color:{$settings.colors.end};stop-opacity:1" />
            </linearGradient>
        </defs>
        <line x1={x1} y1={y1} x2={x2} y2={y2}
            stroke-width="{$settings.stroke_width}"
            stroke="url(#grad{i})"
        />
    {/each}
</svg>