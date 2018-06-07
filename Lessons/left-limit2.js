var canvas_minx2 = 0;
            var canvas_maxx2 = 800;
            var canvas_miny2 = 0;
            var canvas_maxy2 = 800;
            var scene_size2 = 5.0
            var scene_minx2 = -1 * scene_size2;
            var scene_maxx2 = scene_size2;
            var scene_miny2 = -1 * scene_size2;
            var scene_maxy2 = scene_size2;
            var canvas_graphx = 0;
            var canvas_graphy = 0;
            var canvas_x2axis_minx2 = 0;
            var canvas_x2axis_maxx2 = 0;
            var canvas_x2axis_zeroy2 = 0;
            var canvas_y2axis_miny2 = 0;
            var canvas_y2axis_maxy2 = 0;
            var canvas_y2axis_zerox2 = 0;
            var canvas_tanline_x1 = 0;
            var canvas_tanline_y1 = 0;
            var canvas_tanline_x2 = 0;
            var canvas_tanline_y2 = 0;
            var slope = 0;
            var graph_coords2 = [];
            var n = 3000;
            var dx2 = 0; // set value w.r.t. n in init()

        function canvas_x2(x) {
            var u = (x - scene_minx2)/(scene_maxx2 - scene_minx2);
            return canvas_minx2 + u*(canvas_maxx2 - canvas_minx2);
        }

        function canvas_y2(y) {
            var v = (y - scene_miny2)/(scene_maxy2 - scene_miny2);
            return canvas_miny2 + (1.0 - v)*(canvas_maxy2 - canvas_miny2);
        }

        function scene_x2(x) {
            var u = (x - canvas_minx2)/(canvas_maxx2 - canvas_minx2);
            return scene_minx2 + u*(scene_maxx2 - scene_minx2);
        }

        function scene_y(y) {
            var v = 1.0 - (y - canvas_miny2)/(canvas_maxy2 - canvas_miny2);
            return scene_miny2 + v*(scene_maxy2 - scene_miny2);
        }


        function point(x, y) {
            this.x = x;
            this.y = y;
        }

        function graph_function2(x) {
            if (x < 0) {
                return Math.pow(x,2);
            }
            else{
                return x + 1;
            }
        }
        
        function init2() {
            var canvas = document.getElementById("myCanvas2");
            var i = 0;
            var x = 0;
            var y = 0;
            canvas.addEventListener("mousemove", doMouseMove2, false);
            // set up and compute graph of curve
            dx2 = (scene_maxx2 - scene_minx2)/n;
            x = scene_minx2;
            for (i=0; i<n; i++) {
                y = graph_function2(x);
                graph_coords2.push(new point(canvas_x2(x),canvas_y2(y)));
                x = x + dx2;
            }
            // set up coord axes
            canvas_x2axis_minx2 = canvas_x2(scene_minx2);
            canvas_x2axis_maxx2 = canvas_x2(scene_maxx2);
            canvas_x2axis_zeroy2 = canvas_y2(0.0);
            canvas_y2axis_miny2 = canvas_y2(scene_miny2);
            canvas_y2axis_maxy2 = canvas_y2(scene_maxy2);
            canvas_y2axis_zerox2 = canvas_x2(0.0);
            // initial tangent point location
            scene_graphx = 0.5;
            scene_graphy = graph_function2(scene_graphx);
            canvas_graphx = canvas_x2(scene_graphx);
            canvas_graphy = canvas_y2(scene_graphy);
            // initial tangent line
            draw_stuff2();
        }
        function draw_stuff2() {
            var i=0;
            var offsetx = 0;
            var offsety = 0;
            var f = "22px Trebuchet MS";
            var canvas2 = document.getElementById("myCanvas2");
            var ctx2 = canvas2.getContext("2d");
            ctx2.clearRect(canvas_minx2,canvas_miny2, canvas_maxx2-canvas_minx2, canvas_maxy2-canvas_miny2);
            ctx2.fillStyle = "white";
            ctx2.fillRect(canvas_minx2,canvas_miny2, canvas_maxx2-canvas_minx2, canvas_maxy2-canvas_miny2);
            // draw tangent marker
            ctx2.lineWidth = 0.375;
            ctx2.strokeStyle = "rgb(0,0,0,0.5)";
            for (var i = Math.floor(scene_minx2) + 1; i < Math.floor(scene_maxx2); i += 1){
                ctx2.beginPath();
                ctx2.moveTo(canvas_x2(i),canvas_y2(scene_miny2));
                ctx2.lineTo(canvas_x2(i),canvas_y2(scene_maxy2));
                ctx2.stroke();
                ctx2.beginPath();
                ctx2.moveTo(canvas_x2(scene_minx2),canvas_y2(i));
                ctx2.lineTo(canvas_x2(scene_maxx2),canvas_y2(i));
                ctx2.stroke();
            }
            ctx2.lineWidth = 1.0;
            ctx2.beginPath();
            ctx2.arc(canvas_graphx,canvas_graphy,4.5,2*Math.PI,false);
            ctx2.fillStyle = "blue";
            ctx2.fill();
            // draw coord axes
            ctx2.strokeStyle = "black";
            ctx2.beginPath();
            ctx2.moveTo(canvas_x2axis_minx2,canvas_x2axis_zeroy2);
            ctx2.lineTo(canvas_x2axis_maxx2,canvas_x2axis_zeroy2);
            ctx2.stroke();
            ctx2.beginPath();
            ctx2.moveTo(canvas_y2axis_zerox2,canvas_y2axis_miny2);
            ctx2.lineTo(canvas_y2axis_zerox2,canvas_y2axis_maxy2);
            ctx2.stroke();
            // draw graph of function
            ctx2.strokeStyle = "blue";
			ctx2.lineWidth = 2.0;
            ctx2.beginPath();
            ctx2.moveTo(graph_coords2[0].x,graph_coords2[0].y);
            while (i < n){
		ctx2.lineTo(graph_coords2[i].x,graph_coords2[i].y);
		i += 1
		if (i < 1502 && i > 1498){
			ctx2.stroke();
			i = 1503;
			ctx2.beginPath();
		}
	     }
            ctx2.stroke();
	    ctx2.lineWidth = 1.0;
            // draw tangent line
            ctx2.fillStyle = "black";
            ctx2.font = f;
            ctx2.fillText("(" + scene_graphx.toFixed(4) + ", " + scene_graphy.toFixed(4) + ")",560,750);
			ctx2.fillText("x",canvas_maxx-30.0,canvas_xaxis_zeroy-13);
            ctx2.fillText("y",canvas_yaxis_zerox-20.0,canvas_miny+30.0);
        }

        function doMouseMove2(event) {
            var canvas2 = document.getElementById("myCanvas2");
            canvasx = event.offsetX * 2;
            canvasy = event.offsetY;
            scene_graphx = scene_x2(canvasx);
            scene_graphy = graph_function2(scene_graphx);
            canvas_graphx = canvas_x2(scene_graphx);
            canvas_graphy = canvas_y2(scene_graphy);
            draw_stuff2();
          }
