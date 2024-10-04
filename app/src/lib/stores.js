import { writable, derived } from "svelte/store";
import { get } from "svelte/store";
import line_utils from "$lib/lines";

const settings = writable({
    number_of_lines: 36,
    stroke_width: 2,
    color_theme: "dark",
    arrowheads: false,
    colors: {start: "#ff0000", end: "#0000ff", bg: "#000000"}
});
const lines = writable(line_utils.createLines(36));

const freqs = writable(Array(36).fill(0.0));
const rot_idx = writable(0);

const eventBus = writable(null);

const full_history = writable([]);
const hist_idx = writable(0);
const preview_hist_idx = writable(0);
const preview_history = derived([full_history, preview_hist_idx], ([$full_history, $preview_hist_idx]) => {
    return $full_history.slice(0, $preview_hist_idx);
});
const previewing = writable(false);

function freqs_from_hist(hist, hist_idx) {
    // history is a list of tuples (movement_type, amount)
    // movement_type: 0 for rotation, 1 for advance
    let freqs = Array(get(settings).number_of_lines).fill(0.0);    
    let rot_idx = 0;
    let K = get(settings).number_of_lines;
    for (let i = 0; i < hist_idx; i++) {
        let [movement_type, amount] = hist[i];
        if (movement_type == 0) {
            rot_idx = ((rot_idx + amount) + K) % K;
        } else {
            freqs[rot_idx] += amount;
        }
    }
    return freqs;
}
function rot_idx_from_hist(hist, hist_idx) {
    let rot_idx = 0;
    let K = get(settings).number_of_lines;
    for (let i = 0; i < hist_idx; i++) {
        let [movement_type, amount] = hist[i];
        if (movement_type == 0) {
            rot_idx += amount;
        }
    }
    // don't wrap here to avoid jumping from 0 to K-1
    // the freqs are correct, this is just to set the final angles of the lines
    // rot_idx = ((rot_idx % K) + K) % K;
    return rot_idx;
}

const derived_freqs = derived([full_history, hist_idx, previewing, preview_hist_idx], ([$full_history, $hist_idx, $previewing, $preview_hist_idx]) => {
    if ($previewing) {
        return freqs_from_hist($full_history, $preview_hist_idx);
    } else {
        return freqs_from_hist($full_history, $hist_idx);
    }
});
const derived_rot_idx = derived([full_history, hist_idx, previewing, preview_hist_idx], ([$full_history, $hist_idx, $previewing, $preview_hist_idx]) => {
    if ($previewing) {
        return rot_idx_from_hist($full_history, $preview_hist_idx);
    } else {
        return rot_idx_from_hist($full_history, $hist_idx);
    }
});

const log_line_length = writable([0.0]); // Slider expects an array; 0.0 corresponds to a line length of 1

const arrowheads = writable(true);

export { settings, lines, eventBus, freqs, rot_idx, full_history, hist_idx, preview_history, preview_hist_idx, previewing, derived_freqs, derived_rot_idx, log_line_length, arrowheads };