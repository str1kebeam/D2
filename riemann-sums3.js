var canvas_minx3 = 0;
            var canvas_maxx3 = 800;
            var canvas_miny3 = 0;
            var canvas_maxy3 = 800;
            var scene_size = 20.0
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
            var slope = 0;            
            var graph_coords3 = [];
            var n = 3000;
            var num_rectangles = 4;
            var dx3 = 0;
            var scale = 1;
            var moving_bound_13 = false;
            var moving_bound_23 = false;
            var bound_left3 = 0;
            var bound_right3 = 4;
        function canvas_x3(x) {
            var u = (x - scene_minx3)/(scene_maxx3 - scene_minx3);
            return canvas_minx3 + u*(canvas_maxx3 - canvas_minx3);
        }
        
        function canvas_y3(y) {
            var v = (y - scene_miny3)/(scene_maxy3 - scene_miny3);
            return canvas_miny3 + (1.0 - v)*(canvas_maxy3 - canvas_miny3);
        }
        
        function scene_x3(x) {
            var u = (x - canvas_minx3)/(canvas_maxx3 - canvas_minx3);
            return scene_minx3 + u*(scene_maxx3 - scene_minx3);
        }

        function n_x3(x) {
            return n * x/(2 * scene_size) + n/2;
        }
        
        function point(x, y) {
            this.x = x;
            this.y = y;
        }
        
        function graph_function3(x) {
            return Math.pow(x,2);
        }

        function init3() {
            var canvas3 = document.getElementById("myCanvas3");
            var i = 0;
            var x = 0;
            var y = 0;
            // set up and compute graph of curve
            canvas3.addEventListener("mousedown",doMouseDown3,false);
            canvas3.addEventListener("mouseup",doMouseUp3,false);
            canvas3.addEventListener("mousemove",doMouseMove3,false);
            dx3 = (scene_maxx3 - scene_minx3)/n;
            x = scene_minx3;
            for (i=0; i<n; i++) {
                y = graph_function3(x);
                graph_coords3.push(new point(canvas_x3(x),canvas_y3(y)));
                x = x + dx3;
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
            canvas_graphx = canvas_x3(scene_graphx);
            canvas_graphy = canvas_y3(scene_graphy);
            draw_stuff3();
        } 
        function draw_stuff3() {
            var t13 = Math.floor(n_x3(bound_left3));
            var t23 = Math.floor(n_x3(bound_right3));
            var i=0;
            var offsetx = 0;
            var offsety = 0;
            var area3 = 0.0
            var f = "26px Trebuchet MS";
            var interval_length3 = Math.abs(canvas_x3(bound_right3) - canvas_x3(bound_left3))/num_rectangles;
            var canvas3 = document.getElementById("myCanvas3");
            var ctx3 = canvas3.getContext("2d");
            ctx3.clearRect(canvas_minx3,canvas_miny3, canvas_maxx3-canvas_minx3, canvas_maxy3-canvas_miny3);
            ctx3.fillStyle = "white";
            ctx3.fillRect(canvas_minx3,canvas_miny3, canvas_maxx3-canvas_minx3, canvas_maxy3-canvas_miny3);
            // draw tangent marker
            ctx3.lineWidth = 0.375;
            ctx3.strokeStyle = "rgb(0,0,0,0.5)";
            for (var i = Math.floor(scene_minx3); i < Math.floor(scene_maxx3); i += scale){
                ctx3.beginPath();
                ctx3.moveTo(canvas_x3(i),canvas_y3(scene_miny3));
                ctx3.lineTo(canvas_x3(i),canvas_y3(scene_maxy3));
                ctx3.stroke();
            }
            for (var i = Math.floor(scene_miny3); i < Math.floor(scene_maxy3); i += scale){
                ctx3.beginPath();
                ctx3.moveTo(canvas_x3(scene_minx3),canvas_y3(i));
                ctx3.lineTo(canvas_x3(scene_maxx3),canvas_y3(i));
                ctx3.stroke();
            }
            ctx3.beginPath();
            ctx3.arc(canvas_x3(bound_left3),canvas_y3(graph_function3(bound_left3)),6.0,2*Math.PI,false);
            ctx3.fillStyle = "blue";
            ctx3.fill();
            ctx3.beginPath();
            ctx3.arc(canvas_x3(bound_right3),canvas_y3(graph_function3(bound_right3)),6.0,2*Math.PI,false);
            ctx3.fillStyle = "blue";
            ctx3.fill();
            // draw coord axes
            ctx3.strokeStyle = "black";
            ctx3.lineWidth = 1.0;
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
            ctx3.lineWidth = 2.0;
            ctx3.beginPath();
            ctx3.moveTo(graph_coords3[0].x,graph_coords3[0].y);
            for (i=0; i<n; i++) {
                ctx3.lineTo(graph_coords3[i].x,graph_coords3[i].y);
            }
            ctx3.stroke();
            var orientation3 = "right";
            ctx3.fillStyle = "rgb(0,0,255,0.5)";
            if (orientation3 === "left"){
              for (var j = canvas_x3(bound_left3); j <= canvas_x3(bound_right3) - interval_length3 + 0.01; j += interval_length3){
                ctx3.fillRect(j,canvas_y3(0.0),interval_length3,canvas_y3(graph_function3(scene_x3(j)))-canvas_y3(0.0));
                area3 += (bound_right3 - bound_left3)/num_rectangles * graph_function3(scene_x3(j));
              }
              for (var j = canvas_x3(bound_right3); j <= canvas_x3(bound_left3) - interval_length3 + 0.01; j += interval_length3){
                ctx3.fillRect(j,canvas_y3(0.0),interval_length3,canvas_y3(graph_function3(scene_x3(j)))-canvas_y3(0.0));
                area3 += (bound_right3 - bound_left3)/num_rectangles * graph_function3(scene_x3(j));
              }
            }
            else if (orientation3 === "right"){
              for (var j = canvas_x3(bound_left3); j <= canvas_x3(bound_right3)  - interval_length3 + 0.01; j += interval_length3){
                ctx3.fillRect(j,canvas_y3(0.0),interval_length3,canvas_y3(graph_function3(scene_x3(j+interval_length3)))-canvas_y3(0.0));
                area3 += (bound_right3 - bound_left3)/num_rectangles * graph_function3(scene_x3(j+interval_length3));
              }
              for (var j = canvas_x3(bound_right3); j <= canvas_x3(bound_left3) - interval_length3 + 0.01; j += interval_length3){
                ctx3.fillRect(j,canvas_y3(0.0),interval_length3,canvas_y3(graph_function3(scene_x3(j+interval_length3)))-canvas_y3(0.0));
                area3 += (bound_right3 - bound_left3)/num_rectangles * graph_function3(scene_x3(j+interval_length3));
              }
            }
            else if (orientation3 === "midpoint"){
              for (var j = canvas_x3(bound_left3); j <= canvas_x3(bound_right3)  - interval_length3 + 0.01; j += interval_length3){
                ctx3.fillRect(j,canvas_y3(0.0),interval_length3,canvas_y3(graph_function3(scene_x3(j+interval_length3/2.0)))-canvas_y3(0.0));
                area3 += (bound_right3 - bound_left3)/num_rectangles * graph_function3(scene_x3(j+interval_length3/2.0));
              }
              for (var j = canvas_x3(bound_right3); j <= canvas_x3(bound_left3) - interval_length3 + 0.01; j += interval_length3){
                ctx3.fillRect(j,canvas_y3(0.0),interval_length3,canvas_y3(graph_function3(scene_x3(j+interval_length3/2.0)))-canvas_y3(0.0));
                area3 += (bound_right3 - bound_left3)/num_rectangles * graph_function3(scene_x3(j+interval_length3/2.0));
              }
            }
            
            // draw y tick mark and y value
            // draw "x" and "y" labels on axes
            ctx3.font = f;
            ctx3.fillStyle = "black";
            ctx3.fillText("x",canvas_maxx3-30.0,canvas_xaxis_zeroy3-13);
            ctx3.fillText("y",canvas_yaxis_zerox3-20.0,canvas_miny3+30.0);
            ctx3.fillText("(" + bound_left3.toFixed(4) + ", " + graph_function3(bound_left3).toFixed(4) + ")",560,705);
            ctx3.fillText("(" + bound_right3.toFixed(4) + ", " + graph_function3(bound_right3).toFixed(4) + ")",560,755);
            ctx3.fillText("Approximate Integral = " + area3.toFixed(4),10,755);
        }

        function doMouseMove3(event) {
            var canvas3 = document.getElementById("myCanvas3");
            canvasx = event.offsetX * 2;
            canvasy = event.offsetY * 2;
            if (moving_bound_13) {
              bound_left3 = scene_x3(canvasx);
            }
            else if (moving_bound_23) {
              bound_right3 = scene_x3(canvasx);
            }
            draw_stuff3();
          }
        function doMouseDown3(event) {
            var canvas3 = document.getElementById("myCanvas3");
            canvasx = event.offsetX * 2;
            canvasy = event.offsetY * 2;
            scene_graphx = scene_x3(canvasx);
            scene_graphy = graph_function3(scene_graphx);
            var y_left3 = canvas_y3(graph_function3(bound_left3));
            var y_right3 = canvas_y3(graph_function3(bound_right3));
            if (Math.abs(y_left3 - canvasy) < 50.0) {
                moving_bound_13 = true;  
            }
            else if (Math.abs(y_right3 - canvasy) < 50.0) {
                moving_bound_23 = true; 
            }
            draw_stuff3();
        }
          
        function doMouseUp3(event) {
             moving_bound_13 = false;
             moving_bound_23 = false;
        }