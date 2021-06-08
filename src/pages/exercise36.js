import React from 'react';
import './../App.css';
import Codeview3 from '../components/codeview3';
import Codeview35 from '../components/codeview35';
import $ from 'jquery';
window.$ = $;

export default class Step36 extends React.Component {


    componentDidMount() {
        function appendCode(parent, child) {
            parent.insertAdjacentElement('afterend', child);
        }

        // ========= new user interface interactions ==========




        $('#codeview35')[0].style.display = "none";

        document.getElementById("centre-text").onclick = function() {myFunction()};

        function myFunction() {
            // instead show a code popup...
            let h = document.getElementById("centre-elem")
            if (h.style.backgroundColor === 'yellow') {
                h.style.backgroundColor = 'initial';
                let modalDisplay = $('#codeview35')[0].style.display;
                (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
                $('#codeview35')[0].style.display = modalDisplay
            }
            else {
                h.style.backgroundColor = 'yellow'
                let modalDisplay = $('#codeview35')[0].style.display;
                (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
                $('#codeview35')[0].style.display = modalDisplay;

            }

        }

        document.getElementById("center").onclick = function() {myFunction_center()};
        function myFunction_center() {
            // instead show a code popup...
            let h = document.getElementById("center")
            //let image_code =
            if (h.style.color === 'yellow') {
                h.style.color = 'purple';

            }
            else {
                h.style.color = 'yellow'
            }

        }
        document.getElementById("xy").onclick = function() {myFunction_xy()};
        function myFunction_xy() {
            // instead show a code popup...
            let h = document.getElementById("xy")
            //let image_code =
            if (h.style.color === 'yellow') {
                h.style.color = 'purple';

            }
            else {
                h.style.color = 'yellow'
            }

        }
        document.getElementById("tilesize").onclick = function() {myFunction_tilesize()};
        function myFunction_tilesize() {
            // instead show a code popup...
            let h = document.getElementById("tilesize")
            //let image_code =
            if (h.style.color === 'yellow') {
                h.style.color = 'purple';

            }
            else {
                h.style.color = 'yellow'
            }

        }



        function handleInspectionClick(e) {
            let h = e.target;
            const codePopupPositionToggles = Array.from($(`.${h.dataset["name"]}-code-css-var`));
            codePopupPositionToggles.forEach((h) => {
                if (h.classList.contains('top')) {
                    const codeVals = h.dataset;
                    if (h.style.backgroundColor === 'yellow') {
                        h.style.backgroundColor = '#0000ff8a';
                        h.style.color = 'white';
                        h.innerHTML = codeVals.default;
                    } else {
                        h.innerHTML = `(${codeVals["centre1"]} + ${codeVals["y"]}) * ${codeVals["tilesize"]}`;
                        h.style.backgroundColor = 'yellow';
                        h.style.color = 'black';
                    }
                }
                else if (h.classList.contains('left')) {
                    const codeVals2 = h.dataset;
                    if (h.style.backgroundColor === 'yellow') {
                        h.style.backgroundColor = '#0000ff8a';
                        h.style.color = 'white';
                        h.innerHTML = codeVals2.default;
                    } else {
                        h.innerHTML = `(${codeVals2["centre0"]} + ${codeVals2["x"]}) * ${codeVals2["tilesize"]}`;
                        h.style.backgroundColor = 'yellow';
                        h.style.color = 'black';
                    }
                }
            })
        }

        function eventPos(e) {
            if (e.type.match(/^touch/)) {
                e = e.originalEvent.changedTouches[0];
            }
            return {
                pageX: e.pageX,
                pageY: e.pageY
            };
        } 

        var Map = function ($map) {
            var $servImg = $('#server-images');
            var imageDropdown = $('#image-dropdown');
            var size = [14, 48, 25, 33];
            var tilesize = 2048;
            var scroll_delta = null;
            var serverImages = [[], [], [], [], [], [], [], [], []];

            $map.css({
                position: 'absolute'
            });

            var position = [-(size[3] + 0.03) * tilesize, -(size[0] - 0.55) * tilesize];
            var centre = [-1, 0];

            var update = function () {
                $map.css({
                    left: position[0],
                    top: position[1]
                });

                var centre_last = centre;
                centre = [Math.floor(-position[0] / tilesize), Math.floor(-position[1] / tilesize)];
                $('#centre-elem-val')[0].innerText = ` [${centre}]`;

                const tile_name = function (x, y) {
                    x -= size[3];
                    y -= size[0];

                    return (y >= 0 ? (y + 1) + 's' : -y + 'n') + (x >= 0 ? (x + 1) + 'e' : -x + 'w');
                };

                if (centre[0] !== centre_last[0] || centre[1] !== centre_last[1]) {

                    var $remove = $map.children();
                    var $removeServerImgs = $servImg.children();
                    var $removeImageDropdowns = imageDropdown.children().not(":first-child");

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

                            /***************************************/
                            /***************************************/
                            /* BELOW: creating img elements to be added to area showing "loaded" items + information about the $image var instances to show/be inspected in the change console */
                            /***************************************/
                            /***************************************/

                            // for sub-outcome 0: small image loaded without any label/decoration
                            var serverImg = '<img alt="img not found"class="server-img-tile server-' + name + '" src="http://imgs.xkcd.com/clickdrag/' + name + '.png" />'

                            // for sub-outcome 1: small image loaded with elem tag + class name
                            var serverImgWithName = '<div class="serv-img-container"><span class="var-name var-name-txt var-name-2">&lt;img class="img-tile tile' + name + '"/&gt;</span>' + serverImg + '</div>';

                            // for sub-outcome 2: small image loaded with elem tag + class name + css inline with html 
                            var serverImgWithCSS = '<div class="serv-img-container"><span class="var-name var-name-txt var-name-2">&lt;img class="img-tile tile' + name + ' style="top:' + ((centre[1] + y) * tilesize) + 'px; left:' + ((centre[0] + x) * tilesize) + 'px;"</span>' + serverImg + '</div>';

                            // ALWAYS: append image (optionally labeled depending on sub-outcome) to the container


                            // for sub-outcome 2: create image instance dropdown menu with inspectable variable values
                            // custom data attributes used for possible inline state switching (see 3 state situation explanation below)
                            var imageDropdownElem = document.createElement('p');
                            imageDropdownElem.classList.add('image-dropdown-elem')
                            imageDropdownElem.id = `server-${name}`;
                            // Fix the element creation to pull from the HTML for the actual rendered images because this display shows "artificially" created code right now

                            let h = document.getElementById("center")
                            let hh = document.getElementById("xy")
                            let hhh = document.getElementById("tilesize")
                            //let image_code =
                            if (h.style.color === 'yellow') {
                                serverImgWithCSS= '<div class="serv-img-container"><span class="var-name var-name-txt var-name-2">&lt;img class="img-tile tile' + name + '" src="http://imgs.xkcd.com/clickdrag/' + name + '.png" style="top:' + '((centre[1]' +'+('+ y+'))'+ '*'+ tilesize+')' + 'px;left:' + '((+centre[0]'+ '+(' + x+'))' + '*' + tilesize + ')' + 'px"</span>' + serverImg + '</div>';

                            }
                            else if (hh.style.color === 'yellow') {
                                serverImgWithCSS= '<div class="serv-img-container"><span class="var-name var-name-txt var-name-2">&lt;img class="img-tile tile' + name + '" src="http://imgs.xkcd.com/clickdrag/' + name + '.png" style="top:' + '(('+centre[1] +'+('+ 'y'+'))'+ '*'+ tilesize+')' + 'px;left:' + '(('+centre[0]+ '+(' + 'x'+'))' + '*' + tilesize + ')' + 'px"</span>' + serverImg + '</div>';

                            }
                            else if (hhh.style.color === 'yellow') {
                                serverImgWithCSS= '<div class="serv-img-container"><span class="var-name var-name-txt var-name-2">&lt;img class="img-tile tile' + name + '" src="http://imgs.xkcd.com/clickdrag/' + name + '.png" style="top:' + '(('+centre[1] +'+('+ y+'))'+ '*'+ 'tilesize'+')' + 'px;left:' + '(('+centre[0]+ '+(' + x+'))' + '*' + 'tilesize' + ')' + 'px"</span>' + serverImg + '</div>';

                            }
                            else {
                                serverImgWithCSS = '<div class="serv-img-container"><span class="var-name var-name-txt var-name-2">&lt;img class="img-tile tile' + name + ' style="top:' + ((centre[1] + y) * tilesize) + 'px; left:' + ((centre[0] + x) * tilesize) + 'px;"</span>' + serverImg + '</div>';

                            }


                            $servImg.append(serverImgWithCSS);


                            imageDropdownElem.addEventListener('click', (e) => {
                                let elem = e.target;
                                // change colors of code snippet + image display
                                var instances = Array.from($(`.${e.target.id}`))
                                instances.forEach((i) => {
                                    if (i.style.borderColor === 'lightgreen') {
                                        i.style.border = '1px lightblue solid';
                                        elem.style.backgroundColor = '#f8f8ff73';
                                    } else {
                                        i.style.border = '4px lightgreen solid';
                                        elem.style.backgroundColor = 'lightgreen';
                                    };
                                })

                                if ($(`#${e.target.id}-code`)[0].style.display === 'none') {
                                    $(`#${e.target.id}-code`).css('top', e.target.getBoundingClientRect().top);
                                    $(`#${e.target.id}-code`)[0].style.display = 'block';
                                } else {
                                    $(`#${e.target.id}-code`)[0].style.display = 'none';
                                }
                            })

                            imageDropdown.append(imageDropdownElem);

                            let imageCodeDisplay = document.createElement('div');
                            imageCodeDisplay.classList.add('image-dropdown-elem-code', 'code-editor', 'code-editor-window');
                            imageCodeDisplay.id = `server-${name}-code`;

                            let varInspect1 = document.createElement('span');
                            varInspect1.classList.add('image-dropdown-elem-code-variable', 'var-value-code-inspect', 'top', `${name}-code-css-var`);
                            varInspect1.id = `${name}-code-css-top-var`;
                            varInspect1.setAttribute('data-centre1', centre[1]);
                            varInspect1.setAttribute('data-y', y);
                            varInspect1.setAttribute('data-tilesize', tilesize);
                            varInspect1.setAttribute('data-name', name);
                            varInspect1.setAttribute('data-default', '(centre[1] + y) * tilesize');
                            varInspect1.innerText = `(centre[1] + y) * tilesize`;

                            let varInspect2 = document.createElement('span');
                            varInspect2.classList.add('image-dropdown-elem-code-variable', 'var-value-code-inspect', 'left', `${name}-code-css-var`);
                            varInspect2.id = `${name}-code-css-left-var`;
                            varInspect2.setAttribute('data-centre0', centre[0]);
                            varInspect2.setAttribute('data-x', x);
                            varInspect2.setAttribute('data-tilesize', tilesize);
                            varInspect2.setAttribute('data-name', name);
                            varInspect2.setAttribute('data-default', '(centre[0] + x) * tilesize');
                            varInspect2.innerText = `(centre[0] + x) * tilesize`;

                            imageCodeDisplay.innerHTML = `&lt;img class="img-tile tile${name}" src = "http://imgs.xkcd.com/clickdrag/${name}.png" style = "top:`;
                            imageCodeDisplay.appendChild(varInspect1);
                            imageCodeDisplay.innerHTML += `px; left:`;
                            imageCodeDisplay.appendChild(varInspect2);
                            imageCodeDisplay.innerHTML += `px; z-index: -1; position: absolute;;" /&gt;`
                            imageCodeDisplay.style.display = 'none';

                            appendCode(imageDropdownElem, imageCodeDisplay);

                            ctr++
                        }
                        $remove.remove();
                        $removeServerImgs.remove();
                        $removeImageDropdowns.remove();
                    }
                }
            }
            $('#change-console').on('click', '.image-dropdown-elem-code-variable', e => handleInspectionClick(e));

            update();

            function drag(e) {
                if (scroll_delta) {
                    var pos = eventPos(e);
                    position[0] = Math.round(pos.pageX + scroll_delta[0])
                    position[1] = Math.round(pos.pageY + scroll_delta[1])
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

        /* Opens code related to reflection questions */
        $('#reflection-q-code-chevron').click(() => {
            let modalDisplay = $('#codeview3')[0].style.display;
            (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
            $('#codeview3')[0].style.display = modalDisplay;

            let chevronDir = $('#reflection-q-code-chevron')[0].innerText;
            (chevronDir === '▶') ? chevronDir = '▼' : chevronDir = '▶'
            $('#reflection-q-code-chevron')[0].innerText = chevronDir;
        })


        $('#image-instances-dropdown-chevron').click(() => {
            let modalDisplay = $('#image-dropdown')[0].style.display;
            (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
            $('#image-dropdown')[0].style.display = modalDisplay;

            let chevronDir = $('#image-instances-dropdown-chevron')[0].innerText;
            (chevronDir === '▶') ? chevronDir = '▼' : chevronDir = '▶'
            $('#image-instances-dropdown-chevron')[0].innerText = chevronDir;
        })
    }

    displayQuestions() {
        let questions = Array.from($('.ref-question'));

        for (let q = 1; q < questions.length; q++) {
            if (q === questions.length - 1) {
                // if there are no more questions to show,
                // disable "next" button and download responses
                $('#show-reflection-question')[0].disabled = true;
                $('#save-responses')[0].style.display = 'inline';
            }
            if (questions[q].style.display === 'none' || questions[q].style.display === '') {
                questions[q].style.display = 'block';
                return;
            }
        }
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
        const sFileName = 'part3reflections.txt'; // The file to save the data.

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
                                    <span className="var-name-1">{`<div class="map">`}</span>
                                    <span className="more-chevron" id="map-elem-code-chevron"><b>></b></span>
                                    <div className="code-editor code-editor-window" id="codeview0">
                                        <div className="window-body" id="display-pane-map-code">
                                            {`<div class="map" style="position: absolute; left: -67645.4px; top: -27545.6px;">`}
                                        </div>
                                    </div>
                                </div>
                                <div id="server-images"></div>
                            </span>
                        </div>
                    </div>
                    <div id="change-console">
                        {/* Step 1 */}
                        <div className="content-descriptions">Below: showing program variables and their values given current state of page.</div>
                        <p><b>Interact with the screen!</b></p>
                        <hr></hr>
                        <b className="section-header">Variables</b>
                        <p id="centre-elem"><b style={{color: "blue"}} id="centre-text" >centre</b> <Codeview35 id="codeview35" />  =
              <span id="centre-elem-val">[-1, 0]</span>
                        </p>

                        <div id="image-elem">
                            <p><b>$image</b> =
                <span id="image-elem-val"><em> local var. 9 instances</em></span><span className="more-chevron" id="image-instances-dropdown-chevron"><b>▶</b></span>
                            </p>
                        </div>
                        <div id="image-dropdown">
                            <div>Click to toggle variable name/value<br/>
                                <div id='center' style={{color: "purple"}}>center</div><br/>
                                <div id='xy' style={{color: "purple"}}>x, y</div><br/>
                                <div id='tilesize' style={{color: "purple"}}>tilesize</div><br/>
                                <i>Click to inspect</i></div>

                        </div>
                        <hr></hr>
                        <div>
                            <b className="section-header">Reflection Questions</b>
                        </div>
                        <div className="reflection-questions">
                            <div className="ref-question first-question">
                                <div className="question-txt reflection">As you interact with the screen, what is happening visually? What is happening to the variable values shown above?</div>
                                <textarea className="response-area reflection" id="p1q1"></textarea>
                            </div>
                            <div className="ref-question">
                                <div id="code-question">
                                    <span className="question-txt p1q2 reflection">What is happening in the code?</span>
                                    <span className="more-chevron" id="reflection-q-code-chevron"><b>▼</b></span>
                                    <Codeview3 id="codeview3" />
                                </div>
                                <textarea className="response-area p1q2 reflection"></textarea>
                            </div>
                            <div className="ref-question">
                                <div className="question-txt reflection">What is the relationship between $image and ((centre[1] + y) * tilesize) and ((centre[0] + x) * tilesize))?</div>
                                <textarea className="response-area reflection" id="p1q3"></textarea>
                            </div>
                            <button id="show-reflection-question" onClick={this.displayQuestions}>Next question</button>
                            <button id="save-responses" onClick={this.downloadResponses}>Complete reflection</button>
                        </div>
                        <br></br>
                    </div>
                </div> {/* closes div that wraps the entire information pane */}
                <div className="map"></div>
            </div>
        )
    }
}