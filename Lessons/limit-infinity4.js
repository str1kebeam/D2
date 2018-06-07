var canvas_minx4 = 0;
            var canvas_maxx4 = 800;
            var canvas_miny4 = 0;
            var canvas_maxy4 = 800;
            var scene_size = 10.0;
            var scene_minx4 = -1 * scene_size;
            var scene_maxx4 = scene_size;
            var scene_miny4 = -1 * scene_size;
            var scene_maxy4 = scene_size;
            var canvas_graphx4 = 0;
            var canvas_graphy4 = 0;
            var canvas_xaxis_minx4 = 0;
            var canvas_xaxis_maxx4 = 0;
            var canvas_xaxis_zeroy4 = 0;
            var canvas_yaxis_miny4 = 0;
            var canvas_yaxis_maxy4 = 0;
            var canvas_yaxis_zerox4 = 0;
            var slope = 0;
            var graph_coords4 = [];
            var n = 3000;
            var dx4 = 0; // set value w.r.t. n in init4()

        function canvas_x4(x) {
            var u = (x - scene_minx4)/(scene_maxx4 - scene_minx4);
            return canvas_minx4 + u*(canvas_maxx4 - canvas_minx4);
        }

        function canvas_y4(y) {
            var v = (y - scene_miny4)/(scene_maxy4 - scene_miny4);
            return canvas_miny4 + (1.0 - v)*(canvas_maxy4 - canvas_miny4);
        }

        function scene_x4(x) {
            var u = (x - canvas_minx4)/(canvas_maxx4 - canvas_minx4);
            return scene_minx4 + u*(scene_maxx4 - scene_minx4);
        }

        function point(x, y) {
            this.x = x;
            this.y = y;
        }

        function graph_function4(x) {
			return (3 * Math.pow(x,2))/(x+1);
			
        }
        
        function init4() {
            var canvas4 = document.getElementById("myCanvas4");
            var i = 0;
            var x = 0;
            var y = 0;
            canvas4.addEventListener("mousemove", doMouseMove4, false);
            // set up and compute graph of curve
            dx4 = (scene_maxx4 - scene_minx4)/n;
            x = scene_minx4;
            for (i=0; i<n; i++) {
                y = graph_function4(x);
                graph_coords4.push(new point(canvas_x4(x),canvas_y4(y)));
                x = x + dx4;
            }
            // set up coord axes
            canvas_xaxis_minx4 = canvas_x4(scene_minx4);
            canvas_xaxis_maxx4 = canvas_x4(scene_maxx4);
            canvas_xaxis_zeroy4 = canvas_y4(0.0);
            canvas_yaxis_miny4 = canvas_y4(scene_miny4);
            canvas_yaxis_maxy4 = canvas_y4(scene_maxy4);
            canvas_yaxis_zerox4 = canvas_x4(0.0);
            // initial tangent point location
            scene_graphx4 = 0.5;
            scene_graphy4 = graph_function4(scene_graphx4);
            canvas_graphx4 = canvas_x4(scene_graphx4);
            canvas_graphy4 = canvas_y4(scene_graphy4);
            // initial tangent line
            draw_stuff4();
        }
        function draw_stuff4() {
            var i=0;
            var offsetx = 0;
            var offsety = 0;
            var f = "26px Trebuchet MS";
            var canvas4 = document.getElementById("myCanvas4");
            var ctx4 = canvas4.getContext("2d");
            ctx4.clearRect(canvas_minx4,canvas_miny4, canvas_maxx4-canvas_minx4, canvas_maxy4-canvas_miny4);
            ctx4.fillStyle = "white";
            ctx4.fillRect(canvas_minx4,canvas_miny4, canvas_maxx4-canvas_minx4, canvas_maxy4-canvas_miny4);
            // draw tangent marker
            ctx4.lineWidth = 0.375;
            ctx4.strokeStyle = "rgb(0,0,0,0.5)";
            for (var i = Math.floor(scene_minx4) + 1; i < Math.floor(scene_maxx4); i += 1){
                ctx4.beginPath();
                ctx4.moveTo(canvas_x4(i),canvas_y4(scene_miny4));
                ctx4.lineTo(canvas_x4(i),canvas_y4(scene_maxy4));
                ctx4.stroke();
			}
			for (var i = Math.floor(scene_miny4) + 1; i < Math.floor(scene_maxy4); i += 1){
                ctx4.beginPath();
                ctx4.moveTo(canvas_x4(scene_minx4),canvas_y4(i));
                ctx4.lineTo(canvas_x4(scene_maxx4),canvas_y4(i));
                ctx4.stroke();
            }
            ctx4.lineWidth = 1.0;
            ctx4.beginPath();
            ctx4.arc(canvas_graphx4,canvas_graphy4,4.5,2*Math.PI,false);
            ctx4.fillStyle = "blue";
            ctx4.fill();
            // draw coord axes
            ctx4.strokeStyle = "black";
            ctx4.beginPath();
            ctx4.moveTo(canvas_xaxis_minx4,canvas_xaxis_zeroy4);
            ctx4.lineTo(canvas_xaxis_maxx4,canvas_xaxis_zeroy4);
            ctx4.stroke();
            ctx4.beginPath();
            ctx4.moveTo(canvas_yaxis_zerox4,canvas_yaxis_miny4);
            ctx4.lineTo(canvas_yaxis_zerox4,canvas_yaxis_maxy4);
            ctx4.stroke();
            // draw graph of function
            ctx4.strokeStyle = "blue";
			ctx4.lineWidth = 2.0;
            ctx4.beginPath();
            ctx4.moveTo(graph_coords4[0].x,graph_coords4[0].y);
            while (i < n){
				ctx4.lineTo(graph_coords4[i].x,graph_coords4[i].y);
				i += 1
			if (i < 1355 && i > 1345){
				ctx4.stroke();
				i = 1355;
				ctx4.beginPath();
			}
			}
            ctx4.stroke();
            // draw tangent line
            ctx4.strokeStyle = "blue";
            ctx4.font = f;
			ctx4.fillStyle = "black";
			ctx4.fillText("x",canvas_maxx-30.0,canvas_xaxis_zeroy-13);
            ctx4.fillText("y",canvas_yaxis_zerox-20.0,canvas_miny+30.0);
            ctx4.fillText("(" + scene_graphx4.toFixed(4) + ", " + scene_graphy4.toFixed(4) + ")",560,750);
        }

        function doMouseMove4(event) {
            var canvas4 = document.getElementById("myCanvas4");
            canvasx = event.offsetX * 2;
            canvasy = event.offsetY;
            scene_graphx4 = scene_x4(canvasx);
            scene_graphy4 = graph_function4(scene_graphx4);
            canvas_graphx4 = canvas_x4(scene_graphx4);
            canvas_graphy4 = canvas_y4(scene_graphy4);
            draw_stuff4();
          }
