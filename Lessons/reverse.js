var canvas_minx = 0;
            var canvas_maxx = 800;
            var canvas_miny = 0;
            var canvas_maxy = 800;
            var scene_size = 10.0
            var scene_minx = -1 * scene_size;
            var scene_maxx = scene_size;
            var scene_miny = -1 * scene_size;
            var scene_maxy = scene_size;
            var canvas_graphx = 0;
            var canvas_graphy = 0;
            var canvas_xaxis_minx = 0;
            var canvas_xaxis_maxx = 0;
            var canvas_xaxis_zeroy = 0;
            var canvas_yaxis_miny = 0;
            var canvas_yaxis_maxy = 0;
            var canvas_yaxis_zerox = 0;
            var canvas_tanline_x1 = 0;
            var canvas_tanline_y1 = 0;
            var canvas_tanline_x2 = 0;
            var canvas_tanline_y2 = 0;
            var slope = 0; 
            var scale = 1;           
            var graph_coords = [];
            var n = 3000;
            var dx = 0;
            var moving_bound_1 = false;
            var moving_bound_2 = false;
            var bound_left = 0;
            var bound_right = 1;
        function canvas_x(x) {
            var u = (x - scene_minx)/(scene_maxx - scene_minx);
            return canvas_minx + u*(canvas_maxx - canvas_minx);
        }
        
        function canvas_y(y) {
            var v = (y - scene_miny)/(scene_maxy - scene_miny);
            return canvas_miny + (1.0 - v)*(canvas_maxy - canvas_miny);
        }
        
        function scene_x(x) {
            var u = (x - canvas_minx)/(canvas_maxx - canvas_minx);
            return scene_minx + u*(scene_maxx - scene_minx);
        }
        
        function n_x(x) {
            return n * x/(2 * scene_size) + n/2;
        }
        
        function point(x, y) {
            this.x = x;
            this.y = y;
        }
        
        function graph_function(x) {
			      return 3 * Math.pow(x,2);
        }
        
        function graph_function_integral(x) {
            return Math.pow(x,3);
        }
        function init() {
            var canvas = document.getElementById("myCanvas");
            var i = 0;
            var x = 0;
            var y = 0;
            // set up and compute graph of curve
            canvas.addEventListener("mousedown",doMouseDown,false);
            canvas.addEventListener("mouseup",doMouseUp,false);
            canvas.addEventListener("mousemove",doMouseMove,false);
            dx = (scene_maxx - scene_minx)/n;
            x = scene_minx;
            for (i=0; i<n; i++) {
                y = graph_function(x);
                graph_coords.push(new point(canvas_x(x),canvas_y(y)));
                x = x + dx;
            }
            // set up coord axes
            canvas_xaxis_minx = canvas_x(scene_minx);
            canvas_xaxis_maxx = canvas_x(scene_maxx);
            canvas_xaxis_zeroy = canvas_y(0.0);
            canvas_yaxis_miny = canvas_y(scene_miny);
            canvas_yaxis_maxy = canvas_y(scene_maxy);
            canvas_yaxis_zerox = canvas_x(0.0);
            // initial tangent point location
            scene_graphx = 0.5;
            scene_graphy = graph_function(scene_graphx);
            canvas_graphx = canvas_x(scene_graphx);
            canvas_graphy = canvas_y(scene_graphy);
            draw_stuff();
        } 
        function draw_stuff() {
            var t1 = Math.floor(n_x(bound_left));
            var t2 = Math.floor(n_x(bound_right));
            var i=0;
            var offsetx = 0;
            var offsety = 0;
            var f = "26px Trebuchet MS";
            var canvas = document.getElementById("myCanvas");
            var ctx = canvas.getContext("2d");
            ctx.clearRect(canvas_minx,canvas_miny, canvas_maxx-canvas_minx, canvas_maxy-canvas_miny);
            ctx.fillStyle = "white";
            ctx.fillRect(canvas_minx,canvas_miny, canvas_maxx-canvas_minx, canvas_maxy-canvas_miny);
            // draw tangent marker
            ctx.lineWidth = 0.375;
            ctx.strokeStyle = "rgb(0,0,0,0.5)";
            for (var i = Math.floor(scene_minx); i < Math.floor(scene_maxx); i += scale){
                ctx.beginPath();
                ctx.moveTo(canvas_x(i),canvas_y(scene_miny));
                ctx.lineTo(canvas_x(i),canvas_y(scene_maxy));
                ctx.stroke();
            }
            for (var i = Math.floor(scene_miny); i < Math.floor(scene_maxy); i += scale){
                ctx.beginPath();
                ctx.moveTo(canvas_x(scene_minx),canvas_y(i));
                ctx.lineTo(canvas_x(scene_maxx),canvas_y(i));
                ctx.stroke();
            }
            ctx.beginPath();
            ctx.arc(canvas_x(bound_left),canvas_y(graph_function(bound_left)),6.0,2*Math.PI,false);
            ctx.fillStyle = "blue";
            ctx.fill();
            ctx.beginPath();
            ctx.arc(canvas_x(bound_right),canvas_y(graph_function(bound_right)),6.0,2*Math.PI,false);
            ctx.fillStyle = "blue";
            ctx.fill();
            // draw coord axes
            ctx.lineWidth = 1.0;
            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.moveTo(canvas_xaxis_minx,canvas_xaxis_zeroy);
            ctx.lineTo(canvas_xaxis_maxx,canvas_xaxis_zeroy);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(canvas_yaxis_zerox,canvas_yaxis_miny);
            ctx.lineTo(canvas_yaxis_zerox,canvas_yaxis_maxy);
            ctx.stroke();
            // draw graph of function
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(graph_coords[0].x,graph_coords[0].y);
            for (i=0; i<n; i++) {
                ctx.lineTo(graph_coords[i].x,graph_coords[i].y);
            }
            ctx.stroke();
            ctx.strokeStyle = "rgb(0,0,255,0.05)";
            for (i=t1; i<t2; i++) {
                ctx.beginPath();
                ctx.moveTo(graph_coords[i].x,canvas_y(0.0));
                ctx.lineTo(graph_coords[i].x,graph_coords[i].y);
                ctx.stroke();
            }
            for (i=t2; i<t1; i++) {
                ctx.beginPath();
                ctx.moveTo(graph_coords[i].x,canvas_y(0.0));
                ctx.lineTo(graph_coords[i].x,graph_coords[i].y);
                ctx.stroke();
            }
            // draw y tick mark and y value
            // draw "x" and "y" labels on axes
            ctx.font = f;
            ctx.fillStyle = "black";
            ctx.fillText("x",canvas_maxx-30.0,canvas_xaxis_zeroy-13);
            ctx.fillText("y",canvas_yaxis_zerox-20.0,canvas_miny+30.0);
            ctx.fillText("(" + bound_left.toFixed(4) + ", " + graph_function(bound_left).toFixed(4) + ")",560,705);
            ctx.fillText("(" + bound_right.toFixed(4) + ", " + graph_function(bound_right).toFixed(4) + ")",560,755);
            ctx.fillText("Area = " + (graph_function_integral(bound_right) - graph_function_integral(bound_left)).toFixed(4),50,750);
        }

        function doMouseMove(event) {
            var canvas = document.getElementById("myCanvas");
            canvasx = event.offsetX * 2;
            canvasy = event.offsetY * 2;
            if (moving_bound_1) {
              bound_left = scene_x(canvasx);
            }
            if (moving_bound_2) {
              bound_right = scene_x(canvasx);
            }
            draw_stuff();
          }
        function doMouseDown(event) {
            var canvas = document.getElementById("myCanvas");
            canvasx = event.offsetX * 2;
            canvasy = event.offsetY * 2;
            scene_graphx = scene_x(canvasx);
            scene_graphy = graph_function(scene_graphx);
            var y_left = canvas_y(graph_function(bound_left));
            var y_right = canvas_y(graph_function(bound_right));
            if (Math.abs(y_left - canvasy) < 50.0) {
                moving_bound_1 = true;  
            }
            else if (Math.abs(y_right - canvasy) < 50.0) {
                moving_bound_2 = true; 
            }
            draw_stuff();
        }
          
        function doMouseUp(event) {
             moving_bound_1 = false;
             moving_bound_2 = false;
        }