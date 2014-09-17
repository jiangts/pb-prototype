var debug;
//create new canvas
var canvas = new fabric.Canvas('c', {
	selection: false
});
var isClicked = false
fabric.Object.prototype.transparentCorners = false;

//to add an image (puzzle pieces) to canvas. Needed a callback function to change borders after add.
function addPiece(img, callback) {
	var current = canvas.getObjects().length;
	var angle = (Math.floor(Math.random() * 4)) * 90;
	//console.log(angle);
	img.set({
		top: 50,
		left: 100 * current + 50,
		angle: angle,
		centerTransform: true,
		originX: "center",
		originY: "center"
	});
	canvas.add(img);
	var allobj = canvas.getObjects();
	var len = allobj.length;
	callback(allobj[len - 1]);
}

//remove border controls after adding the image.
//add the grid lines for the puzzle
function afterAdd(obj) {
	obj.hasControls = false;
    var x = dimensions[0];
    var y = dimensions[1];
	if (canvas.getObjects().length == x * y) {
		//Adding the gridlines
		for (k = 0; k <= x; k++) {
			canvas.add(new fabric.Line([0, 0, 0, y * 100], {
				left: 100 + 100 * k,
				top: 100,
				stroke: 'grey',
				hasControls: false,
				lockMovementX: true,
				lockMovementY: true
			}));
		}

		for (k = 0; k <= y; k++) {
			canvas.add(new fabric.Line([0, 0, x * 100, 0], {
				left: 100,
				top: 100 + 100 * k,
				stroke: 'grey',
				hasControls: false,
				lockMovementX: true,
				lockMovementY: true
			}));
		}

	}
}

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
function makePuzzle(filename, extension, dimensions) {
	var x = dimensions[0];
	var y = dimensions[1];

    var piece_order = [];
    for (i = 1; i < x * y + 1; i++) {
        piece_order.push(i);
    }
    shuffle(piece_order);
	for (idx in piece_order) {
		var file = 'img/' + filename + piece_order[idx] + '.' + extension;
		fabric.Image.fromURL(file, function(oImg) {
			addPiece(oImg, afterAdd);
		});
	}
}

var filename = 'Eiffel';
var extension = 'jpg';
var dimensions = [2, 3];
var time_arr = [];

function startPuzzle(){
    makePuzzle(filename, extension, dimensions);
    time_arr.push((new Date()).getTime() / 1000);
}

canvas.on({
	'object:moving': onChange,
	'object:selected': onChange,
	'object:rotating': onChange,
	'mouse:down': function() {
		isClicked = true;
	},
	'mouse:move': function() {
		isClicked = false;
	},
	'mouse:up': rotateNmoveImage
});

function rotateNmoveImage(options) {
	if (options.target) {
		var img = options.target;
		if (isClicked) {
			img.setAngle((img.getAngle() + 90) % 360);
		}
		//img.translateToCenterPoint(img.getCenterPoint(), img.getOriginX(), img.getOriginY());
		//alert(img.getCenterPoint())
		img.setTop(Math.round(img.getTop() / 100 + 5.5) * 100 % 600 + 50)
		img.setLeft(Math.round(img.getLeft() / 100 + 8.5) * 100 % 900 + 50) ///TODO fix rotate => fix modding shift thing problem!!1
		img.setCoords();
		canvas.renderAll();
	}
};


function onChange(options) {
	options.target.setCoords();
	canvas.forEachObject(function(obj) {
		if (obj === options.target) return;
		//obj.setOpacity(options.target.intersectsWithObject(obj) ? 0.5 : 1);
	});
}


//to round to n decimal places
function round(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}

function resetHandler() {
    canvas.clear();
    makePuzzle(filename, extension, dimensions);
}

function submitHandler() {
    time_arr.push((new Date()).getTime() / 1000);

    var success = checkSoln(dimensions, 150, 150);
    debug = success;
    if(success == true){
        var time1 = time_arr[0];
        var timelast = time_arr[time_arr.length-1];
        var seconds_used = timelast - time1;
        time_arr_diff = [];
        for(var d=0; d<time_arr.length-1; d++){
            timediff = time_arr[d+1] - time_arr[d];
            time_arr_diff.push( round(timediff, 2) );
        }
        //alert('You solved the puzzle in ' + seconds_used + ' seconds!\n' + time_arr_diff);
        var stringthingy = window.btoa( round(seconds_used, 2) + '\n' + time_arr_diff);
        //console.log(time_arr_diff);
        document.getElementById("completion_code").innerHTML = stringthingy;
        prompt('Copy your completion code from the textbox below!', stringthingy);
    } else {
        alert('Sorry, your solution is incorrect. Please try again.');
    }
}
