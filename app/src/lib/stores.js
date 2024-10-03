import { writable, derived } from "svelte/store";
import line_utils from "$lib/lines";

const settings = writable({
    number_of_lines: 36,
    stroke_width: 0.1,
    color_theme: "dark",
    arrowheads: false,
    colors: {start: "#ff0000", end: "#0000ff", bg: "#000000"}
});
const lines = writable(line_utils.createLines(36));

const eventBus = writable(null);

export { settings, lines, eventBus };