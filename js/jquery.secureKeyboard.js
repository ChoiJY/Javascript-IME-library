/**
 * Created by jychoi on 2017. 1. 5.
 *
 * description
 *
 * this plugin contains three kinds of keyboard.
 *
 * 1.   if you need numpad, you must make input class name which is a numField
 *
 * 2.   and if you want attach keypad, call init(randomOption)
 *
 * 3.   if you make element which has class name numField, and click that, numpad appears.
 *                          which has class name nameField, alphabet keypad appears.
 *                          which has class name originalField, basic qwerty keypad appears.
 *                          click again these fields, keyboard disappears
 *
 * 4.   you want to remove keypad, call detach method.
 *
 */

(function ($) {

    "use strict";

    $.fn.SVkeyboard = $.SVkeyboard = {

        // default keyboard's options
        _defaults: function () {

            var _isRandom = false;
            var _numpads = ["1", "2", "3",
                "4", "5", "6",
                "7", "8", "9",
                "", "0", "",
                "CLOSE", "ENTER", "\u232B"];
            var _alphabets = [["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "", "\u232B"],
                ["", "a", "s", "d", "f", "g", "h", "j", "k", "l", "", "ENTER"],
                ["", "" , "z", "x", "c", "v", "b", "n", "m", "", "" , "SHIFT"],
                ["SPACE", "\uD83C\uDF10"]];
            var _qwerty = [["`", "~", "1", "!", "2", "@", "3", "#", "4", "$", "5", "%", "6", "^", "7", "&", "8", "*", "9", "(", "0", ")", "-", "_", "=", "+", "", "", "\u232B"],
                ["q", "Q", "w", "W", "e", "E", "r", "R", "t", "T", "y", "Y", "u", "U", "i", "I", "o", "O", "p", "P", "[", "{", "]", "}", "\\", "|", "", "", "TAB"],
                ["", "", "a", "A", "s", "S", "d", "D", "f", "F", "g", "G", "h", "H", "j", "J", "k", "K", "l", "L", ";", ":", "'", "\"", "", "", "", "", "ENTER"],
                ["", "", "", "", "z", "Z", "x", "X", "c", "C", "v", "V", "b", "B", "n", "N", "m", "M", ",", "<", ".", ">", "/", "?", "", "", "", "", "SHIFT"],
                ["SPACE"]];
            var _hangul = [["q", "Q", "ㅂ", "ㅃ", "w", "W", "ㅈ", "ㅉ", "e", "E", "ㄷ", "ㄸ", "r", "R", "ㄱ", "ㄲ", "t", "T", "ㅅ", "ㅆ", "y", "Y" ,"ㅛ", "u", "U", "ㅕ", "i", "I", "ㅑ", "o", "O", "ㅐ", "ㅒ", "p", "P", "ㅔ", "ㅖ", "", "\u232B"],
                            ["", "a", "A", "ㅁ", "s", "S", "ㄴ", "d", "D", "ㅇ", "f", "F", "ㄹ", "g", "G", "ㅎ", "h", "H", "ㅗ", "j", "J", "ㅓ", "k", "K", "ㅏ", "l", "L", "ㅣ", "", "ENTER"],
                            ["", "", "z", "Z", "ㅋ", "x", "X", "ㅌ", "c", "C", "ㅊ", "v", "V", "ㅍ", "b", "B", "ㅠ", "n", "N", "ㅜ", "m", "M", "ㅡ", "", "", "SHIFT"],
                            ["SPACE", "\uD83C\uDF10"]];
            var options = {
                _isRandom: _isRandom,
                _numpads: _numpads,
                _alphabets: _alphabets,
                _qwerty: _qwerty,
                _hangul: _hangul
            };
            return options;

        },

        //  public methods
        //
        //  init(randomOption)
        //  this method initializes keyboard
        //
        //  @parameter
        //  randomOption(Object) : if user want to change options (ex. randomized keypad, changing keyboard arrangement)
        //                         you write parameters you want to change
        //
        //

        init: function (randomOption) {

            // user options and default options are merged, by this line.
            var options = $.extend({}, this._defaults(), randomOption);
            var body = $("body");
            if (document.getElementsByClassName("keyboard").length === 0) {
                body.append("<div class='keyboard'></div>");
                var generatedHTML;
                var $keyboard = $(".keyboard");

                body.on("click", function (event) {

                    switch (event.target.className) {
                        case "nameField":

                            generatedHTML = _writeHTML("alphabets", options._alphabets);
                            if (options._isRandom) {
                                generatedHTML = _writeHTML("alphabets", _randomLayout("alphabets", options._alphabets));
                            }

                            if (($keyboard.children().length) === 0) {
                                // 폼 아래에 충분한 공간이 있을 경우에는 그냥 하단에 키보드를 생성
                                if (event.clientY < (window.innerHeight * 0.7) && (window.innerHeight > 500)) {
                                    $keyboard.append(generatedHTML);
                                    $keyboard.css("top", window.innerHeight - $keyboard.height());
                                }
                                // 폼 아래에 충분한 공간이 없을 경우에는 키보드 만큼 스크롤을 내리고, 하단에 키보드를 생성시킨다.
                                else {
                                    $keyboard.append(generatedHTML);
                                    document.body.scrollTop = $keyboard.height();
                                    $keyboard.css("top", window.innerHeight - $keyboard.height());
                                }
                            }
                            else {
                                $keyboard.css("top", window.innerHeight);
                                document.body.scrollTop -= $keyboard.height();
                                $keyboard.html("");
                            }

                            // Sense keyboard li's contents
                            $(".keyboard span").on("click", function () {
                                //stop event duplication
                                //event.stopPropagation();
                                var $this = $(this);
                                var character = $this.text();

                                if ($this.hasClass("shift")) {
                                    $(".letter").toggleClass("uppercase");
                                    return "";
                                }

                                if ($this.hasClass("del")) {
                                    var text = $(".nameField").val();
                                    $(".nameField").val(text.substr(0, text.length - 1));
                                    return "";
                                }

                                if ($this.hasClass("space")) {
                                    character = " ";
                                }

                                if ($this.hasClass("enter")) {
                                    character = "\n";
                                }

                                if ($this.hasClass("uppercase")) {
                                    character = character.toUpperCase();
                                }

                                // Add the character
                                $(".nameField").val($(".nameField").val() + character.replace(/&amp;/, "&").replace(/&lt;/, "<").replace(/&gt;/, ">"));
                            });
                            break;

                        case "hangulField":

                            generatedHTML = _writeHTML("hangul", options._hangul);

                            if (options._isRandom) {
                                generatedHTML = _writeHTML("hangul", _randomLayout("hangul", options._hangul));
                            }

                            if (($keyboard.children().length) === 0) {
                                // 폼 아래에 충분한 공간이 있을 경우에는 그냥 하단에 키보드를 생성
                                if (event.clientY < (window.innerHeight * 0.7) && (window.innerHeight > 500)) {
                                    $keyboard.append(generatedHTML);
                                    $keyboard.css("top", window.innerHeight - $keyboard.height());
                                }
                                // 폼 아래에 충분한 공간이 없을 경우에는 키보드 만큼 스크롤을 내리고, 하단에 키보드를 생성시킨다.
                                else {
                                    $keyboard.append(generatedHTML);
                                    document.body.scrollTop = $keyboard.height();
                                    $keyboard.css("top", window.innerHeight - $keyboard.height());
                                }
                            }
                            else {
                                $keyboard.css("top", window.innerHeight);
                                document.body.scrollTop -= $keyboard.height();
                                $keyboard.html("");
                            }

                            // Sense keyboard li's contents
                            $(".letter").on("click", function () {

                                var $this = $(this);
                                var character = this.innerText;

                                if ($this.hasClass("shift")) {
                                    $(".letter>span>span").toggleClass("upper");
                                    return "";
                                }

                                if ($this.hasClass("local")) {
                                    $(".letter>span").toggleClass("kr");
                                    return "";
                                }

                                if ($this.hasClass("⌫")) {
                                    var text = $(".nameField").val();
                                    $(".nameField").val(text.substr(0, text.length - 1));
                                    return "";
                                }

                                if ($this.hasClass("space")) {
                                    character = " ";
                                }

                                if ($this.hasClass("enter")) {
                                    character = "\n";
                                }

                                // Add the character
                                $(".hangulField").val($(".hangulField").val() + character.replace(/&amp;/, "&").replace(/&lt;/, "<").replace(/&gt;/, ">"));
                            });
                            break;

                        case "pwdField":

                            generatedHTML = _writeHTML("numpads", options._numpads);

                            if (options._isRandom) {
                                generatedHTML = _writeHTML("numpads", _randomLayout("numpads", options._numpads));
                            }

                            // if keyboard is already opened, close present keyboard.
                            if (($keyboard.children().length) === 0) {
                                // attach keyboard to upper side form
                                if (event.clientY < (window.innerHeight * 0.7) && (window.innerHeight > 500)) {
                                    $keyboard.append(generatedHTML);
                                    $keyboard.css("top", window.innerHeight - $keyboard.height());
                                }
                                // attach keyboard to down side form
                                else {
                                    $keyboard.append(generatedHTML);
                                    document.body.scrollTop = $keyboard.height();
                                    $keyboard.css("top", window.innerHeight - $keyboard.height());
                                }
                            }
                            else {
                                $keyboard.css("top", window.innerHeight);
                                document.body.scrollTop -= $keyboard.height();
                                $keyboard.html("");
                            }

                            // Sense keyboard li's contents
                            $(".keyboard span").on("click", function () {
                                //stop event duplication
                                //event.stopPropagation();
                                var $this = $(this);
                                var character = $this.text();

                                if ($this.hasClass("del")) {
                                    var text = $(".pwdField").val();
                                    $(".pwdField").val(text.substr(0, text.length - 1));
                                    return "";
                                }

                                if ($this.hasClass("space")) {
                                    character = " ";
                                }

                                if ($this.hasClass("enter")) {
                                    character = "\n";
                                }

                                if ($this.hasClass("uppercase")) {
                                    character = character.toUpperCase();
                                }

                                if ($this.hasClass("close")) {
                                    $(".keyboard").empty();
                                    return "";
                                }

                                // Add the character
                                $(".pwdField").val($(".pwdField").val() + character);
                            });
                            break;

                        case "originalField":
                            generatedHTML = _writeHTML("qwerty", options._qwerty);

                            if (options._isRandom) {
                                generatedHTML = _writeHTML("qwerty", _randomLayout("qwerty", options._qwerty));
                            }

                            // if keyboard is already opened, close present keyboard.
                            if (($keyboard.children().length) === 0) {

                                // attach keyboard to upper side form
                                if (event.clientY < (window.innerHeight * 0.7) && (window.innerHeight > 500)) {
                                    $keyboard.append(generatedHTML);
                                    $keyboard.css("top", window.innerHeight - $keyboard.height());
                                }
                                // attach keyboard to down side form
                                else {
                                    $keyboard.append(generatedHTML);
                                    document.body.scrollTop = $keyboard.height();
                                    $keyboard.css("top", window.innerHeight - $keyboard.height());
                                }
                            }
                            else {
                                $keyboard.css("top", window.innerHeight);
                                document.body.scrollTop -= $keyboard.height();
                                $keyboard.html("");
                            }

                            // input keyboard event
                            $("span.lastitem, span.symbol.k").on("click", function () {
                                //stop event duplication
                                //event.stopImmediatePropagation();
                                var $this = $(this);
                                var character = $this.text();
                                if ($this.hasClass("shift")) {
                                    $(".symbol.k span").toggleClass("on");
                                    return "";
                                }

                                if ($this.hasClass("⌫")) {
                                    var text = $(".originalField").val();
                                    $(".originalField").val(text.substr(0, text.length - 1));
                                    return "";
                                }

                                if ($this.hasClass("k")) {
                                    character = $("span:visible", $this).html();
                                }

                                if ($this.hasClass("tab")) {
                                    character = "\t";
                                }

                                if ($this.hasClass("space")) {
                                    character = " ";
                                }

                                if ($this.hasClass("enter")) {
                                    character = "\n";
                                }
                                // Add the character
                                $(".originalField").val($(".originalField").val() + character.replace(/&amp;/, "&").replace(/&lt;/, "<").replace(/&gt;/, ">"));
                            });
                            break;
                    }
                });
            }
            return randomOption;
        },

        //
        //  public methods
        //
        //  detach()
        //  if you want remove keyboard, you can call this method
        //

        detach: function () {
            $(".keyboard").remove();
        }
    };

    //
    //  private methods
    //
    //  _randomLayout(keyboardType, layout)
    //  this method uses keyboard array to shuffle keyboard's layout
    //
    //  @parameter
    //  keyboardType(String) : options for switch from numpads to full qwerty keyboard
    //  layout(Array) : keyboard array
    //
    //  @return
    //  changedKeyset : randomized keypad
    //

    var _randomLayout = function (keyboardType, layout) {

        var changedKeyset = [];
        var i;
        var j;
        var temp;
        var temp2;
        var rNum;
        (function () {
            switch (keyboardType) {
                case "alphabets":

                    changedKeyset = JSON.parse(JSON.stringify(layout));

                    for (i = 0; i < changedKeyset.length - 1; i += 1) {
                        for (j = 0; j < changedKeyset[i].length - 1; j += 1) {
                            rNum = Math.floor(Math.random() * (changedKeyset[i].length - 2));
                            temp = changedKeyset[i][j];
                            changedKeyset[i][j] = changedKeyset[i][rNum];
                            changedKeyset[i][rNum] = temp;
                        }
                    }
                    break;

                case "hangul":

                    changedKeyset = JSON.parse(JSON.stringify(layout));

                    for (i = 0; i < changedKeyset.length - 1; i += 1) {
                        for (j = 0; j < changedKeyset[i].length - 1; j += 1) {
                            rNum = Math.floor(Math.random() * (changedKeyset[i].length - 2));
                            temp = changedKeyset[i][j];
                            changedKeyset[i][j] = changedKeyset[i][rNum];
                            changedKeyset[i][rNum] = temp;
                        }
                    }
                    break;

                case "numpads":

                    changedKeyset = JSON.parse(JSON.stringify(layout));

                    for (i = 0; i < changedKeyset.length - 4; i += 1) {
                        rNum = Math.floor(Math.random() * (changedKeyset.length - 3));
                        temp = changedKeyset[i];
                        changedKeyset[i] = changedKeyset[rNum];
                        changedKeyset[rNum] = temp;
                    }
                    break;

                case "qwerty":

                    changedKeyset = JSON.parse(JSON.stringify(layout));

                    for (i = 0; i < changedKeyset.length - 1; i += 1) {
                        for (j = 0; j < changedKeyset[i].length - 2; j += 2) {

                            rNum = Math.floor(Math.random() * (changedKeyset[i].length - 3));

                            if ((rNum % 2) !== 0) {
                                rNum -= 1;
                            }

                            temp = changedKeyset[i][j];
                            temp2 = changedKeyset[i][j + 1];
                            changedKeyset[i][j] = changedKeyset[i][rNum];
                            changedKeyset[i][j + 1] = changedKeyset[i][rNum + 1];
                            changedKeyset[i][rNum] = temp;
                            changedKeyset[i][rNum + 1] = temp2;
                        }
                    }
                    break;
            }
        })();

        return changedKeyset;
    };

    //
    //    _writeHTML = function (keyboardType, layout)
    //
    //    Read keypad array's data and translate them to html tags
    //
    //    @parameter
    //    keyboardType(String) : numpad, alphabet, keyboard.qwerty
    //    layout(Array)        : keyboard's array (ex. keypad, numpad, keyboard.qwerty)
    //
    //    @return
    //    html : html tags derived from keyboard which is selected from parameter
    //

    var _writeHTML = function (keyboardType, layout) {

        var html = "";
        var i;
        var j;
        (function () {
            switch (keyboardType) {

                case "numpads":
                    layout.forEach(function (item) {
                        switch (item) {
                            case layout[layout.length - 1]:
                                html += "<span class='number del lastitem'>" + item + "</span>";
                                break;
                            case layout[layout.length - 2]:
                                html += "<span class='number enter'>" + item + "</span>";
                                break;
                            case layout[layout.length - 3]:
                                html += "<span class='number close'>" + item + "</span>";
                                break;
                            case "":
                                html += "<span class='number null'>" + item + "</span>";
                                break;
                            default:
                                html += "<span class='number'>" + item + "</span>";
                        }
                    });
                    break;

                case "hangul":
                    for (i = 0; i < layout.length-1; i += 1) {
                        html += "<div class='line" + (i + 1) + "'>";
                        for (j = 0; j < layout[i].length - 1; j += 1) {

                            if((i === 0 && j <= 16) || (i===0 && j >= 29)){
                                if (layout[i][j] !== "") {
                                    html += "<span class='letter'>"
                                            + "<span class='en'><span class='lower'>" + layout[i][j] + "</span><span class='upper'>" + layout[i][j + 1] + "</span></span>"
                                            + "<span class='kr'><span class='lower'>" + layout[i][j + 2] + "</span><span class='upper'>" + layout[i][j + 3] + "</span></span>"
                                            + "</span>";
                                    j+=3;
                                }
                            else {
                                    html += "<span class='letter null'>" + layout[i][j] + "</span>";
                                }
                            }

                            else{
                                if (layout[i][j] !== "") {
                                    html += "<span class='letter'>"
                                        + "<span class='en'><span class='lower'>" + layout[i][j] + "</span><span class='upper'>" + layout[i][j + 1] + "</span></span>"
                                        + "<span class='kr'>" + layout[i][j + 2] + "</span>"
                                        + "</span>";
                                    j+=2;
                                }
                                else {
                                    html += "<span class='letter null'>" + layout[i][j] + "</span>";
                                }
                            }
                        }
                        html += "<span class='letter " + layout[i][layout[i].length - 1].toLowerCase() + " lastitem'>" + layout[i][layout[i].length - 1] + "</span>";
                        html += "</div>";
                    }
                    html += "<div class='line4'><span class='letter space lastitem'>SPACE</span>";
                    html += "<span class='letter local lastitem'>\uD83C\uDF10</span></div>";

                    break;

                case "alphabets":

                    for (i = 0; i < layout.length; i += 1) {
                        html += "<div class='line" + (i + 1) + "'>";
                        layout[i].forEach(function (item) {
                            switch (item) {
                                case "\u232B":
                                    html += "<span class='letter line" + (i + 1) + " del lastitem'>" + item + "</span>";
                                    break;
                                case "\uD83C\uDF10":
                                    html += "<span class='letter line" + (i + 1) + " local'>" + item + "</span>";
                                    break;
                                case "ENTER":
                                    html += "<span class='letter line" + (i + 1) + " enter lastitem'>" + item + "</span>";
                                    break;
                                case "SHIFT":
                                    html += "<span class='letter line" + (i + 1) + " shift lastitem'>" + item + "</span>";
                                    break;
                                case "SPACE":
                                    html += "<span class='letter line" + (i + 1) + " space lastitem'>" + item + "</span>";
                                    break;
                                case "":
                                    html += "<span class='letter line" + (i + 1) + " null'>" + item + "</span>";
                                    break;
                                default:
                                    html += "<span class='letter line" + (i + 1) + "'>" + item + "</span>";
                            }
                        });
                        html += "</div>";
                    }
                    break;

                case "qwerty":

                    for (i = 0; i < layout.length - 1; i += 1) {
                        html += "<div class='line" + (i + 1) + "'>";
                        for (j = 0; j < layout[i].length - 1; j += 2) {
                            if (layout[i][j] !== "") {
                                html += "<span class='symbol k'><span class='off'>" + layout[i][j] + "</span><span class='on'>" + layout[i][j + 1] + "</span></span>";
                            }
                            else {
                                html += "<span class='symbol null'>" + layout[i][j] + "</span>";
                            }
                        }
                        html += "<span class='symbol " + layout[i][layout[i].length - 1].toLowerCase() + " lastitem'>" + layout[i][layout[i].length - 1] + "</span>";
                        html += "</div>";
                    }
                    html += "<div class='line5'><span class='symbol space lastitem'>SPACE</span></div>";
                    break;
            }
        })();
        return html;
    };

})(jQuery);
