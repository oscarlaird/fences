<script>
    import { onMount } from "svelte";
    import { settings, derived_freqs, derived_rot_idx, log_line_length, arrowheads } from "$lib/stores";
    import init, { create_lines } from "$lib/wasm/my_webgl_app.js";
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";
    let canvas;
    let gl;
    let wasm;
    let positionBuffer;
    let positionAttributeLocation;
    let alonglineAttributeLocation;
    let resolutionUniformLocation;
    let colorFgUniformLocation;
    let colorFg2UniformLocation;
    // tweened frequency and rotation index
    let tweened_freqs = tweened($derived_freqs, { duration: 400, easing: cubicOut });
    $: if ($derived_freqs.length !== $tweened_freqs.length) {
        tweened_freqs = tweened($derived_freqs, { duration: 400, easing: cubicOut });
    }
    $: tweened_freqs.set($derived_freqs);
    let tweened_rot = tweened($derived_rot_idx, { duration: 400, easing: cubicOut });
    $: tweened_rot.set($derived_rot_idx);

    onMount(async () => {
        // resize the canvas to its actual size as determined by css
        // the internal canvas resolution should match the css resolution
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        //
        console.log("mounted");
        wasm = await init(); // initialize the wasm module
        // 
        initWebGL(canvas);
        setup();
        render();
    })
    function initWebGL(canvas) {
        gl = canvas.getContext("webgl");
        if (!gl) {
            console.log("WebGL not supported, falling back on experimental-webgl");
            gl = canvas.getContext("experimental-webgl");
        }
        if (!gl) {
            alert("Your browser does not support WebGL");
        }
        gl.viewport(0, 0, canvas.width, canvas.height);
        console.log("width and height", canvas.width, canvas.height);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT); // clear the color buffer

    }
    const vertexShaderSource = `
    attribute vec2 a_position;
    attribute float a_alongline;
    uniform vec2 u_resolution;
    varying float v_alongline;

    void main() {
        // Convert the position from pixels to clip space
        // vec2 zeroToOne = a_position / u_resolution;
        vec2 clipSpace = a_position / 3.0;
        // vec2 zeroToTwo = zeroToOne * 2.0;
        // vec2 clipSpace = zeroToTwo - 1.0;
        gl_Position = vec4(clipSpace, 0, 1);

        v_alongline = a_alongline;
    }
`;
    const fragmentShaderSource = `
        precision mediump float;

        uniform vec3 u_color_fg;
        uniform vec3 u_color_fg2;

        varying float v_alongline;

        void main() {
            // Set the fragment color
            vec3 mixedColor = mix(u_color_fg, u_color_fg2, v_alongline);
            gl_FragColor = vec4(mixedColor, 1.0);
        }
    `;
    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }
    function createProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        const success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success) {
            return program;
        }
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }

    function initShaders() {
        // side-effect: sets up the shaders and returns the location of the a_position attribute
        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        const program = createProgram(gl, vertexShader, fragmentShader);
        gl.useProgram(program);
        // we need to know where a_position is in the shader so that
        // webGL can send the data to that attribute
        // a_position and u_resolution are the names of the attributes in the shader
        // but these are just conventions, you can name them anything
        positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        alonglineAttributeLocation = gl.getAttribLocation(program, "a_alongline");
        resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
        colorFgUniformLocation = gl.getUniformLocation(program, "u_color_fg");
        colorFg2UniformLocation = gl.getUniformLocation(program, "u_color_fg2");
    }
    function setup() {
        initShaders();
        // set the value of the uniform
        gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
        // buffer
        // Create a buffer and put the points in it
        positionBuffer = gl.createBuffer();
        // tell webgl that this buffer will contain vertex data
        // subsequent calls to gl.ARRAY_BUFFER will affect this buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        // we need to enable the attribute to allow WebGL to link buffer data to it
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.enableVertexAttribArray(alonglineAttributeLocation);
        // Tell WebGL how to pull data from the buffer
        // tell gl how to take data from the buffer and supply it to the attribute
        // 2 floats per point, false means don't normalize the data, 0 means don't skip any data
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 12, 0);
        gl.vertexAttribPointer(alonglineAttributeLocation, 1, gl.FLOAT, false, 12, 8);
        //
    }
    function render() {
        // set theming
        // colors
        let color_fg = hexToVec3($settings.colors.start);
        gl.uniform3f(colorFgUniformLocation, color_fg[0] / 255.0, color_fg[1] / 255.0, color_fg[2] / 255.0);
        let color_fg2 = hexToVec3($settings.colors.end);
        gl.uniform3f(colorFg2UniformLocation, color_fg2[0] / 255.0, color_fg2[1] / 255.0, color_fg2[2] / 255.0);
        let bg_color = hexToVec3($settings.colors.bg);
        gl.clearColor(bg_color[0] / 255.0, bg_color[1] / 255.0, bg_color[2] / 255.0, 1.0);
        // line width
        gl.lineWidth($settings.stroke_width);
        //
        const line_length = Math.pow(10, $log_line_length);
        const pointsPtr = create_lines($tweened_freqs, $tweened_rot, line_length, $arrowheads);
        // 3 floats per point (x, y, alongline); 2 points per line; 6 floats per line; 
        // 12 bytes per point; 24 bytes per line
        // WITH ARROWHEADS
        // 3 floats per point (x, y, alongline); 6 points per line; 18 floats per line;
        let floats_per_line = $arrowheads ? 18 : 6;
        let points = new Float32Array(wasm.memory.buffer, pointsPtr, $derived_freqs.length * floats_per_line);
        // console.log("points", points);

        // TODO: update dynamic buffers
        // setup vertex attributes
        gl.clear(gl.COLOR_BUFFER_BIT);
        // fill the buffer with the points
        // STATIC_DRAW hints that this data won't change
        // we are uploading the points array to the gpu for rendering
        gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
        gl.drawArrays(gl.LINES, 0, points.length / 3);  // 3 floats per point (x, y, alongline)

        requestAnimationFrame(render);
    }
    function hexToVec3(hex) {
        // Remove the '#' if it exists
        hex = hex.replace('#', '');
        // Parse the red, green, and blue components from the hex string
        const r = parseInt(hex.slice(0, 2), 16); // First two characters
        const g = parseInt(hex.slice(2, 4), 16); // Middle two characters
        const b = parseInt(hex.slice(4, 6), 16); // Last two characters
        // Return a vec3-like array with values in [0, 255]
        return [r, g, b];
    }


</script>

<canvas bind:this={canvas} ></canvas>

<style>
    canvas {
        width: 100%;
        height: 100%;
        border: 2px solid red;
    }
    /* TODO: use the fg1 color for the border of the canvas */
</style>