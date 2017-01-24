/**
 * Created by jychoi on 2017. 1. 5.
 * this code makes virtual keypad on screen.
 *
 * use manuel
 *
 * this source code contains three kinds of keyboard.
 * (only number, only alphabet, basic keyboard.qwerty keyboard)
 *
 * 1.   if you need numpad, you must make input class name which is a numField
 *
 * 2.   and if you want attach keypad, call init(randomLayoutOption)
 *
 * 3.   if you make class which has name numField, and click that, numpad appears.
 *                        which has name nameField, alphabet keypad appears.
 *                        which has name originalField, basic qwerty keypad appears.
 *
 * 4.   you want to disappear keypad, click again input field.
 *
 */

(function ($) {

    "use strict";

    $.SVkeyboard = {
        //_shift : false,
        _isRandom: false,

        numpads: ["1", "2", "3",
            "4", "5", "6",
            "7", "8", "9",
            "", "0", "",
            "CLOSE", "ENTER", "\u232B"],

        alphabets: [["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "", "\u232B"],
            ["", "a", "s", "d", "f", "g", "h", "j", "k", "l", "", "ENTER"],
            ["", "", "z", "x", "c", "v", "b", "n", "m", "", "", "SHIFT"],
            ["SPACE"]],

        qwerty: [["`", "~", "1", "!", "2", "@", "3", "#", "4", "$", "5", "%", "6", "^", "7", "&", "8", "*", "9", "(", "0", ")", "-", "_", "=", "+", "", "", "\u232B"],
            ["q", "Q", "w", "W", "e", "E", "r", "R", "t", "T", "y", "Y", "u", "U", "i", "I", "o", "O", "p", "P", "[", "{", "]", "}", "\\", "|", "", "", "TAB"],
            ["", "", "a", "A", "s", "S", "d", "D", "f", "F", "g", "G", "h", "H", "j", "J", "k", "K", "l", "L", ";", ":", "'", "\"", "", "", "", "", "ENTER"],
            ["", "", "", "", "z", "Z", "x", "X", "c", "C", "v", "V", "b", "B", "n", "N", "m", "M", ",", "<", ".", ">", "/", "?", "", "", "", "", "SHIFT"],
            ["SPACE"]],

        _init: function (randomOption) {
            var body = $("body");
            body.append("<div class='keyboard'></div>");
            var generatedHTML;
            var $keyboard = $(".keyboard");
            keyboard._isRandom = randomOption;

            body.on("click", function (event) {
                //event.stopPropagation();
                switch (event.target.className) {
                    case "nameField":
                        //event.stopPropagation();
                        generatedHTML = _writeHTML(keyboard.alphabets, keyboard.alphabets);
                        if (keyboard._isRandom) {
                            generatedHTML = _writeHTML(keyboard.alphabets, _randomLayout(keyboard.alphabets));
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

                    case "pwdField":
                        //event.stopPropagation();
                        generatedHTML = _writeHTML(keyboard.numpads, keyboard.numpads);

                        if (keyboard._isRandom) {
                            generatedHTML = _writeHTML(keyboard.numpads, _randomLayout(keyboard.numpads));
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
                        generatedHTML = _writeHTML(keyboard.qwerty, keyboard.qwerty);

                        if (keyboard._isRandom) {
                            generatedHTML = _writeHTML(keyboard.qwerty, _randomLayout(keyboard.qwerty));
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
                        $(".keyboard span.lastitem, span.symbol.k").on("click", function () {
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
    };

    var keyboard = $.SVkeyboard;
    // for test random options
        $(".tv").click(function () {
            if (keyboard._isRandom) {
                keyboard._isRandom = false;
            }
            else {
                keyboard._isRandom = true;
            }
        });

        /*  function which shuffles keyboards
         //
         //  @parameter
         //  keyboardType(String) : numpad, alphabet, keyboard.qwerty
         //
         //  @return
         //  changedKeyset : randomized keypad
         */

        function _randomLayout(keyboardType) {
            var changedKeyset = [];
            var i;
            var j;
            var temp;
            var temp2;
            var rNum;
            (function () {
                switch (keyboardType) {
                    case keyboard.alphabets:

                        changedKeyset = JSON.parse(JSON.stringify(keyboard.alphabets));
                        for (i = 0; i < changedKeyset.length - 1; i += 1) {
                            for (j = 0; j < changedKeyset[i].length - 1; j += 1) {
                                rNum = Math.floor(Math.random() * (changedKeyset[i].length - 2));
                                temp = changedKeyset[i][j];
                                changedKeyset[i][j] = changedKeyset[i][rNum];
                                changedKeyset[i][rNum] = temp;
                            }
                        }
                        break;

                    case keyboard.numpads:

                        changedKeyset = JSON.parse(JSON.stringify(keyboard.numpads));

                        for (i = 0; i < changedKeyset.length - 4; i += 1) {
                            rNum = Math.floor(Math.random() * (changedKeyset.length - 3));
                            temp = changedKeyset[i];
                            changedKeyset[i] = changedKeyset[rNum];
                            changedKeyset[rNum] = temp;
                        }
                        break;

                    case keyboard.qwerty:

                        changedKeyset = JSON.parse(JSON.stringify(keyboard.qwerty));

                        for (i = 0; i < changedKeyset.length - 1; i += 1) for (j = 0; j < changedKeyset[i].length - 2; j += 2) {

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
                        break;
                }
            })();

            return changedKeyset;
        }

    /*
    //    Read keypad array's data and translate them to html tags
    //
    //    @parameter
    //    keyboardType(String) : numpad, alphabet, keyboard.qwerty
    //    layout(Array)        : keyboard's array (ex. keypad, numpad, keyboard.qwerty)
    //
    //    @return
    //    html : html tags derived from keyboard which is selected from parameter
    */

    function _writeHTML(keyboardType, layout) {

        var html = "";
        var i;
        var j;
        (function () {
            switch (keyboardType) {

                case keyboard.numpads:
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

                case keyboard.alphabets:

                    for (i = 0; i < layout.length; i += 1) {
                        html += "<div class='line" + (i + 1) + "'>";
                        layout[i].forEach(function (item) {
                            switch (item) {
                                case "\u232B":
                                    html += "<span class='letter line" + (i + 1) + " del lastitem'>" + item + "</span>";
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

                case keyboard.qwerty:

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
    }
})(jQuery);