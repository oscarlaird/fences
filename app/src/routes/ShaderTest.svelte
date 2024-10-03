<script>
    import { onMount } from "svelte";
    import init, { generate_points } from "$lib/wasm/my_webgl_app.js";
    onMount(async () => {
        console.log("mounted");
        const wasm = await init(); // initialize the wasm module
        const pointsPtr = generate_points();
        const points = new Float32Array(wasm.memory.buffer, pointsPtr, 6);
        console.log("points", points);
        // 
        initWebGL(canvas);
        drawPoints(points);
    })
    let canvas;
    let gl;
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
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT); // clear the color buffer

    }
    const vertexShaderSource = `
    attribute vec2 a_position;
    uniform vec2 u_resolution;

    void main() {
        // Convert the position from pixels to clip space
        vec2 zeroToOne = a_position / u_resolution;
        vec2 zeroToTwo = zeroToOne * 2.0;
        vec2 clipSpace = zeroToTwo - 1.0;

        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);  // Flip y-axis
        gl_PointSize = 10.0;  // Fixed point size (adjust as needed)
    }
`;
    const fragmentShaderSource = `
        precision mediump float;

        void main() {
            // Set the fragment color (red in this case)
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Red color
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
        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        const program = createProgram(gl, vertexShader, fragmentShader);
        gl.useProgram(program);
        const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
        gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
        return positionAttributeLocation;
    }
    function drawPoints(points) {
        // Create a buffer and put the points in it
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

        // Enable the attribute
        const positionLocation = initShaders();
        gl.enableVertexAttribArray(positionLocation);

        // Tell WebGL how to pull data from the buffer
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        // Draw the points (as circles using point primitives)
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, points.length / 2);  // 2 floats per point (x, y)
    }


</script>

<canvas bind:this={canvas} ></canvas>

<style>
    #canvas {
        width: 100%;
        height: 100%;
        background-color: red;
    }
</style>