 var canvas_minx7 = 0;
            var canvas_maxx7 = 800;
            var canvas_miny7 = 0;
            var canvas_maxy7 = 800;
            var scene_size = 10.0;
            var scene_minx7 = -1 * scene_size;
            var scene_maxx7 = scene_size;
            var scene_miny7 = -1 * scene_size;
            var scene_maxy7 = scene_size;
            var canvas_graphx = 0;
            var canvas_graphy = 0;
            var canvas_xaxis_minx7 = 0;
            var canvas_xaxis_maxx7 = 0;
            var canvas_xaxis_zeroy7 = 0;
            var canvas_yaxis_miny7 = 0;
            var canvas_yaxis_maxy7 = 0;
            var canvas_yaxis_zerox7 = 0;
            var canvas_tanline_x17 = 0;
            var canvas_tanline_y17 = 0;
            var canvas_tanline_x27 = 0;
            var canvas_tanline_y27 = 0;
            var slope7 = 0;
            var scale = 1;
            var graph_coords7 = [];
            var n = 3000;
            var dx7 = 0; // set value w.r.t. n in init()

        function canvas_x7(x) {
            var u = (x - scene_minx7)/(scene_maxx7 - scene_minx7);
            return canvas_minx7 + u*(canvas_maxx7 - canvas_minx7);
        }

        function canvas_y7(y) {
            var v = (y - scene_miny7)/(scene_maxy7 - scene_miny7);
            return canvas_miny7 + (1.0 - v)*(canvas_maxy7 - canvas_miny7);
        }

        function scene_x7(x) {
            var u = (x - canvas_minx7)/(canvas_maxx7 - canvas_minx7);
            return scene_minx7 + u*(scene_maxx7 - scene_minx7);
        }

        function point(x, y) {
            this.x = x;
            this.y = y;
        }

        function graph_function7(x) {
            return Math.pow(x,3) + 3 * x;
        }

        function graph_function_derivative7(x) {
            return 3 * Math.pow(x,2) + 3;
        }

        function build_tangent_line7() {
            slope7 = graph_function_derivative7(scene_graphx);
            var L = 40000;
            // the stretch value here only works if canvas is a square
            var s = (scene_maxy7 - scene_miny7)/(scene_maxx7-scene_minx7);
            var delta_x7 = L/Math.sqrt(1.0 + slope7*slope7/(s*s));
            var scene_tanline_x17 = scene_graphx - delta_x7;
            var scene_tanline_x27 = scene_graphx + delta_x7;
            var scene_tanline_y17 = scene_graphy + slope7*(scene_tanline_x17 - scene_graphx);
            var scene_tanline_y27 = scene_graphy + slope7*(scene_tanline_x27 - scene_graphx);
            canvas_tanline_x17 = canvas_x7(scene_tanline_x17);
            canvas_tanline_x27 = canvas_x7(scene_tanline_x27);
            canvas_tanline_y17 = canvas_y7(scene_tanline_y17);
            canvas_tanline_y27 = canvas_y7(scene_tanline_y27);

       }
        function init7() {
            var canvas7 = document.getElementById("myCanvas7");
            var i = 0;
            var x = 0;
            var y = 0;
            canvas7.addEventListener("mousemove", doMouseMove7, false);
            // set up and compute graph of curve
            dx7 = (scene_maxx7 - scene_minx7)/n;
            x = scene_minx7;
            for (i=0; i<n; i++) {
                y = graph_function7(x);
                graph_coords7.push(new point(canvas_x7(x),canvas_y7(y)));
                x = x + dx7;
            }
            // set up coord axes
            canvas_xaxis_minx7 = canvas_x7(scene_minx7);
            canvas_xaxis_maxx7 = canvas_x7(scene_maxx7);
            canvas_xaxis_zeroy7 = canvas_y7(0.0);
            canvas_yaxis_miny7 = canvas_y7(scene_miny7);
            canvas_yaxis_maxy7 = canvas_y7(scene_maxy7);
            canvas_yaxis_zerox7 = canvas_x7(0.0);
            // initial tangent point location
            scene_graphx = 0.5;
            scene_graphy = graph_function7(scene_graphx);
            canvas_graphx = canvas_x7(scene_graphx);
            canvas_graphy = canvas_y7(scene_graphy);
            // initial tangent line
            build_tangent_line7();
            draw_stuff7();
        }
        function draw_stuff7() {
            var i=0;
            var f = "26px Trebuchet MS";
            var canvas7 = document.getElementById("myCanvas7");
            var ctx7 = canvas7.getContext("2d");
            ctx7.clearRect(canvas_minx7,canvas_miny7, canvas_maxx7-canvas_minx7, canvas_maxy7-canvas_miny7);
            ctx7.fillStyle = "white";
            ctx7.fillRect(canvas_minx7,canvas_miny7, canvas_maxx7-canvas_minx7, canvas_maxy7-canvas_miny7);
            // draw tangent marker
            ctx7.lineWidth = 0.375;
            ctx7.strokeStyle = "rgb(0,0,0,0.5)";
            for (var i = Math.floor(scene_minx7) + 1; i < Math.floor(scene_maxx7); i += scale){
                ctx7.beginPath();
                ctx7.moveTo(canvas_x7(i),canvas_y7(scene_miny7));
                ctx7.lineTo(canvas_x7(i),canvas_y7(scene_maxy7));
                ctx7.stroke();
            }
            for (var i = Math.floor(scene_miny7) + 1; i < Math.floor(scene_maxy7); i += scale){
                ctx7.beginPath();
                ctx7.moveTo(canvas_x7(scene_minx7),canvas_y7(i));
                ctx7.lineTo(canvas_x7(scene_maxx7),canvas_y7(i));
                ctx7.stroke();
            }
            ctx7.beginPath();
            ctx7.arc(canvas_graphx,canvas_graphy,4.5,2*Math.PI,false);
            ctx7.fillStyle = "blue";
            ctx7.fill();
            // draw coord axes
            ctx7.strokeStyle = "black";
            ctx7.lineWidth = 1.0;
            ctx7.beginPath();
            ctx7.moveTo(canvas_xaxis_minx7,canvas_xaxis_zeroy7);
            ctx7.lineTo(canvas_xaxis_maxx7,canvas_xaxis_zeroy7);
            ctx7.stroke();
            ctx7.beginPath();
            ctx7.moveTo(canvas_yaxis_zerox7,canvas_yaxis_miny7);
            ctx7.lineTo(canvas_yaxis_zerox7,canvas_yaxis_maxy7);
            ctx7.stroke();
            // draw graph of function
            ctx7.strokeStyle = "blue";
            ctx7.lineWidth = 2.0;
            ctx7.beginPath();
            ctx7.moveTo(graph_coords7[0].x,graph_coords7[0].y);
            for (i=0; i<n; i++) {
                ctx7.lineTo(graph_coords7[i].x,graph_coords7[i].y);
            }
            ctx7.stroke();
            // draw tangent line
            ctx7.strokeStyle = "blue";
            ctx7.beginPath();
            ctx7.moveTo(canvas_tanline_x17,canvas_tanline_y17);
            ctx7.lineTo(canvas_tanline_x27,canvas_tanline_y27);
            ctx7.stroke();
            offsety = 20.0;
            ctx7.font = f;
            ctx7.fillStyle = "black";
            ctx7.fillText("x",canvas_maxx7-30.0,canvas_xaxis_zeroy7-13);
            ctx7.fillText("y",canvas_yaxis_zerox7-20.0,canvas_miny7+30.0);
            ctx7.fillText("m = " + slope7.toFixed(4),80,750);
            ctx7.fillText("(" + scene_graphx.toFixed(4) + ", " + scene_graphy.toFixed(4) + ")",560,750);
        }

        function doMouseMove7(event) {
            var canvas7 = document.getElementById("myCanvas7");
            canvasx = event.offsetX * 2;
            canvasy = event.offsetY;
            scene_graphx = scene_x7(canvasx);
            scene_graphy = graph_function7(scene_graphx);
            canvas_graphx = canvas_x7(scene_graphx);
            canvas_graphy = canvas_y7(scene_graphy);
            build_tangent_line7();
            draw_stuff7();
          }