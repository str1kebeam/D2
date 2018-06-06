 var canvas_minx6 = 0;
            var canvas_maxx6 = 800;
            var canvas_miny6 = 0;
            var canvas_maxy6 = 800;
            var scene_size = 10.0;
            var scene_minx6 = -1 * scene_size;
            var scene_maxx6 = scene_size;
            var scene_miny6 = -1 * scene_size;
            var scene_maxy6 = scene_size;
            var canvas_graphx = 0;
            var canvas_graphy = 0;
            var canvas_xaxis_minx6 = 0;
            var canvas_xaxis_maxx6 = 0;
            var canvas_xaxis_zeroy6 = 0;
            var canvas_yaxis_miny6 = 0;
            var canvas_yaxis_maxy6 = 0;
            var canvas_yaxis_zerox6 = 0;
            var canvas_tanline_x16 = 0;
            var canvas_tanline_y16 = 0;
            var canvas_tanline_x26 = 0;
            var canvas_tanline_y26 = 0;
            var slope6 = 0;
            var scale = 1;
            var graph_coords6 = [];
            var n = 3000;
            var dx6 = 0; // set value w.r.t. n in init()

        function canvas_x6(x) {
            var u = (x - scene_minx6)/(scene_maxx6 - scene_minx6);
            return canvas_minx6 + u*(canvas_maxx6 - canvas_minx6);
        }

        function canvas_y6(y) {
            var v = (y - scene_miny6)/(scene_maxy6 - scene_miny6);
            return canvas_miny6 + (1.0 - v)*(canvas_maxy6 - canvas_miny6);
        }

        function scene_x6(x) {
            var u = (x - canvas_minx6)/(canvas_maxx6 - canvas_minx6);
            return scene_minx6 + u*(scene_maxx6 - scene_minx6);
        }

        function point(x, y) {
            this.x = x;
            this.y = y;
        }

        function graph_function6(x) {
            return Math.pow(x,3) + 1;
        }

        function graph_function_derivative6(x) {
            return 3 * x * x;
        }

        function build_tangent_line6() {
            slope6 = graph_function_derivative6(scene_graphx);
            var L = 40000;
            // the stretch value here only works if canvas is a square
            var s = (scene_maxy6 - scene_miny6)/(scene_maxx6-scene_minx6);
            var delta_x6 = L/Math.sqrt(1.0 + slope6*slope6/(s*s));
            var scene_tanline_x16 = scene_graphx - delta_x6;
            var scene_tanline_x26 = scene_graphx + delta_x6;
            var scene_tanline_y16 = scene_graphy + slope6*(scene_tanline_x16 - scene_graphx);
            var scene_tanline_y26 = scene_graphy + slope6*(scene_tanline_x26 - scene_graphx);
            canvas_tanline_x16 = canvas_x6(scene_tanline_x16);
            canvas_tanline_x26 = canvas_x6(scene_tanline_x26);
            canvas_tanline_y16 = canvas_y6(scene_tanline_y16);
            canvas_tanline_y26 = canvas_y6(scene_tanline_y26);

       }
        function init6() {
            var canvas6 = document.getElementById("myCanvas6");
            var i = 0;
            var x = 0;
            var y = 0;
            canvas6.addEventListener("mousemove", doMouseMove6, false);
            // set up and compute graph of curve
            dx6 = (scene_maxx6 - scene_minx6)/n;
            x = scene_minx6;
            for (i=0; i<n; i++) {
                y = graph_function6(x);
                graph_coords6.push(new point(canvas_x6(x),canvas_y6(y)));
                x = x + dx6;
            }
            // set up coord axes
            canvas_xaxis_minx6 = canvas_x6(scene_minx6);
            canvas_xaxis_maxx6 = canvas_x6(scene_maxx6);
            canvas_xaxis_zeroy6 = canvas_y6(0.0);
            canvas_yaxis_miny6 = canvas_y6(scene_miny6);
            canvas_yaxis_maxy6 = canvas_y6(scene_maxy6);
            canvas_yaxis_zerox6 = canvas_x6(0.0);
            // initial tangent point location
            scene_graphx = 0.5;
            scene_graphy = graph_function6(scene_graphx);
            canvas_graphx = canvas_x6(scene_graphx);
            canvas_graphy = canvas_y6(scene_graphy);
            // initial tangent line
            build_tangent_line6();
            draw_stuff6();
        }
        function draw_stuff6() {
            var i=0;
            var f = "26px Trebuchet MS";
            var canvas6 = document.getElementById("myCanvas6");
            var ctx6 = canvas6.getContext("2d");
            ctx6.clearRect(canvas_minx6,canvas_miny6, canvas_maxx6-canvas_minx6, canvas_maxy6-canvas_miny6);
            ctx6.fillStyle = "white";
            ctx6.fillRect(canvas_minx6,canvas_miny6, canvas_maxx6-canvas_minx6, canvas_maxy6-canvas_miny6);
            // draw tangent marker
            ctx6.lineWidth = 0.375;
            ctx6.strokeStyle = "rgb(0,0,0,0.5)";
            for (var i = Math.floor(scene_minx6) + 1; i < Math.floor(scene_maxx6); i += scale){
                ctx6.beginPath();
                ctx6.moveTo(canvas_x6(i),canvas_y6(scene_miny6));
                ctx6.lineTo(canvas_x6(i),canvas_y6(scene_maxy6));
                ctx6.stroke();
            }
            for (var i = Math.floor(scene_miny6) + 1; i < Math.floor(scene_maxy6); i += scale){
                ctx6.beginPath();
                ctx6.moveTo(canvas_x6(scene_minx6),canvas_y6(i));
                ctx6.lineTo(canvas_x6(scene_maxx6),canvas_y6(i));
                ctx6.stroke();
            }
            ctx6.beginPath();
            ctx6.arc(canvas_graphx,canvas_graphy,4.5,2*Math.PI,false);
            ctx6.fillStyle = "blue";
            ctx6.fill();
            // draw coord axes
            ctx6.strokeStyle = "black";
            ctx6.lineWidth = 1.0;
            ctx6.beginPath();
            ctx6.moveTo(canvas_xaxis_minx6,canvas_xaxis_zeroy6);
            ctx6.lineTo(canvas_xaxis_maxx6,canvas_xaxis_zeroy6);
            ctx6.stroke();
            ctx6.beginPath();
            ctx6.moveTo(canvas_yaxis_zerox6,canvas_yaxis_miny6);
            ctx6.lineTo(canvas_yaxis_zerox6,canvas_yaxis_maxy6);
            ctx6.stroke();
            // draw graph of function
            ctx6.strokeStyle = "blue";
            ctx6.lineWidth = 2.0;
            ctx6.beginPath();
            ctx6.moveTo(graph_coords6[0].x,graph_coords6[0].y);
            for (i=0; i<n; i++) {
                ctx6.lineTo(graph_coords6[i].x,graph_coords6[i].y);
            }
            ctx6.stroke();
            // draw tangent line
            ctx6.strokeStyle = "blue";
            ctx6.beginPath();
            ctx6.moveTo(canvas_tanline_x16,canvas_tanline_y16);
            ctx6.lineTo(canvas_tanline_x26,canvas_tanline_y26);
            ctx6.stroke();
            offsety = 20.0;
            ctx6.font = f;
            ctx6.fillStyle = "black";
            ctx6.fillText("x",canvas_maxx6-30.0,canvas_xaxis_zeroy6-13);
            ctx6.fillText("y",canvas_yaxis_zerox6-20.0,canvas_miny6+30.0);
            ctx6.fillText("m = " + slope6.toFixed(4),80,750);
            ctx6.fillText("(" + scene_graphx.toFixed(4) + ", " + scene_graphy.toFixed(4) + ")",560,750);
        }

        function doMouseMove6(event) {
            var canvas6 = document.getElementById("myCanvas6");
            canvasx = event.offsetX * 2;
            canvasy = event.offsetY;
            scene_graphx = scene_x6(canvasx);
            scene_graphy = graph_function6(scene_graphx);
            canvas_graphx = canvas_x6(scene_graphx);
            canvas_graphy = canvas_y6(scene_graphy);
            build_tangent_line6();
            draw_stuff6();
          }