var debug;

function checkSoln(dimensions, topy, leftx) {
    x = dimensions[0];
    y = dimensions[1];
    var imgs = canvas.getObjects().slice(0,x*y);
    for(j = 0; j < x*y; j++)
    {
        var im = imgs[j];
        var imNum = parseInt(im.getSrc().charAt(im.getSrc().indexOf(filename) + filename.length)) - 1;
        if (!(
            im.getLeft() == leftx + 100 * (imNum % x) && 
            im.getTop() == topy + 100 * Math.floor(imNum / x) 
            && im.getAngle() == 0
           ) )
        {
            return im;
        }
    }
    return true;
}
