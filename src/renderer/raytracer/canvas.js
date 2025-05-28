import Color from './color';

function Canvas (width, height) {
    this.width = width;
    this.height = height;
    this.pixels = Array.from({length: height}, () =>
        Array.from({length: width}, () => new Color(0,0,0))
      );
}

Canvas.prototype.writePixel = function (x, y, color) {
    console.log("Color? " + (this.pixels[y][x] instanceof Color));
    this.pixels[y][x] = color;
    console.log("successfully wrote pixel");
}

Canvas.prototype.toPixelBuffer = function () {

    let buffer = new Uint8ClampedArray(this.width * this.height * 4);

    for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
            const channelIndex = (y * this.width + x) * 4;
            const color = this.pixels[y][x];

            buffer[channelIndex] = Math.min(255, Math.max(0, Math.round(color.r * 255)));;
            buffer[channelIndex + 1] = Math.min(255, Math.max(0, Math.round(color.g * 255)));
            buffer[channelIndex + 2] = Math.min(255, Math.max(0, Math.round(color.b * 255)));
            buffer[channelIndex + 3] = 255; // full opacity
        }
    }

    return buffer;
}

Canvas.prototype.toPPMString = function () {

    let colorData = "";
    let currentLine = "";

    for(let i = 0; i < this.height; i++) {
        for(let j = 0; j < this.width; j++) {
            for(let k = 0; k < 3; k++) {
                //reformat the color channel value
                const currentColor = this.pixels[i][j];
                const currentChannel = currentColor.data[k];
                const quantizedChannel = Math.min(255, Math.round(currentChannel * 255));
                let newEntry = "" + quantizedChannel;

                //ensure no line is greater than 70 characters, with some extra space trimming branches (not all)
                if(currentLine.length + newEntry.length == 70) {
                    colorData += currentLine + newEntry + "\n";
                    currentLine = "";
                } else if (currentLine.length + newEntry.length < 70) {
                    currentLine += newEntry + " ";
                } else {
                    colorData += currentLine + "\n";
                    currentLine = newEntry + " ";
                }
            }
        }
    }

    //ensure non-full line is included
    colorData += currentLine + "\n";

    //put it all together with PPM header
    return  "P3\n" +
            this.width + " " + this.height + "\n" + 
            "255" + "\n" + 
            colorData
    ;     
}

export default Canvas;