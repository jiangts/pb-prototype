  var canvas = new fabric.Canvas('c', { selection: false });
  fabric.Object.prototype.transparentCorners = false;

/*
var imgElement = document.getElementById('my-img');
var imgInstance = new fabric.Image(imgElement, {
  left: 100,
  top: 100,
  angle: 30,
  opacity: 0.85
});
canvas.add(imgInstance);
*/

fabric.Image.fromURL('img/hat1.png', function(oImg) {
  canvas.add(oImg);
});
fabric.Image.fromURL('img/hat2.JPG', function(oImg) {
  canvas.add(oImg);
});
fabric.Image.fromURL('img/hat3.JPG', function(oImg) {
  canvas.add(oImg);
});
fabric.Image.fromURL('img/hat4.JPG', function(oImg) {
  canvas.add(oImg);
});
fabric.Image.fromURL('img/hat5.JPG', function(oImg) {
  canvas.add(oImg);
});
fabric.Image.fromURL('img/hat6.JPG', function(oImg) {
  canvas.add(oImg);
});
fabric.Image.fromURL('img/hat7.JPG', function(oImg) {
  canvas.add(oImg);
});
fabric.Image.fromURL('img/hat8.JPG', function(oImg) {
  canvas.add(oImg);
});
fabric.Image.fromURL('img/hat9.JPG', function(oImg) {
  canvas.add(oImg);
});

/*
  var rect1 = new fabric.Rect({
    width: 200, height: 100, left: 0, top: 50, angle: 30,
    fill: 'rgba(255,0,0,0.5)'
  });

  var circle = new fabric.Circle({
    radius: 50, left: 275, top: 75, fill: '#aac'
  });

  var triangle = new fabric.Triangle({
    width: 100, height: 100, left: 50, top: 300, fill: '#cca'
  });

  canvas.add(rect1, circle, triangle);
  */
  canvas.on({
    'object:moving': onChange,
    'object:scaling': onChange,
    'object:rotating': onChange,
  });

  function onChange(options) {
    options.target.setCoords();
    canvas.forEachObject(function(obj) {
      if (obj === options.target) return;
      obj.setOpacity(options.target.intersectsWithObject(obj) ? 0.5 : 1);
    });
  }
