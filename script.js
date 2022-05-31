let fg_image = null;
let bg_image = null;
let fgCanvas;
let bgCanvas;
const greenThreshold = 200;

function uploadFg() {
    fgCanvas = document.getElementById('can1');
    let fileinput = document.getElementById('fgpic');
    fg_image = new SimpleImage(fileinput);
    fg_image.drawTo(fgCanvas);
}
function uploadBg() {
    bgCanvas = document.getElementById('can2');
    let fileinput = document.getElementById('bgpic');
    bg_image = new SimpleImage(fileinput);
    bg_image.drawTo(bgCanvas);
}
function doClear(canvas) {
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
}
function clearCanvas() {
    doClear(fgCanvas);
    doClear(bgCanvas);
}

function greenScreen() {
    if (fg_image == null || !fg_image.complete()) {
        alert("Foreground not loaded!");
        return;
    }
    if (bg_image == null || !bg_image.complete()) {
        alert("Background not loaded!");
        return;
    }
    clearCanvas();
    let output = new SimpleImage(fg_image.getWidth(), fg_image.getHeight());
    for (let pixel of fg_image.values()) {
        let x = pixel.getX();
        let y = pixel.getY();
        if (pixel.getGreen() > greenThreshold) {
            let bgPixel = bg_image.getPixel(x, y);
            output.setPixel(x, y, bgPixel);
        }
        else {
            output.setPixel(x, y, pixel);
        }
    }
    output.drawTo(fgCanvas);
}