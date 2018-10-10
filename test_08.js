// let mountains_01 = [];
// let mountains_02 = [];
// let c1;
// let c2;
//

// function setup() {
//   createCanvas(windowWidth,windowHeight);
//   c1 = color(0, 18, 62);
//   c2 = color(150);
//
//   mountains_01 = new Mountain(height - 60, height - 350, false);
//   mountains_02 = new Mountain(height - 20, height - 250, true);
// }

// function draw() {
//   setGradient(0, 0, width, height, c1, c2);
//
//   mountains_01.drawMountain();
//   mountains_01.moveMountain();
//   mountains_02.drawMountain();
//   mountains_02.moveMountain();
// }

class Mountain {
  constructor(minY, maxY, lightColor) {
    this.yoff = random(1000);
    this.xoff = 0;
    this.fill = 0;
    this.vertices = [];
    this.minY = minY;
    this.maxY = maxY;
    this.lightColor = lightColor;

    this.vertices.push([0, height]);
    for (var x = 0; x < width + 7; x += 7) {
      var y = map(noise(this.xoff, this.yoff), 0, 1, this.minY, this.maxY);
      this.vertices.push([x, y]);
      this.xoff += 0.05;
    }
    this.vertices.push([width, height]);

  }

  moveMountain() {

    // get rid of constant edge vertices and previous 'first' element
    let innerVerts = this.vertices.slice(1, -1);
    // shift x value of all vertices by 7 (value chosen to space x values)
    innerVerts = innerVerts.map(function(vert) {
      return [vert[0] - 1, vert[1]];
    });
    // clear vertices
    this.vertices = [];
    // add 'left' closing vertex
    this.vertices.push([0, height]);
    // add shifted vertices
    this.vertices.concat(innerVerts);
    var that = this;
    innerVerts.forEach(function(vert) {
      that.vertices.push(vert);
    });
    // every seventh frame add a new vertex
    if (frameCount % 7 == 0) {
      this.vertices.splice(2, 1);
      var y = map(noise(this.xoff, this.yoff), 0, 1, this.minY, this.maxY);
      this.vertices.push([width + 7, y]);
      this.xoff += 0.05;
    }
    // add 'right' closing vertex
    this.vertices.push([width, height]);
  }


  drawMountain() {

    noStroke();
    if (this.lightColor) {
      fill(5, 14, 23);
    } else {
      fill(13, 36, 59);
    }

    beginShape();
    this.vertices.forEach(function(vert) {
      vertex(vert[0], vert[1]);
    })
    endShape(CLOSE);
  }




}

function setGradient(x, y, w, h, c1, c2) {
  noFill();
  for (var i = y; i <= y + h; i++) {
    var inter = map(i, y, y + h, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}
