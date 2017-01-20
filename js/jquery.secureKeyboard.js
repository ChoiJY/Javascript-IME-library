/**
 * Created by jychoi on 2017. 1. 5..
 * this code makes virtual keypad on screen.
 *
 * use manuel
 *
 * this code contains three kinds of keyboard. (only number, only alphabet, basic qwerty keyboard)
 * if you want to initialize numpad,
 * you must make (input class="pwdField") and (div class="keyboard")
 *
 * if you want to initialize alphabet keypad,
 * you must make (input class="nameField") and (div class="keyboard")
 *
 * if you want to initialize qwerty keyboard,
 * you must make (input class="qwerty") and (div class="keyboard")
 */

(function ($) {

    "use strict";

    var shift;
    var numpads =   ["1",    "2",   "3",
        "4",    "5",   "6",
        "7",    "8",   "9",
        "",     "0",    "",
        "CLOSE", "ENTER", "\u232B"];

    var qwerty =   [["`", "~", "1", "!", "2", "@", "3", "#", "4", "$", "5", "%", "6", "^", "7", "&", "8", "*", "9", "(", "0", ")", "-", "_", "=", "+", "", "", "\u232B"],
        ["q", "Q", "w", "W", "e", "E", "r", "R", "t", "T", "y", "Y", "u", "U", "i", "I", "o", "O", "p", "P", "[", "{", "]", "}", "\\", "|", "", "", "TAB"],
        ["", "", "a", "A", "s", "S", "d", "D", "f", "F", "g", "G", "h", "H", "j", "J", "k", "K", "l", "L", ";", ":", "'", "\"", "", "", "", "", "ENTER"],
        ["", "", "", "", "z", "Z", "x", "X", "c", "C", "v", "V", "b", "B", "n", "N", "m", "M", ",", "<", ".", ">", "/", "?", "", "", "", "" , "SHIFT"],
        ["SPACE"]];

    var alphabets =[["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "", "\u232B"],
        ["", "a", "s", "d", "f", "g", "h", "j", "k", "l", "", "ENTER"],
        ["", "", "z", "x", "c", "v", "b", "n", "m", "", "", "SHIFT"],
        ["SPACE"]];

    var _doRandomize = false;

    // for test random options
    var opt = prompt();

    $(".tv").click(function () {
        opt = false;
    });
    // random test field end.


    /*  function which shuffles keyboards
     //
     //  @parameter
     //  keyboardType(String) : numpad, alphabet, qwerty
     //
     //  @return
     //  changedKeyset : randomized keypad
     */

    function _randomLayout(keyboardType){
        var changedKeyset = [];
        var i; var j;
        var temp; var temp2;
        var rNum;
        (function () {
            switch (keyboardType){
                case alphabets:

                    changedKeyset = JSON.parse(JSON.stringify(alphabets));

                    for(i = 0; i<changedKeyset.length-1; i+=1){
                        for(j = 0; j<changedKeyset[i].length-1; j+=1) {
                            rNum = Math.floor(Math.random() * (changedKeyset[i].length - 2));
                            temp = changedKeyset[i][j];
                            changedKeyset[i][j] = changedKeyset[i][rNum];
                            changedKeyset[i][rNum] = temp;
                        }
                    }
                    break;

                case numpads:

                    changedKeyset = JSON.parse(JSON.stringify(numpads));

                    for(i=0; i<changedKeyset.length-4; i+=1){
                        rNum = Math.floor(Math.random() * (changedKeyset.length-3));
                        temp = changedKeyset[i];
                        changedKeyset[i] = changedKeyset[rNum];
                        changedKeyset[rNum] = temp;
                    }
                    break;

                case qwerty:

                    changedKeyset = JSON.parse(JSON.stringify(qwerty));

                    for(i=0; i<changedKeyset.length-1; i+=1){
                        for(j=0; j<changedKeyset[i].length-2; j+=2){

                            rNum = Math.floor(Math.random() * (changedKeyset[i].length-3));

                            if((rNum % 2) !== 0) {
                                rNum -= 1;
                            }

                            temp = changedKeyset[i][j];
                            temp2 = changedKeyset[i][j+1];
                            changedKeyset[i][j] = changedKeyset[i][rNum];
                            changedKeyset[i][j+1] = changedKeyset[i][rNum+1];
                            changedKeyset[i][rNum] = temp;
                            changedKeyset[i][rNum+1] = temp2;
                        }
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
     //    keyboardType(String) : numpad, alphabet, qwerty
     //    layout(Array)        : keyboard's array (ex. keypad, numpad, qwerty)
     //
     //    @return
     //    html : html tags derived from keyboard which is selected from parameter
     */

    function _writeHTML(keyboardType, layout){

        var html= "";
        var i; var j;
        (function () {
            switch (keyboardType){

                case numpads:

                    layout.forEach(function(item){
                        switch (item){
                            case layout[layout.length-1]:
                                html += "<span class='number del lastitem'>"+item+"</span>";
                                break;
                            case layout[layout.length-2]:
                                html += "<span class='number enter'>"+item+"</span>";
                                break;
                            case layout[layout.length-3]:
                                html += "<span class='number close'>"+item+"</span>";
                                break;
                            case "":
                                html += "<span class='number null'>" + item + "</span>";
                                break;
                            default:
                                html += "<span class='number'>" + item + "</span>";
                        }
                    });
                    break;

                case alphabets:

                    for(i=0; i<layout.length; i+=1) {
                        html+= "<div class='line" + (i+1) + "'>";
                        layout[i].forEach(function (item) {
                            switch (item){
                                case "\u232B":
                                    html += "<span class='letter line" + (i+1) + " del lastitem'>" + item + "</span>";
                                    break;
                                case "ENTER":
                                    html += "<span class='letter line" + (i+1) + " enter lastitem'>" + item + "</span>";
                                    break;
                                case "SHIFT":
                                    html += "<span class='letter line" + (i+1) + " shift lastitem'>" + item + "</span>";
                                    break;
                                case "SPACE":
                                    html += "<span class='letter line" + (i+1) + " space lastitem'>" + item + "</span>";
                                    break;
                                case "":
                                    html += "<span class='letter line" + (i+1) + " null'>" + item + "</span>";
                                    break;
                                default:
                                    html += "<span class='letter line" + (i+1) + "'>" + item + "</span>";
                            }
                        });
                        html+="</div>";
                    }
                    break;

                case qwerty:

                    for(i=0; i<layout.length-1; i+=1) {
                        html+= "<div class='line" + (i+1) + "'>";
                        for (j = 0; j < layout[i].length - 1; j += 2) {
                            if (layout[i][j] !== "") {
                                html += "<span class='symbol k'><span class='off'>" + layout[i][j] + "</span><span class='on'>" + layout[i][j + 1] + "</span></span>";
                            }
                            else {
                                html += "<span class='symbol null'>" + layout[i][j] + "</span>";
                            }
                        }
                        html += "<span class='symbol " + layout[i][layout[i].length-1].toLowerCase() + " lastitem'>" + layout[i][layout[i].length-1] + "</span>";
                        html+="</div>";
                    }
                    html += "<div class='line5'><span class='symbol space lastitem'>SPACE</span></div>";
                    break;
            }
        })();
        return html;
    }


    //  only alphabet keyboard
    //
    $(".nameField").click(function (){

        var generatedHTML;
        var layout = alphabets;
        _doRandomize = (opt === "random");

        if(_doRandomize){
            layout = _randomLayout(alphabets);
        }
        generatedHTML = _writeHTML(alphabets, layout);

        // if keyboard exists keyboard disappears
        // else, keyboard is created
        if ( ($(".keyboard").children().length) === 0 ) {
            //$(".keyboard").append(generatedHTML);
            //$(".keyboard").css("top", window.innerHeight-$(".keyboard").height());

            // attach keyboard to upper side form
            if($(".testView").offset().top < window.innerHeight * 0.7){
                $(".keyboard").append(generatedHTML);
                $(".keyboard").css("top", window.innerHeight-$(".keyboard").height());
                //$(".testView").before($(".keyboard"));
            }
            // attach keyboard to down side form
            else {
                $(".keyboard").append(generatedHTML);
                document.body.scrollTop = $(".keyboard").height();
                $(".keyboard").css("top", window.innerHeight-$(".keyboard").height());
                //$(".keyboard").css("top", 0);
                //$(".keyboard").before($(".testView"));
            }
        }
        else {
            $(".keyboard").css("top", window.innerHeight);
            document.body.scrollTop -= $(".keyboard").height();
            $(".keyboard").html("");
            //$(".keyboard").empty();
        }

        // Sense keyboard li's contents
        $(".keyboard span").click(function () {

            var $this = $(this);
            var character = $this.text();

            if($this.hasClass("shift")){
                $(".letter").toggleClass("uppercase");
                shift = !!shift ? false : true;
                return false;
            }

            if($this.hasClass("del")){
                var text = $(".nameField").val();
                $(".nameField").val(text.substr(0, text.length-1));
                return false;
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
            $(".nameField").val($(".nameField").val() + character);
        });
    });

    // number keypad
    $(".pwdField").click(function () {

        var generatedHTML;
        var layout = numpads;
        _doRandomize = (opt === "random");


        if(_doRandomize){
            layout = _randomLayout(numpads);
        }

        generatedHTML = _writeHTML(numpads, layout);

        // if keyboard is already opened, close present keyboard.
        if ( ($(".keyboard").children().length) === 0 ) {
            //$(".keyboard").append(generatedHTML);
            //$(".keyboard").css("top", window.innerHeight-$(".keyboard").height());

             // attach keyboard to upper side form
            if($(".testView").offset().top < window.innerHeight * 0.7){
                $(".keyboard").append(generatedHTML);
                $(".keyboard").css("top", window.innerHeight-$(".keyboard").height());
            }
            // attach keyboard to down side form
            else {
                $(".keyboard").append(generatedHTML);
                document.body.scrollTop = $(".keyboard").height();
                $(".keyboard").css("top", window.innerHeight-$(".keyboard").height());
            }

        }
        else {
            $(".keyboard").css("top", window.innerHeight);
            document.body.scrollTop -= $(".keyboard").height();
            $(".keyboard").html("");
            //$(".keyboard").empty();
        }

        // Sense keyboard li's contents
        $(".keyboard span").click(function () {
            var $this = $(this);
            var character = $this.text();

            if($this.hasClass("del")){
                var text = $(".pwdField").val();
                $(".pwdField").val(text.substr(0, text.length-1));
                return false;
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
            if ($this.hasClass("close")){
                $(".keyboard").empty();
                return false;
            }
            // Add the character
            $(".pwdField").val($(".pwdField").val() + character);
        });
    });

    // extension keyboard open
    $(".originalField").click(function () {

        var generatedHTML;
        var layout = qwerty;

        _doRandomize = (opt === "random");

        if(_doRandomize){
            layout = _randomLayout(qwerty);
        }

        generatedHTML = _writeHTML(qwerty, layout);
        // if keyboard is already opened, close present keyboard.
        if ( ($(".keyboard").children().length) === 0 ) {
            //$(".keyboard").append(generatedHTML);
            //$(".keyboard").css("top", window.innerHeight-$(".keyboard").height());

            // attach keyboard to upper side form
            if($(".testView").offset().top < window.innerHeight * 0.7){
                $(".keyboard").append(generatedHTML);
                $(".keyboard").css("top", window.innerHeight-$(".keyboard").height());
                //$(".testView").before($(".keyboard"));
            }
            // attach keyboard to down side form
            else {
                $(".keyboard").append(generatedHTML);
                document.body.scrollTop = $(".keyboard").height();
                $(".keyboard").css("top", window.innerHeight-$(".keyboard").height());
                //$(".keyboard").css("top", 0);
                //$(".keyboard").before($(".testView"));
            }
        }
        else {
            $(".keyboard").css("top", window.innerHeight);
            document.body.scrollTop -= $(".keyboard").height();
            $(".keyboard").html("");
           //$(".keyboard").empty();
        }

        // input keyboard event
        $(".keyboard span").click(function () {
            var $this = $(this);
            var character = $this.text();
            if($this.hasClass("shift")){
                $(".symbol.k").toggleClass("uppercase");
                $(".symbol.k span").toggle();
                shift = !!shift ? false : true;
                return false;
            }

            if($this.hasClass("del")){
                var text = $(".originalField").val();
                $(".originalField").val(text.substr(0, text.length-1));
                return false;
            }

            if ($this.hasClass("k")) {
                character = $("span:visible", $this).html();
            }
            if ($this.hasClass("tab"))  {
                character= "\t";
            }
            if ($this.hasClass("space")) {
                character = " ";
            }
            if ($this.hasClass("enter")) {
                character = "\n";
            }
            // Add the character
            $(".originalField").val($(".originalField").val() + character.replace(/&amp;/g, "&").replace(/&lt;/,"<").replace(/&gt;/,">"));
        });
    });
})(jQuery);