 var canvas_minx2 = 0;
            var canvas_maxx2 = 800;
            var canvas_miny2 = 0;
            var canvas_maxy2 = 800;
            var scene_size = 10.0;
            var scene_minx2 = -1 * scene_size;
            var scene_maxx2 = scene_size;
            var scene_miny2 = -1 * scene_size;
            var scene_maxy2 = scene_size;
            var canvas_graphx = 0;
            var canvas_graphy = 0;
            var canvas_xaxis_minx2 = 0;
            var canvas_xaxis_maxx2 = 0;
            var canvas_xaxis_zeroy2 = 0;
            var canvas_yaxis_miny2 = 0;
            var canvas_yaxis_maxy2 = 0;
            var canvas_yaxis_zerox2 = 0;
            var canvas_tanline_x1 = 0;
            var canvas_tanline_y1 = 0;
            var canvas_tanline_x2 = 0;
            var canvas_tanline_y2 = 0;
            var slope2 = 0;
            var scale = 1;
            var graph_coords2 = [];
            var n = 3000;
            var dx2 = 0; // set value w.r.t. n in init2()

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

        function point(x, y) {
            this.x = x;
            this.y = y;
        }

        function graph_function2(x) {
            return Math.sin(x)
        }

        function graph_function_derivative(x) {
            return Math.cos(x);
        }

        function build_tangent_line2() {
            slope2 = graph_function_derivative(scene_graphx);
            var L = 400;
            // the stretch value here only works if canvas is a square
            var s = (scene_maxy2 - scene_miny2)/(scene_maxx2-scene_minx2);
            var delta_x = L/Math.sqrt(1.0 + slope2*slope2/(s*s));
            var scene_tanline_x1 = scene_graphx - delta_x;
            var scene_tanline_x2 = scene_graphx + delta_x;
            var scene_tanline_y1 = scene_graphy + slope2*(scene_tanline_x1 - scene_graphx);
            var scene_tanline_y2 = scene_graphy + slope2*(scene_tanline_x2 - scene_graphx);
            canvas_tanline_x1 = canvas_x2(scene_tanline_x1);
            canvas_tanline_x2 = canvas_x2(scene_tanline_x2);
            canvas_tanline_y1 = canvas_y2(scene_tanline_y1);
            canvas_tanline_y2 = canvas_y2(scene_tanline_y2);

       }
        function init2() {
            var canvas2 = document.getElementById("myCanvas2");
            var i = 0;
            var x = 0;
            var y = 0;
            canvas2.addEventListener("mousemove", doMouseMove2, false);
            // set up and compute graph of curve
            dx2 = (scene_maxx2 - scene_minx2)/n;
            x = scene_minx2;
            for (i=0; i<n; i++) {
                y = graph_function2(x);
                graph_coords2.push(new point(canvas_x2(x),canvas_y2(y)));
                x = x + dx2;
            }
            // set up coord axes
            canvas_xaxis_minx2 = canvas_x2(scene_minx2);
            canvas_xaxis_maxx2 = canvas_x2(scene_maxx2);
            canvas_xaxis_zeroy2 = canvas_y2(0.0);
            canvas_yaxis_miny2 = canvas_y2(scene_miny2);
            canvas_yaxis_maxy2 = canvas_y2(scene_maxy2);
            canvas_yaxis_zerox2 = canvas_x2(0.0);
            // initial tangent point location
            scene_graphx = 0.5;
            scene_graphy = graph_function2(scene_graphx);
            canvas_graphx = canvas_x2(scene_graphx);
            canvas_graphy = canvas_y2(scene_graphy);
            // initial tangent line
            build_tangent_line2();
            draw_stuff2();
        }
        function draw_stuff2() {
            var i=0;
            var f = "26px Trebuchet MS";
            var canvas2 = document.getElementById("myCanvas2");
            var ctx2 = canvas2.getContext("2d");
            ctx2.clearRect(canvas_minx2,canvas_miny2, canvas_maxx2-canvas_minx2, canvas_maxy2-canvas_miny2);
            ctx2.fillStyle = "white";
            ctx2.fillRect(canvas_minx2,canvas_miny2, canvas_maxx2-canvas_minx2, canvas_maxy2-canvas_miny2);
            // draw tangent marker
            ctx2.lineWidth = 0.375;
            ctx2.strokeStyle = "rgb(0,0,0,0.5)";
            for (var i = Math.floor(scene_minx2) + 1; i < Math.floor(scene_maxx2); i += scale){
                ctx2.beginPath();
                ctx2.moveTo(canvas_x2(i),canvas_y2(scene_miny2));
                ctx2.lineTo(canvas_x2(i),canvas_y2(scene_maxy2));
                ctx2.stroke();
            }
            for (var i = Math.floor(scene_miny2) + 1; i < Math.floor(scene_maxy2); i += scale){
                ctx2.beginPath();
                ctx2.moveTo(canvas_x2(scene_minx2),canvas_y2(i));
                ctx2.lineTo(canvas_x2(scene_maxx2),canvas_y2(i));
                ctx2.stroke();
            }
            ctx2.beginPath();
            ctx2.arc(canvas_graphx,canvas_graphy,4.5,2*Math.PI,false);
            ctx2.fillStyle = "blue";
            ctx2.fill();
            // draw coord axes
            ctx2.strokeStyle = "black";
            ctx2.lineWidth = 1.0;
            ctx2.beginPath();
            ctx2.moveTo(canvas_xaxis_minx2,canvas_xaxis_zeroy2);
            ctx2.lineTo(canvas_xaxis_maxx2,canvas_xaxis_zeroy2);
            ctx2.stroke();
            ctx2.beginPath();
            ctx2.moveTo(canvas_yaxis_zerox2,canvas_yaxis_miny2);
            ctx2.lineTo(canvas_yaxis_zerox2,canvas_yaxis_maxy2);
            ctx2.stroke();
            // draw graph of function
            ctx2.strokeStyle = "blue";
            ctx2.lineWidth = 2.0;
            ctx2.beginPath();
            ctx2.moveTo(graph_coords2[0].x,graph_coords2[0].y);
            for (i=0; i<n; i++) {
                ctx2.lineTo(graph_coords2[i].x,graph_coords2[i].y);
            }
            ctx2.stroke();
            // draw tangent line
            ctx2.strokeStyle = "blue";
            ctx2.beginPath();
            ctx2.moveTo(canvas_tanline_x1,canvas_tanline_y1);
            ctx2.lineTo(canvas_tanline_x2,canvas_tanline_y2);
            ctx2.stroke();
            ctx2.font = f;
            ctx2.fillStyle = "black";
            ctx2.fillText("x",canvas_maxx2-30.0,canvas_xaxis_zeroy2-13);
            ctx2.fillText("y",canvas_yaxis_zerox2-20.0,canvas_miny2+30.0);
            ctx2.fillText("m = " + slope2.toFixed(4),80,750);
            ctx2.fillText("(" + scene_graphx.toFixed(4) + ", " + scene_graphy.toFixed(4) + ")",560,750);
        }

        function doMouseMove2(event) {
            var canvas2 = document.getElementById("myCanvas2");
            canvasx = event.offsetX * 2;
            canvasy = event.offsetY;
            scene_graphx = scene_x2(canvasx);
            scene_graphy = graph_function2(scene_graphx);
            canvas_graphx = canvas_x2(scene_graphx);
            canvas_graphy = canvas_y2(scene_graphy);
            build_tangent_line2();
            draw_stuff2();
          }
