function createLines(num_lines) {
    let lines = [];
    for (let i = 0; i < num_lines; i++) {
        lines.push([0, 0, 0]);
    }
    return lines;
}


function incrRot(lines, dir) {
    let num_lines = lines.length;
    let delta_rot = 2 * Math.PI / num_lines;
    return lines.map((line, i) => {
        return [line[0], line[1], line[2] + dir * delta_rot * i];
    });
}
function incrPos(lines, delta_move) {
    return lines.map((line, i) => {
        return [line[0] + delta_move * Math.cos(line[2]), line[1] + delta_move * Math.sin(line[2]), line[2]];
    })
}
function forward(lines) {
    return incrPos(lines, 1);
}
function backward(lines) {
    return incrPos(lines, -1);
}
function right(lines) {
    return incrRot(lines, 1);
}
function left(lines) {
    return incrRot(lines, -1);
}

export default {
    forward,
    backward,
    right,
    left,
    createLines
};