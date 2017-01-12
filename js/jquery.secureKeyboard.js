/**
 * Created by jychoi on 2017. 1. 5..
 */

(function ($){

    /*
    $.fn.secureKeyboard = function(selectParam){
        var _rNum;
        var _shift;
        var _i, _j, _k;

        switch (selectParam){
            case 'alphabet':
                alphabetKeyboard: function(){
                }
                break;
            case 'number':
                numberKeyboard: function(){
                }
                break;
            default:
                qwertyKeyboard: function(){

                }
                break;
        }
    };
*/
    var rNum;
    var shift;
    var i, j, k;
    var numpads =   ['0',    '1',   '2',
                     '3',    '4',   '5',
                     '6',    '7',   '8',
                     '9',    '',    '',
                     'DELETE','ENTER','CLOSE'];

    var qwerty =    [['`','~','1','!','2','@','3','#','4','$','5','%','6','^','7','&','8','*','9','(','0',')','-','_','=','+','','','DELETE'],
                    ['q','Q','w','W','e','E','r','R','t','T','y','Y','u','U','i','I','o','O','p','P','[','{',']','}','\\','|','','','TAB'],
                    ['a','A','s','S','d','D','f','F','g','G','h','H','j','J','k','K','l','L',';',':','\'','"','','','ENTER'],
                    ['z','Z','x','X','c','C','v','V','b','B','n','N','m','M',',','\<','.','\>','/','?','','','SHIFT','SPACE']];

    var alphabets = [['q','w','e','r','t','y','u','i','o','p','','DELETE'],
                    ['a','s','d','f','g','h','j','k','l','','ENTER'],
                    ['z','x','c','v','b','n','m','','SHIFT','SPACE']];

    var qwerty3 =    [['`','1','2','3','4','5','6','7','8','9','0','-','=','DELETE'],
                    ['TAB','q','w','e','r','t','y','u','i','o','p','[',']','\\'],
                    ['CAPSLOCK','a','s','d','f','g','h','j','k','l',';','\'','ENTER'],
                    ['SHIFT','z','x','c','v','b','n','m',',','.','/','CLOSE','SPACE']];

    // qwerty keyboard without symbols
    // by using alphabets[], make virtual keyboard which has only alphabet
    $('.nameField').click(function (){

        var nameHTML = "";

        (function () {
            for(i=0; i<alphabets.length; i++){
                if(i===2){
                    for(j=0; j<alphabets[i].length-2; j++){
                        rNum = Math.floor(Math.random() * (alphabets[i].length - 3));
                        temp = alphabets[i][j];
                        alphabets[i][j] = alphabets[i][rNum];
                        alphabets[i][rNum] = temp;
                    }
                }
                else{
                    for(var j=0; j<alphabets[i].length-1; j++) {
                        rNum = Math.floor(Math.random() * (alphabets[i].length - 2));
                        temp = alphabets[i][j];
                        alphabets[i][j] = alphabets[i][rNum];
                        alphabets[i][rNum] = temp;
                    }
                }
            }

            for(i=0; i<alphabets.length; i++) {
                    alphabets[i].forEach(function (item) {
                        switch (item){
                            case 'DELETE':
                                nameHTML += '<li class="letter line' + (i+1) + ' del lastitem">' + item + '</li>';
                                break;
                            case 'ENTER':
                                nameHTML += '<li class="letter line' + (i+1) + ' enter lastitem">' + item + '</li>';
                                break;
                            case 'SHIFT':
                                nameHTML += '<li class="letter line' + (i+1) + ' shift lastitem">' + item + '</li>';
                                break;
                            case 'SPACE':
                                nameHTML += '<li class="letter line' + (i+1) + ' space">' + item + '</li>';
                                break;
                            default:
                                nameHTML += '<li class="letter line' + (i+1) + '">' + item + '</li>';
                                break;
                        }
                                /* use if... else statements
                        if(item === 'ENTER'){
                            nameHTML += '<li class="letter enter">' + item + '</li>';
                        }

                        else if(item === 'SHIFT'){
                            nameHTML += '<li class="letter shift">' + item + '</li>';
                        }

                        else if(item === 'DELETE'){
                            nameHTML += '<li class="letter del">' + item + '</li>';
                        }

                        else if(item === 'SPACE'){
                            nameHTML += '<li class="letter space">' + item + '</li>';
                        }
                        else nameHTML += '<li class="letter">' + item + '</li>';*/
                    });
            }
        })();

        // if keyboard exists keyboard disappears
        // else, keyboard is created
        if (($('.keyboard').children().length) === 0) {
            // attach keyboard to upper side form
            if($('.testView').offset().top > window.innerHeight * 0.7){
                //$('.keyboard').append(nameHTML).b($('.testView'));
                $('.keyboard').append(nameHTML);
                $('.testView').before($('.keyboard'));
            }
            // attach keyboard to down side form
            else {
                $('.keyboard').append(nameHTML);
                $('.keyboard').before($('.testView'));
            }
        }
        else {
            $('.keyboard').empty();
        }

        // input keyboard event
        $('.keyboard li').click(function () {
            var $this = $(this),
                character = $this.text();
            console.log($this);
            if($this.hasClass('shift')){
                $('.letter').toggleClass('uppercase');
                shift = !!shift ? false : true;
                return false;
            }

            if($this.hasClass('del')){
                var text = $('.nameField').val();
                $('.nameField').val(text.substr(0, text.length-1));
                return false;
            }

            if ($this.hasClass('space')) character = ' ';
            if ($this.hasClass('enter')) character = "\n";
            if ($this.hasClass('uppercase')) character = character.toUpperCase();

            // Add the character
            $('.nameField').val($('.nameField').val() + character);
        });
    });

    // number keypad
    // by using numpads[], make virtual numpad

    $('.pwdField').click(function () {
        var numberHTML = "";

        (function() {
            //shuffling numbers
            for(i=0; i<numpads.length-4; i++){
                rNum = Math.floor(Math.random() * (numpads.length-3));
                temp = numpads[i];
                numpads[i] = numpads[rNum];
                numpads[rNum] = temp;
            }

            numpads.forEach(function(item){
                if(item === numpads[numpads.length-1])
                    numberHTML += '<li class="number close lastitem">'+item+'</li>';
                else if(item === numpads[numpads.length-2])
                    numberHTML += '<li class="number enter">'+item+'</li>';
                else if(item === numpads[numpads.length-3])
                    numberHTML += '<li class="number del">'+item+'</li>';
                else if(item === numpads[2] || item === numpads[5] || item === numpads[8] || item === numpads[11])
                    numberHTML += '<li class="number lastitem">'+item+'</li>';
                else
                    numberHTML += '<li class="number">' + item + '</li>';
            });
        }());

        // if keyboard is already opened, close present keyboard.
        if ( ($('.keyboard').children().length) === 0 ) {
             // attach keyboard to upper side form
            if($('.testView').offset().top > window.innerHeight * 0.7){
                //$('.keyboard').append(nameHTML).b($('.testView'));
                $('.keyboard').append(numberHTML);
                $('.testView').before($('.keyboard'));
            }
            // attach keyboard to down side form
            else {
                $('.keyboard').append(numberHTML);
                $('.keyboard').before($('.testView'));
            }
        }

        else {
            $('.keyboard').empty();
        }

        // keyboard listen event
        $('.keyboard li').click(function () {
            var $this = $(this),
                character = $this.text();

            if($this.hasClass('del')){
                var text = $('.pwdField').val();
                $('.pwdField').val(text.substr(0, text.length-1));
                return false;
            }
            if ($this.hasClass('space')) character = " ";
            if ($this.hasClass('enter')) character = "\n";
            if ($this.hasClass('uppercase')) character = character.toUpperCase();
            if ($this.hasClass('close')){
                $('.keyboard').empty();
                return false;
            }

            // Add the character
            $('.pwdField').val($('.pwdField').val() + character);
        });
    });

    // extension keyboard open
    $('.originalField').click(function () {

        var qwertyHTML = "";
        // shuffling everything in this keyboard
        (function () {

            for(i=0; i<qwerty.length; i++){
                for(j=0; j<qwerty[i].length-2; j+=2){

                    if(i!=3) rNum = Math.floor(Math.random() * (qwerty[i].length-2));
                    else rNum = Math.floor(Math.random() * (qwerty[i].length-3));

                    if((rNum % 2) != 0) rNum -= 1;

                    temp1 = qwerty[i][j];
                    temp2 = qwerty[i][j+1];
                    qwerty[i][j] = qwerty[i][rNum];
                    qwerty[i][j+1] = qwerty[i][rNum+1];
                    qwerty[i][rNum] = temp1;
                    qwerty[i][rNum+1] = temp2;
                }
            }

            for(i=0; i<qwerty.length; i++) {
                switch(i){
                    case 0:
                        for (j = 0; j<qwerty[i].length-1; j+=2) {
                            if(j<qwerty[i].length-2){
                                if (qwerty[i][j] != "")
                                    qwertyHTML += '<li class="symbol k"><span class="off">' + qwerty[i][j] + '</span><span class="on">' + qwerty[i][j + 1] + '</span></li>';
                                else
                                    qwertyHTML += '<li class="symbol">' + qwerty[i][j] + '</li>';
                            }
                        }
                        qwertyHTML += '<li class="symbol del lastitem">' + qwerty[i][qwerty[i].length-1] + '</li>';
                        break;
                    case 1:
                        for (j = 0; j<qwerty[i].length-1; j+=2) {
                            if(j<qwerty[i].length-2){
                                if (qwerty[i][j] != "")
                                    qwertyHTML += '<li class="symbol k"><span class="off">' + qwerty[i][j] + '</span><span class="on">' + qwerty[i][j + 1] + '</span></li>';
                                else
                                    qwertyHTML += '<li class="symbol">' + qwerty[i][j] + '</li>';
                            }
                        }
                        qwertyHTML += '<li class="symbol tab lastitem">' + qwerty[i][qwerty[i].length-1] + '</li>';
                        break;
                    case 2:
                        for (j = 0; j<qwerty[i].length-1; j+=2) {
                            if(j<qwerty[i].length-2) {
                                if (qwerty[i][j] != "")
                                    qwertyHTML += '<li class="symbol k"><span class="off">' + qwerty[i][j] + '</span><span class="on">' + qwerty[i][j + 1] + '</span></li>';
                                else
                                    qwertyHTML += '<li class="symbol">' + qwerty[i][j] + '</li>';
                            }
                        }
                        qwertyHTML += '<li class="symbol enter lastitem">' + qwerty[i][qwerty[i].length-1] + '</li>';
                        break;
                    default:
                        for (j = 0; j<qwerty[i].length-1; j+=2) {
                            if(j<qwerty[i].length-3){
                                if (qwerty[i][j] != "")
                                    qwertyHTML += '<li class="symbol k"><span class="off">' + qwerty[i][j] + '</span><span class="on">' + qwerty[i][j + 1] + '</span></li>';
                                else
                                    qwertyHTML += '<li class="symbol">' + qwerty[i][j] + '</li>';
                            }
                        }
                        qwertyHTML += '<li class="symbol shift lastitem">' + qwerty[i][qwerty[i].length-2] + '</li>';
                        qwertyHTML += '<li class="symbol space">' + qwerty[i][qwerty[i].length-1] + '</li>';
                        break;
                }
            }

        })();

        // if keyboard is already opened, close present keyboard.
        if ( ($('.keyboard').children().length) === 0 ) {
            // attach keyboard to upper side form
            if($('.testView').offset().top > window.innerHeight * 0.7){
                //$('.keyboard').append(nameHTML).b($('.testView'));
                $('.keyboard').append(qwertyHTML);
                $('.testView').before($('.keyboard'));
            }
            // attach keyboard to down side form
            else {
                $('.keyboard').append(qwertyHTML);
                $('.keyboard').before($('.testView'));
            }
        }
        else {
            $('.keyboard').empty();
        }

        // input keyboard event
        $('.keyboard li').click(function () {
            var $this = $(this),
                character = $this.html();

            if($this.hasClass('shift')){
                $('.symbol.k').toggleClass('uppercase');
                $('.symbol.k span').toggle();
                shift = !!shift ? false : true;
                return false;
            }

            if($this.hasClass('del')){
                var text = $('.originalField').val();
                $('.originalField').val(text.substr(0, text.length-1));
                return false;
            }

            if ($this.hasClass('k')) character = $('span:visible', $this).html();
            if ($this.hasClass('tab'))  character= "\t";
            if ($this.hasClass('space')) character = " ";
            if ($this.hasClass('enter')) character = "\n";

            // Add the character
            $('.originalField').val($('.originalField').val() + character);
        });

    });
    
})(jQuery);