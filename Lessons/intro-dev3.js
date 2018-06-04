 var canvas_minx3 = 0;
            var canvas_maxx3 = 800;
            var canvas_miny3 = 0;
            var canvas_maxy3 = 800;
            var scene_size = 10.0;
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
            var canvas_tanline_x13 = 0;
            var canvas_tanline_y13 = 0;
            var canvas_tanline_x23 = 0;
            var canvas_tanline_y23 = 0;
            var slope3 = 0;
            var scale = 1;
            var graph_coords3 = [];
            var n = 3000;
            var dx3 = 0; // set value w.r.t. n in init()
            var x1 = scene_minx3;
            var x2 = scene_maxx3;

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

        function point(x, y) {
            this.x = x;
            this.y = y;
        }

        function graph_function3(x) {
            return Math.pow(x,3);
        }

        function graph_function_derivative3(x) {
            return 3 * x * x;
        }

        function build_tangent_line3() {
            slope3 = graph_function_derivative3(scene_graphx);
            var L = 40000;
            // the stretch value here only works if canvas is a square
            var s = (scene_maxy3 - scene_miny3)/(scene_maxx3-scene_minx3);
            var delta_x3 = L/Math.sqrt(1.0 + slope3*slope3/(s*s));
            var scene_tanline_x13 = scene_graphx - delta_x3;
            var scene_tanline_x23 = scene_graphx + delta_x3;
            var scene_tanline_y13 = scene_graphy + slope3*(scene_tanline_x13 - scene_graphx);
            var scene_tanline_y23 = scene_graphy + slope3*(scene_tanline_x23 - scene_graphx);
            canvas_tanline_x13 = canvas_x3(scene_tanline_x13);
            canvas_tanline_x23 = canvas_x3(scene_tanline_x23);
            canvas_tanline_y13 = canvas_y3(scene_tanline_y13);
            canvas_tanline_y23 = canvas_y3(scene_tanline_y23);

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
            // initial tangent line
            build_tangent_line3();
            draw_stuff3();
        }
        function draw_stuff3() {
            var i=0;
            var f = "26px Trebuchet MS";
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
                ctx3.moveTo(canvas_x3(i),canvas_y3(scene_miny3));
                ctx3.lineTo(canvas_x3(i),canvas_y3(scene_maxy3));
                ctx3.stroke();
            }
            for (var i = Math.floor(scene_miny3) + 1; i < Math.floor(scene_maxy3); i += scale){
                ctx3.beginPath();
                ctx3.moveTo(canvas_x3(scene_minx3),canvas_y3(i));
                ctx3.lineTo(canvas_x3(scene_maxx3),canvas_y3(i));
                ctx3.stroke();
            }
            ctx3.beginPath();
            ctx3.arc(canvas_graphx,canvas_graphy,4.5,2*Math.PI,false);
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
            // draw tangent line
            ctx3.strokeStyle = "blue";
            ctx3.beginPath();
            ctx3.moveTo(canvas_tanline_x13,canvas_tanline_y13);
            ctx3.lineTo(canvas_tanline_x23,canvas_tanline_y23);
            ctx3.stroke();
            offsety = 20.0;
            ctx3.font = f;
            ctx3.fillStyle = "black";
            ctx3.fillText("x",canvas_maxx3-30.0,canvas_xaxis_zeroy3-13);
            ctx3.fillText("y",canvas_yaxis_zerox3-20.0,canvas_miny3+30.0);
            ctx3.fillText("m = " + slope3.toFixed(4),80,750);
            ctx3.fillText("(" + scene_graphx.toFixed(4) + ", " + scene_graphy.toFixed(4) + ")",560,750);
        }

        function doMouseMove3(event) {
            var canvas3 = document.getElementById("myCanvas3");
            canvasx = event.offsetX * 2;
            canvasy = event.offsetY;
            scene_graphx = scene_x3(canvasx);
            scene_graphy = graph_function3(scene_graphx);
            canvas_graphx = canvas_x3(scene_graphx);
            canvas_graphy = canvas_y3(scene_graphy);
            build_tangent_line3();
            draw_stuff3();
          }