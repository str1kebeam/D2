var canvas_minx3 = 0;
var canvas_maxx3 = 800;
var canvas_miny3 = 0;
var canvas_maxy3 = 800;
var scene_size = 10.0
var scene_minx3 = -1 * scene_size;
var scene_maxx3 = scene_size;
var scene_miny3 = -1 * scene_size;
var scene_maxy3 = scene_size;
var canvas_graphx = 0;
var canvas_graphy = 0;
var canvas_xaxis_minx3 = 0;
var canvas_xaxis_maxx3 = 0;
var canvas_xaxis_zeroy3 = 0;
var canvas_yaxis_miny3 = 0;
var canvas_yaxis_maxy3 = 0;
var canvas_yaxis_zerox3 = 0;
var graph_coords3 = [];
var n = 3000;
var scale = 1;
var dx3 = 0; // set value w.r.t. n in init()

        function canvas_x3(x) {
            var u = (x - scene_minx3)/(scene_maxx3 - scene_minx3);
            return canvas_minx3 + u*(canvas_maxx3 - canvas_minx3);
        }

        function canvas_y3(y) {
            var v = (y - scene_miny3)/(scene_maxy3 - scene_miny3);
            return canvas_miny3 + (1.0 - v)*(canvas_maxy3 - canvas_miny3);
        }

        function scene_x(x) {
            var u = (x - canvas_minx3)/(canvas_maxx3 - canvas_minx3);
            return scene_minx3 + u*(scene_maxx3 - scene_minx3);
        }

        function scene_y3(y) {
            var v = 1.0 - (y - canvas_miny3)/(canvas_maxy3 - canvas_miny3);
            return scene_miny3 + v*(scene_maxy3 - scene_miny3);
        }


        function point(x, y) {
            this.x = x;
            this.y = y;
        }

        function graph_function3(x) {
            return Math.pow(x,2) - x + 1;
        }

        function init3() {
            var canvas3 = document.getElementById("myCanvas3");
            var i = 0;
            var x = 0;
            var y = 0;
            canvas3.addEventListener("mousemove", doMouseMove3, false);
            // set up and compute graph of curve
            dx3 = (scene_maxx3 - scene_minx3)/n;
            x = scene_minx3;
            for (i=0; i<n; i++) {
                y = graph_function3(x);
                graph_coords3.push(new point(canvas_x3(x),canvas_y3(y)));
                x = x + dx;
            }
            // set up coord axes
            canvas_xaxis_minx3 = canvas_x3(scene_minx3);
            canvas_xaxis_maxx3 = canvas_x3(scene_maxx3);
            canvas_xaxis_zeroy3 = canvas_y3(0.0);
            canvas_yaxis_miny3 = canvas_y3(scene_miny3);
            canvas_yaxis_maxy3 = canvas_y3(scene_maxy3);
            canvas_yaxis_zerox3 = canvas_x3(0.0);
            // initial tangent point location
            scene_graphx = 0.5;
            scene_graphy = graph_function3(scene_graphx);
            canvas_graphx = canvas_x(scene_graphx);
            canvas_graphy = canvas_y(scene_graphy);
            // initial tangent line
            draw_stuff3();
        }
        function draw_stuff3() {
            var i=0;
            var offsetx = 0;
            var offsety = 0;
            var f = "22px Verdana";
            var canvas3 = document.getElementById("myCanvas3");
            var ctx3 = canvas3.getContext("2d");
            ctx3.clearRect(canvas_minx3,canvas_miny3, canvas_maxx3-canvas_minx3, canvas_maxy3-canvas_miny3);
            ctx3.fillStyle = "white";
            ctx3.fillRect(canvas_minx3,canvas_miny3, canvas_maxx3-canvas_minx3, canvas_maxy3-canvas_miny3);
            // draw tangent marker
            ctx3.lineWidth = 0.375;
            ctx3.strokeStyle = "rgb(0,0,0,0.5)";
            for (var i = Math.floor(scene_minx3) + 1; i < Math.floor(scene_maxx3); i += scale){
                ctx3.beginPath();
                ctx3.moveTo(canvas_x(i),canvas_y(scene_miny3));
                ctx3.lineTo(canvas_x(i),canvas_y(scene_maxy3));
                ctx3.stroke();
			}
			for (var i = Math.floor(scene_miny3) + 1; i < Math.floor(scene_maxy3); i += scale){
                ctx3.beginPath();
                ctx3.moveTo(canvas_x(scene_minx3),canvas_y(i));
                ctx3.lineTo(canvas_x(scene_maxx3),canvas_y(i));
                ctx3.stroke();
            }
            ctx3.lineWidth = 1.0;
            ctx3.beginPath();
            ctx3.arc(canvas_graphx,canvas_graphy,4.5,2*Math.PI,false);
            ctx3.fillStyle = "blue";
            ctx3.fill();
            // draw coord axes
            ctx3.strokeStyle = "black";
            ctx3.beginPath();
            ctx3.moveTo(canvas_xaxis_minx3,canvas_xaxis_zeroy3);
            ctx3.lineTo(canvas_xaxis_maxx3,canvas_xaxis_zeroy3);
            ctx3.stroke();
            ctx3.beginPath();
            ctx3.moveTo(canvas_yaxis_zerox3,canvas_yaxis_miny3);
            ctx3.lineTo(canvas_yaxis_zerox3,canvas_yaxis_maxy3);
            ctx3.stroke();
            // draw graph of function
            ctx3.strokeStyle = "blue";
            ctx3.beginPath();
			ctx3.lineWidth = 2.0;
            ctx3.moveTo(graph_coords3[0].x,graph_coords3[0].y);
            for (i=0; i<n; i++) {
                ctx3.lineTo(graph_coords3[i].x,graph_coords3[i].y);
            }
            ctx3.stroke();
			ctx3.lineWidth = 1.0;
            // draw tangent line
            ctx3.fillStyle = "black";
            ctx3.font = f;
			ctx3.fillText("x",canvas_maxx3-30.0,canvas_xaxis_zeroy3-13);
            ctx3.fillText("y",canvas_yaxis_zerox3-20.0,canvas_miny3+30.0);
            if (isNaN(scene_graphy)){
				ctx3.fillText("Hole: x = " + scene_graphx.toFixed(4),560,750);
			}
			else{
				ctx3.fillText("(" + scene_graphx.toFixed(4) + ", " + scene_graphy.toFixed(4) + ")",560,750);
			}
        }

        function doMouseMove3(event) {
            var canvas3 = document.getElementById("myCanvas3");
            canvasx = event.offsetX * 2;
            canvasy = event.offsetY;
            scene_graphx = scene_x(canvasx);
            scene_graphy = graph_function3(scene_graphx);
            canvas_graphx = canvas_x(scene_graphx);
            canvas_graphy = canvas_y(scene_graphy);
            draw_stuff3();
          }