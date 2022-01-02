(function () {

	var viewer = $("#image360");
	var frameUrl = "https://scaleflex.airstore.io/demo/chair-360-36/chair_#.jpg";
	var frameStart = 1;
	var frameEnd = 36;

	for(var i=frameStart; i<=frameEnd; i++) {
		let url = frameUrl.replace("#", i);
		viewer.append(`<img src="${url}" class="img-fluid" style="display: none;">`);
	}
 
	var that = $(this);
	var frames = $("#image360 img");	
	var currentFrame = 0
	var totalFrames = frames.length;
	var start_x;

	frames.on("dragstart", function(event) { event.preventDefault(); });

    function update360(dir) {
		frames[currentFrame].style.display = "none";
        currentFrame += dir;
        if(currentFrame < 0) {
			currentFrame = totalFrames-1;
		}
        else if(currentFrame > totalFrames-1) {
			currentFrame = 0;
		}
		frames[currentFrame].style.display = "";
    }

	function mouseUp(event) {
        that.off("mouseup", mouseUp);
		that.off("mousemove", rotateMouseMove);
		document.body.style.cursor = "default";
	}   

	function rotateMouseDown(event) { 
	    start_x = event.pageX;
        that.on("mouseup", mouseUp);
		that.on("mousemove", rotateMouseMove);
        document.body.style.cursor = "w-resize"; 
	};

	function rotateMouseMove(event) {
		let dx = event.pageX - start_x;
        let abs_dx = Math.abs(dx);
        
        if(abs_dx > 5) {
            update360(dx / abs_dx);
            start_x = event.pageX;
        }
	}

	viewer.on("mousedown", rotateMouseDown);
	that.on("mouseup", mouseUp);
	that.on("mousemove", rotateMouseMove);

	frames[currentFrame].style.display = "";

})();