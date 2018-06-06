var canvas_minx4 = 0;
            var canvas_maxx4 = 800;
            var canvas_miny4 = 0;
            var canvas_maxy4 = 800;
            var scene_size = 20.0;
            var scene_minx4 = -1 * scene_size;
            var scene_maxx4 = scene_size;
            var scene_miny4 = -1 * scene_size;
            var scene_maxy4 = scene_size;
            var canvas_graphx = 0;
            var canvas_graphy = 0;
            var canvas_xaxis_minx4 = 0;
            var canvas_xaxis_maxx4 = 0;
            var canvas_xaxis_zeroy4 = 0;
            var canvas_yaxis_miny4 = 0;
            var canvas_yaxis_maxy4 = 0;
            var canvas_yaxis_zerox4 = 0;
            var scale4 = 2;           
            var graph_coords4 = [];
            var n = 3000;
            var dx4 = 0;
            var moving_bound_14 = false;
            var moving_bound_24 = false;
            var bound_left4 = 0;
            var bound_right4 = 4;
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
        
        function n_x4(x) {
            return n * x/(2 * scene_size) + n/2;
        }
        
        function point(x, y) {
            this.x = x;
            this.y = y;
        }
        
        function graph_function4(x) {
			return Math.pow(x,2);
        }
        
        function graph_function_integral4(x) {
            return Math.pow(x,3)/3.0;
        }
        function init4() {
            var canvas4 = document.getElementById("myCanvas4");
            var i = 0;
            var x = 0;
            var y = 0;
            // set up and compute graph of curve
            canvas4.addEventListener("mousedown",doMouseDown4,false);
            canvas4.addEventListener("mouseup",doMouseUp4,false);
            canvas4.addEventListener("mousemove",doMouseMove4,false);
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
            scene_graphx = 0.5;
            scene_graphy = graph_function4(scene_graphx);
            canvas_graphx = canvas_x4(scene_graphx);
            canvas_graphy = canvas_y4(scene_graphy);
            draw_stuff4();
        } 
        function draw_stuff4() {
            var t14 = Math.floor(n_x4(bound_left4));
            var t24 = Math.floor(n_x4(bound_right4));
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
            for (var i = Math.floor(scene_minx4); i < Math.floor(scene_maxx4); i += scale4){
                ctx4.beginPath();
                ctx4.moveTo(canvas_x4(i),canvas_y4(scene_miny4));
                ctx4.lineTo(canvas_x4(i),canvas_y4(scene_maxy4));
                ctx4.stroke();
            }
            for (var i = Math.floor(scene_miny4); i < Math.floor(scene_maxy4); i += scale4){
                ctx4.beginPath();
                ctx4.moveTo(canvas_x4(scene_minx4),canvas_y4(i));
                ctx4.lineTo(canvas_x4(scene_maxx4),canvas_y4(i));
                ctx4.stroke();
            }
            ctx4.beginPath();
            ctx4.arc(canvas_x4(bound_left4),canvas_y4(graph_function4(bound_left4)),6.0,2*Math.PI,false);
            ctx4.fillStyle = "blue";
            ctx4.fill();
            ctx4.beginPath();
            ctx4.arc(canvas_x4(bound_right4),canvas_y4(graph_function4(bound_right4)),6.0,2*Math.PI,false);
            ctx4.fillStyle = "blue";
            ctx4.fill();
            // draw coord axes
            ctx4.lineWidth = 1.0;
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
            ctx4.lineWidth = 2.5;
            ctx4.beginPath();
            ctx4.moveTo(graph_coords4[0].x,graph_coords4[0].y);
            for (i=0; i<n; i++) {
                ctx4.lineTo(graph_coords4[i].x,graph_coords4[i].y);
            }
            ctx4.stroke();
            ctx4.strokeStyle = "rgb(0,0,255,0.05)";
            for (i=t14; i<t24; i++) {
                ctx4.beginPath();
                ctx4.moveTo(graph_coords4[i].x,canvas_y4(0.0));
                ctx4.lineTo(graph_coords4[i].x,graph_coords4[i].y);
                ctx4.stroke();
            }
            for (i=t24; i<t14; i++) {
                ctx4.beginPath();
                ctx4.moveTo(graph_coords4[i].x,canvas_y4(0.0));
                ctx4.lineTo(graph_coords4[i].x,graph_coords4[i].y);
                ctx4.stroke();
            }
            // draw y tick mark and y value
            // draw "x" and "y" labels on axes
            ctx4.font = f;
            ctx4.fillStyle = "black";
            ctx4.fillText("x",canvas_maxx4-30.0,canvas_xaxis_zeroy4-13);
            ctx4.fillText("y",canvas_yaxis_zerox4-20.0,canvas_miny4+30.0);
            ctx4.fillText("(" + bound_left4.toFixed(4) + ", " + graph_function4(bound_left4).toFixed(4) + ")",560,705);
            ctx4.fillText("(" + bound_right4.toFixed(4) + ", " + graph_function4(bound_right4).toFixed(4) + ")",560,755);
            ctx4.fillText("Area = " + (graph_function_integral4(bound_right4) - graph_function_integral4(bound_left4)).toFixed(4),50,750);
        }

        function doMouseMove4(event) {
            var canvas4 = document.getElementById("myCanvas4");
            canvasx = event.offsetX * 2;
            canvasy = event.offsetY * 2;
            if (moving_bound_14) {
              bound_left4 = scene_x4(canvasx);
            }
            else if (moving_bound_24) {
              bound_right4 = scene_x4(canvasx);
            }
            draw_stuff4();
          }
        function doMouseDown4(event) {
            var canvas4 = document.getElementById("myCanvas4");
            canvasx = event.offsetX * 2;
            canvasy = event.offsetY * 2;
            scene_graphx = scene_x4(canvasx);
            scene_graphy = graph_function4(scene_graphx);
            var y_left4 = canvas_y4(graph_function4(bound_left4));
            var y_right4 = canvas_y4(graph_function4(bound_right4));
            if (Math.abs(y_left4 - canvasy) < 50.0) {
                moving_bound_14 = true;  
            }
            else if (Math.abs(y_right4 - canvasy) < 50.0) {
                moving_bound_24 = true; 
            }
            draw_stuff4();
        }
          
        function doMouseUp4(event) {
             moving_bound_14 = false;
             moving_bound_24 = false;
        }