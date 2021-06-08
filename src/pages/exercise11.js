import React from 'react';
import './../App.css';
import Position17 from './../components/position17';
import Codeview1 from './../components/codeview1';
import $ from 'jquery';
window.$ = $;

export default class Exercise11 extends React.Component {
    componentDidMount() {


        var pageX = document.getElementById("x");
        /*var pageY = document.getElementById("y");*/

        function placeDiv(x_pos, y_pos) {
            var d = document.getElementById('yourDivId');
            d.style.position = "absolute";
            d.style.left = x_pos+'px';
            d.style.top = y_pos+'px';
        }

        function eventPos(e) {
            if (e.type.match(/^touch/)) {
                e = e.originalEvent.changedTouches[0];
            }
            pageX.innerText = e.pageX;
            /*pageY.innerText = e.pageY;*/
            return {
                pageX: e.pageX,
                pageY: e.pageY
            };
        }

        var Map = function ($map) {
            var $servImg = $('#server-images');
            var size = [14, 48, 25, 33];
            var tilesize = 2048;
            var scroll_delta = null;
            var serverImages = [[], [], [], [], [], [], [], [], []];

            $map.css({
                position: 'absolute'
            });

            var position = [-(size[3] + 0.03) * tilesize, -(size[0] - 0.55) * tilesize];
            $('#modified-position0-code-1')[0].innerHTML = `position[0] = ${position[0]}`
            $('#modified-position1-code-1')[0].innerHTML = `position[1] = ${position[1]}`
            var centre = [-1, 0];

            var update = function () {
                $('#position-0')[0].innerHTML = `<b>position</b> = [${position}]`; // CONSOLE HELP
                $map.css({
                    left: position[0],
                    top: position[1]
                });

                var centre_last = centre;
                centre = [Math.floor(-position[0] / tilesize), Math.floor(-position[1] / tilesize)];

                const tile_name = function (x, y) {
                    x -= size[3];
                    y -= size[0];

                    return (y >= 0 ? (y + 1) + 's' : -y + 'n') + (x >= 0 ? (x + 1) + 'e' : -x + 'w');
                };
                $map.append($('<span className="dot" style={{left: -69645.4, top: -29545.6}}></span>'));
                if (centre[0] !== centre_last[0] || centre[1] !== centre_last[1]) {

                    var $remove = $map.children();
                    var $removeServerImgs = $servImg.children();

                    let allNames = [];
                    let ctr = 0;
                    for (var y = -1; y <= +1; y++) {
                        for (var x = -1; x <= +1; x++) {
                            var name = tile_name(centre[0] + x, centre[1] + y);
                            allNames.push(name);
                            var tile = $map.find('.tile' + name);
                            if (tile.length) {
                                $remove = $remove.not(tile);
                            }
                            else {
                                let $image;
                                $image = $('<img class="img-tile tile' + name + '" src="http://imgs.xkcd.com/clickdrag/' + name + '.png" style="top:' + ((centre[1] + y) * tilesize) + 'px;left:' + ((centre[0] + x) * tilesize) + 'px; z-index: -1; position: absolute;;" style="display:none" />');

                                $image.on('load', function () {
                                    $(this).show()
                                })
                                $image.on('error', function () {
                                    $(this).remove();
                                })
                                $map.append($image);
                            }
                            serverImages[ctr].push(name);

                            // create new elem to be added to area showing "loaded" items
                            // step 0: no decoration/labeling. Just small image. 
                            var serverImageElem = '<img alt="img not found"class="server-img-tile server-' + name + '" src="http://imgs.xkcd.com/clickdrag/' + name + '.png" />'

                            /*
                              // step 1: variable name label
                              var serverImgWithName = '<div class="serv-img-container"><span class="var-name var-name-txt var-name-2">var name: $image</span>' + serverImageElem + '</div>';
                            */

                            // append it to the container
                            $servImg.append(serverImageElem);

                            ctr++
                        }
                        $remove.remove();
                        $removeServerImgs.remove();
                    }

                }
            }

            update();

            function drag(e) {
                if (scroll_delta) {
                    var pos = eventPos(e);
                    position[0] = Math.round(pos.pageX + scroll_delta[0])
                    position[1] = Math.round(pos.pageY + scroll_delta[1])
                    $('#modified-position0-code-1')[0].innerHTML = `position[0] = Math.round(${pos.pageX} + ${scroll_delta[0]})`
                    $('#modified-position1-code-1')[0].innerHTML = `position[1] = Math.round(${pos.pageY} + ${scroll_delta[1]})`
                    $('#map-elem-val')[0].innerText = $map[0].outerHTML.match(/.+?(?=>)/) + '>';
                    $('#display-pane-map-code')[0].innerText = $map[0].outerHTML.match(/.+?(?=>)/) + '>';
                    update();
                }
            }

            $(".map")
                .on('mousedown touchstart', function (e) {
                    var pos = eventPos(e);
                    scroll_delta = [position[0] - pos.pageX, position[1] - pos.pageY];
                    $(document).on(e.type === 'mousedown' ? 'mousemove' : 'touchmove', drag);
                    e.preventDefault();
                });
            $(document)
                .on('mouseup touchend', function (e) {
                    $(document).off('mousemove touchmove', drag)
                    scroll_delta = null;
                    $('#modified-position0-code-1')[0].innerHTML = `position[0] = ${position[0]}`
                    $('#modified-position1-code-1')[0].innerHTML = `position[1] = ${position[1]}`
                    $('#map-elem-val')[0].innerText = $map[0].outerHTML.match(/.+?(?=>)/);
                });
        };

        $(function () {
            // eslint-disable-next-line
            var map = new Map($('.map'));
        });

        /* opens/closes the Scaffolded Exercises pane */
        $('#toggle-console').click(() => {
            let consoleDisplay = $('#change-demos-wrapper')[0].style.display;
            if (consoleDisplay === "flex") {
                consoleDisplay = "none"
                $('#toggle-console')[0].innerText = 'Show'
            } else {
                consoleDisplay = "flex";
                $('#toggle-console')[0].innerText = 'Hide';
            }
            $('#change-demos-wrapper')[0].style.display = consoleDisplay;
        })

        /* opens/closes the "more info" modals that extend off the main console. NOTE: need to connect the chevrons and the open modals more intuitively / automatically */
        $('#position-nested-lvl-1-chevron').click(() => {
            let modalDisplay = $('#position-1')[0].style.display;
            (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
            $('#position-1')[0].style.display = modalDisplay;
        })

        /* Opens reflection questions */
        $('#reflection-q-more-chevron').click(() => {
            let modalDisplay = $('.reflection-questions')[0].style.display;
            (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
            $('.reflection-questions')[0].style.display = modalDisplay;
            $('.ref-question')[0].style.display = "block";
        })

        /* Opens code related to reflection questions */
        $('#reflection-q-code-chevron').click(() => {
            let modalDisplay = $('#codeview1')[0].style.display;
            (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
            $('#codeview1')[0].style.display = modalDisplay;
        })

        /* Opens map div source code */
        $('#map-elem-code-chevron').click(() => {
            let modalDisplay = $('#codeview0')[0].style.display;
            (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
            $('#codeview0')[0].style.display = modalDisplay;
        })
    }

    displayQuestions() {
        let questions = Array.from($('.ref-question'));

        for (let q = 1; q < questions.length; q++) {
            if (questions[q].style.display === 'none' || questions[q].style.display === '') {
                questions[q].style.display = 'block';
                return;
            }
        }

        // if there are no more questions to show,
        // disable "next" button and download responses
        $('#show-reflection-question')[0].disabled = true;
        $('#save-responses')[0].style.display = 'inline';
    }

    downloadResponses() {
        const reflections = Array.from($('.reflection'));
        let data = '';

        // Get the data from each element on the form.
        reflections.forEach((r) => {
            if (r.innerHTML !== undefined) {
                data += ' \r\n ' + r.innerHTML;
            }
            if (r.value !== undefined) {
                data += ' \r\n ' + r.value;
            }
        })

        // Convert the text to BLOB.
        const textToBLOB = new Blob([data], { type: 'text/plain' });
        const sFileName = 'part1reflections.txt'; // The file to save the data.

        let newLink = document.createElement("a");
        newLink.download = sFileName;

        if (window.webkitURL != null) {
            newLink.href = window.webkitURL.createObjectURL(textToBLOB);
        }
        else {
            newLink.href = window.URL.createObjectURL(textToBLOB);
            newLink.style.display = "none";
            document.body.appendChild(newLink);
        }

        newLink.click();
    }

    render() {
        return (
            <div className="App">
                <div id="app-title">Scaffolded Exercises <button id="toggle-console">Show</button></div>
                <div id="change-demos-wrapper">
                    <div id="display-pane">
                        <div className="content-descriptions">Below: Showing all elements currently loaded on page.</div>
                        <div id="server-images-wrapper">
                            <span id="map-div-wrapper">
                                <div className="var-name-txt" id="display-pane-map-elem">
                                    <span className="var-name-1">{`<div class="map ss">`}</span>
                                    <span className="more-chevron" id="map-elem-code-chevron"><b>></b></span>
                                    <div className="code-editor-window" id="codeview0">
                                        <div className="window-body" id="display-pane-map-code">
                                            {`<div class="map" style="position: relative; left: -67645.4px; top: -27545.6px;">`}

                                        </div>
                                    </div>
                                </div>
                                <div id="server-images"><span className="dot" style={{left: -67645.4, top: -27545.6}}></span></div>

                                <span className="dot" style={{left: -69645.4, top: -29545.6}}></span>
                            </span>
                        </div>
                    </div>
                    <div id="change-console">
                        {/* Step 1 */}
                        <div className="content-descriptions">Below: showing program variables and their values given current state of page.</div>
                        <hr></hr>
                        <p><b>Interact with screen!</b></p>
                        <hr></hr>
                        {/* <div className="var-defns">
              <div className="var-def">var name</div>
              <div className="var-def">var value</div>
            </div> */}
                        <div className="value-def">
                            <p id="position-0"></p>
                            <p className="more-chevron" style={{ display: 'none' }} id="position-nested-lvl-1-chevron">></p>
                            <Position17 id="position-1" />

                        </div>

                        <code>pageX</code>: <span id="x">n/a</span>
                        <div id="map-elem"><b>$map</b> = <span id="map-elem-val">{`= <div class="map" style="position: absolute; left: -67645.4px; top: -27545.6px;">`}</span></div>
                        <hr></hr>
                        <div>
                            <b>Reflection Questions</b>
                            <span className="more-chevron" id="reflection-q-more-chevron"><b>></b></span>
                        </div>
                        <div className="reflection-questions">
                            <div className="ref-question first-question">
                                <div className="question-txt reflection">As you interact with the screen, what is happening visually? What is happening to the variable values shown above?</div>
                                <textarea className="response-area reflection" id="p1q1"></textarea>
                            </div>
                            <div className="ref-question">
                                <div id="code-question">
                                    <span className="question-txt p1q2 reflection">What is happening in the code?</span>
                                    <span className="more-chevron" id="reflection-q-code-chevron"><b>></b></span>
                                    <Codeview1 id="codeview1" />
                                </div>
                                <textarea className="response-area p1q2 reflection"></textarea>
                            </div>
                            <div className="ref-question">
                                <div className="question-txt reflection">What is the relationship between $map and $position?</div>
                                <textarea className="response-area reflection" id="p1q3"></textarea>
                            </div>
                            <button id="show-reflection-question" onClick={this.displayQuestions}>Next question</button>
                            <button id="save-responses" onClick={this.downloadResponses}>Save responses</button>
                        </div>
                        <br></br>
                    </div>
                </div> {/* closes div that wraps the entire information pane */}
                <div className="map"></div>
            </div>
        )
    }
}