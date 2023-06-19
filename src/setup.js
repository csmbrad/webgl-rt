let program;
let gl;
let scene = 1;

function main()
{
    // Retrieve <canvas> element
    let canvas = document.getElementById('webgl');

    // Get the rendering context for WebGL
    gl = WebGLUtils.setupWebGL(canvas, undefined);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    program = initShaders(gl, "vshader", "fshader");
    gl.useProgram(program);

    gl.viewport( 0, 0, canvas.width, canvas.height );

    // Set clear color
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    let buffer = gl.createBuffer();

    // Create a square as a strip of two triangles.
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            -1,1,
            0,1,
            1,0,
            -1,-1,
            0,1,
            -1,0]),
        gl.STATIC_DRAW
    );

    gl.aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(gl.aPosition);
    gl.vertexAttribPointer(gl.aPosition, 3, gl.FLOAT, false, 0, 0);

    // Event listeners for buttons to change scene.
    document.getElementById("scene1").addEventListener("click", function(e){
        e.preventDefault();
        scene = 1;
        render();
    })
    document.getElementById("scene2").addEventListener("click", function(e){
        e.preventDefault();
        scene = 2;
        render();
    })
    document.getElementById("scene3").addEventListener("click", function(e){
        e.preventDefault();
        scene = 3;
        render();
    })

    render();
}

/**
 * Pushes the latest scene number to the gpu for rendering.
 */
function render() {
    let scenePosition = gl.getUniformLocation(program, "sceneNum");
    gl.uniform1i(scenePosition, scene);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}