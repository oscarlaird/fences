<script>
    export let lines;
    let line_length = 5;
    $: computed_lines = lines.map((line) => {
        return {
            x1: line[0] - Math.cos(line[2]) * line_length/2,
            y1: line[1] - Math.sin(line[2]) * line_length/2,
            x2: line[0] + Math.cos(line[2]) * line_length/2,
            y2: line[1] + Math.sin(line[2]) * line_length/2,
        }
    })
</script>

<svg viewBox="-20 -20 40 40">
    {#each computed_lines as {x1, y1, x2, y2}}
        <line x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="black" stroke-width="0.1" />
    {/each}
</svg>

<style>
    svg {
        width:  1400px;
        height: 1400px;
        border: 1px solid black;
    }
    line {
        stroke: black;
        stroke-width: 0.1;
    }
</style>