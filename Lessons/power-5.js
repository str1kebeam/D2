var canvas_minx5 = 0;
var canvas_maxx5 = 800;
var canvas_miny5 = 0;
var canvas_maxy5 = 800;
var scene_size = 10.0
var scene_minx5 = -1 * scene_size;
var scene_maxx5 = scene_size;
var scene_miny5 = -1 * scene_size;
var scene_maxy5 = scene_size;
var canvas_graphx = 0;
var canvas_graphy = 0;
var canvas_xaxis_minx5 = 0;
var canvas_xaxis_maxx5 = 0;
var canvas_xaxis_zeroy5 = 0;
var canvas_yaxis_miny5 = 0;
var canvas_yaxis_maxy5 = 0;
var canvas_yaxis_zerox5 = 0;
var graph_coords5 = [];
var n = 3000;
var scale = 1;
var dx5 = 0; // set value w.r.t. n in init()

        function canvas_x5(x) {
            var u = (x - scene_minx5)/(scene_maxx5 - scene_minx5);
            return canvas_minx5 + u*(canvas_maxx5 - canvas_minx5);
        }

        function canvas_y5(y) {
            var v = (y - scene_miny5)/(scene_maxy5 - scene_miny5);
            return canvas_miny5 + (1.0 - v)*(canvas_maxy5 - canvas_miny5);
        }

        function scene_x5(x) {
            var u = (x - canvas_minx5)/(canvas_maxx5 - canvas_minx5);
            return scene_minx5 + u*(scene_maxx5 - scene_minx5);
        }

        function point(x, y) {
            this.x = x;
            this.y = y;
        }

        function graph_function5(x) {
            return -1/(x*x);
        }

        function init5() {
            var canvas5 = document.getElementById("myCanvas5");
            var i = 0;
            var x = 0;
            var y = 0;
            canvas5.addEventListener("mousemove", doMouseMove5, false);
            // set up and compute graph of curve
            dx5 = (scene_maxx5 - scene_minx5)/n;
            x = scene_minx5;
            for (i=0; i<n; i++) {
                y = graph_function5(x);
                graph_coords5.push(new point(canvas_x5(x),canvas_y5(y)));
                x = x + dx5;
            }
            // set up coord axes
            canvas_xaxis_minx5 = canvas_x5(scene_minx5);
            canvas_xaxis_maxx5 = canvas_x5(scene_maxx5);
            canvas_xaxis_zeroy5 = canvas_y5(0.0);
            canvas_yaxis_miny5 = canvas_y5(scene_miny5);
            canvas_yaxis_maxy5 = canvas_y5(scene_maxy5);
            canvas_yaxis_zerox5 = canvas_x5(0.0);
            // initial tangent point location
            scene_graphx = 0.5;
            scene_graphy = graph_function5(scene_graphx);
            canvas_graphx = canvas_x5(scene_graphx);
            canvas_graphy = canvas_y5(scene_graphy);
            // initial tangent line
            draw_stuff5();
        }
        function draw_stuff5() {
            var i=0;
            var offsetx = 0;
            var offsety = 0;
            var f = "26px Trebuchet MS";
            var canvas5 = document.getElementById("myCanvas5");
            var ctx5 = canvas5.getContext("2d");
            ctx5.clearRect(canvas_minx5,canvas_miny5, canvas_maxx5-canvas_minx5, canvas_maxy5-canvas_miny5);
            ctx5.fillStyle = "white";
            ctx5.fillRect(canvas_minx5,canvas_miny5, canvas_maxx5-canvas_minx5, canvas_maxy5-canvas_miny5);
            // draw tangent marker
            ctx5.lineWidth = 0.375;
            ctx5.strokeStyle = "rgb(0,0,0,0.5)";
            for (var i = Math.floor(scene_minx5) + 1; i < Math.floor(scene_maxx5); i += scale){
                ctx5.beginPath();
                ctx5.moveTo(canvas_x5(i),canvas_y5(scene_miny5));
                ctx5.lineTo(canvas_x5(i),canvas_y5(scene_maxy5));
                ctx5.stroke();
			}
			for (var i = Math.floor(scene_miny5) + 1; i < Math.floor(scene_maxy5); i += scale){
                ctx5.beginPath();
                ctx5.moveTo(canvas_x5(scene_minx5),canvas_y5(i));
                ctx5.lineTo(canvas_x5(scene_maxx5),canvas_y5(i));
                ctx5.stroke();
            }
            ctx5.lineWidth = 1.0;
            ctx5.beginPath();
            ctx5.arc(canvas_graphx,canvas_graphy,4.5,2*Math.PI,false);
            ctx5.fillStyle = "blue";
            ctx5.fill();
            // draw coord axes
            ctx5.strokeStyle = "black";
            ctx5.beginPath();
            ctx5.moveTo(canvas_xaxis_minx5,canvas_xaxis_zeroy5);
            ctx5.lineTo(canvas_xaxis_maxx5,canvas_xaxis_zeroy5);
            ctx5.stroke();
            ctx5.beginPath();
            ctx5.moveTo(canvas_yaxis_zerox5,canvas_yaxis_miny5);
            ctx5.lineTo(canvas_yaxis_zerox5,canvas_yaxis_maxy5);
            ctx5.stroke();
            // draw graph of function
            ctx5.strokeStyle = "blue";
            ctx5.beginPath();
			ctx5.lineWidth = 2.0;
            ctx5.moveTo(graph_coords5[0].x,graph_coords5[0].y);
            for (i=0; i<n; i++) {
                ctx5.lineTo(graph_coords5[i].x,graph_coords5[i].y);
            }
            ctx5.stroke();
			ctx5.lineWidth = 1.0;
            // draw tangent line
            ctx5.fillStyle = "black";
            ctx5.font = f;
	        ctx5.fillText("x",canvas_maxx5-30.0,canvas_xaxis_zeroy5-13);
            ctx5.fillText("y",canvas_yaxis_zerox5-20.0,canvas_miny5+30.0);
		    ctx5.fillText("(" + scene_graphx.toFixed(4) + ", " + scene_graphy.toFixed(4) + ")",560,750);
        }

        function doMouseMove5(event) {
            var canvas5 = document.getElementById("myCanvas5");
            canvasx = event.offsetX * 2;
            canvasy = event.offsetY;
            scene_graphx = scene_x5(canvasx);
            scene_graphy = graph_function5(scene_graphx);
            canvas_graphx = canvas_x5(scene_graphx);
            canvas_graphy = canvas_y5(scene_graphy);
            draw_stuff5();
          }
