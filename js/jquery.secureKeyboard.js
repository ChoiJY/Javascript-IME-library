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

    'use strict';

    $.fn.SVkeyboard = $.SVkeyboard = {

        // default keyboard's options
        _defaults: function () {

            var _isRandom = false;

            var _numpads = [
                [['1'], ['2'], ['3'], ['\u232B']],
                [['4'], ['5'], ['6'], ['ENTER']],
                [['7'], ['8'], ['9'], ['RESET']],
                [[''], ['0'], [''], ['CLOSE']]
            ];

            var _alphabets = [
                [['q'], ['w'], ['e'], ['r'], ['t'], ['y'], ['u'], ['i'], ['o'], ['p'], [''], ['\u232B']],
                [[''], ['a'], ['s'], ['d'], ['f'], ['g'], ['h'], ['j'], ['k'], ['l'], [''], ['ENTER']],
                [[''], [''] , ['z'], ['x'], ['c'], ['v'], ['b'], ['n'], ['m'], [''], [''] , ['SHIFT']],
                [['SPACE'], ['\uD83C\uDF10']]
            ];

            var _qwerty = [
                [['`', '~'], ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], [''], ['\u232B']],
                [['q', 'Q', 'ㅂ', 'ㅃ'], ['w', 'W', 'ㅈ', 'ㅉ'], ['e', 'E', 'ㄷ', 'ㄸ'], ['r', 'R', 'ㄱ', 'ㄲ'], ['t', 'T', 'ㅅ', 'ㅆ'], ['y', 'Y' ,'ㅛ'], ['u', 'U', 'ㅕ'], ['i', 'I', 'ㅑ'], ['o', 'O', 'ㅐ', 'ㅒ'], ['p', 'P', 'ㅔ', 'ㅖ'], ['[', '{'], [']', '}'], ['\\', '|'], [''], ['TAB']],
                [[''], ['a', 'A', 'ㅁ'], ['s', 'S', 'ㄴ'], ['d', 'D', 'ㅇ'], ['f', 'F', 'ㄹ'], ['g', 'G', 'ㅎ'], ['h', 'H', 'ㅗ'], ['j', 'J', 'ㅓ'], ['k', 'K', 'ㅏ'], ['l', 'L', 'ㅣ'], [';', ':'], ['\'', '"'], [''], [''], ['ENTER']],
                [[''], [''], ['z', 'Z', 'ㅋ'], ['x', 'X', 'ㅌ'], ['c', 'C', 'ㅊ'], ['v', 'V', 'ㅍ'], ['b', 'B', 'ㅠ'], ['n', 'N', 'ㅜ'], ['m', 'M', 'ㅡ'], [',', '<'], ['.', '>'], ['/', '?'], [''], [''], ['SHIFT']],
                [['SPACE'],['\uD83C\uDF10']]
            ];

            var _simpleQwerty = [
                [['q', 'Q', 'ㅂ', 'ㅃ'], ['w', 'W', 'ㅈ', 'ㅉ'], ['e', 'E', 'ㄷ', 'ㄸ'], ['r', 'R', 'ㄱ', 'ㄲ'], ['t', 'T', 'ㅅ', 'ㅆ'], ['y', 'Y' ,'ㅛ'], ['u', 'U', 'ㅕ'], ['i', 'I', 'ㅑ'], ['o', 'O', 'ㅐ', 'ㅒ'], ['p', 'P', 'ㅔ', 'ㅖ'], [''], ['\u232B']],
                [[''], ['a', 'A', 'ㅁ'], ['s', 'S', 'ㄴ'], ['d', 'D', 'ㅇ'], ['f', 'F', 'ㄹ'], ['g', 'G', 'ㅎ'], ['h', 'H', 'ㅗ'], ['j', 'J', 'ㅓ'], ['k', 'K', 'ㅏ'], ['l', 'L', 'ㅣ'], [''], ['ENTER']],
                [[''], [''], ['z', 'Z', 'ㅋ'], ['x', 'X', 'ㅌ'], ['c', 'C', 'ㅊ'], ['v', 'V', 'ㅍ'], ['b', 'B', 'ㅠ'], ['n', 'N', 'ㅜ'], ['m', 'M', 'ㅡ'], [''], [''], ['SHIFT']],
                [['SPACE'], ['\uD83C\uDF10']]
            ];

            var options = {
                _isRandom: _isRandom,
                _numpads: _numpads,
                _alphabets: _simpleQwerty,
                _qwerty: _qwerty,
                _hangul: _qwerty
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
            var body = $('body');
            if (document.getElementsByClassName('keyboard').length === 0) {

                body.append('<div class="keyboard"></div>');
                var generatedHTML;
                var $keyboard = $('.keyboard');

                body.on('click', function (event) {

                    switch (event.target.className) {

                        case 'nameField':

                            if (options._isRandom) {
                                generatedHTML = _writeHTML('letter', _randomLayout('letter', options._alphabets));
                            }
                            else{
                                generatedHTML = _writeHTML('letter', options._alphabets);
                            }

                            if (($keyboard.children().length) === 0) {
                                // 폼 아래에 충분한 공간이 있을 경우에는 그냥 하단에 키보드를 생성
                                if (event.clientY < (window.innerHeight * 0.7) && (window.innerHeight > 500)) {
                                    $keyboard.append(generatedHTML);
                                    $keyboard.css('top', window.innerHeight - $keyboard.height());
                                }
                                // 폼 아래에 충분한 공간이 없을 경우에는 키보드 만큼 스크롤을 내리고, 하단에 키보드를 생성시킨다.
                                else {
                                    $keyboard.append(generatedHTML);
                                    document.body.scrollTop = $keyboard.height();
                                    $keyboard.css('top', window.innerHeight - $keyboard.height());
                                }
                            }
                            // 기존의 키보드가 있다면 삭제하고 그만큼 스크롤을 올림
                            else {
                                $keyboard.css('top', window.innerHeight);
                                document.body.scrollTop -= $keyboard.height();
                                $keyboard.html('');
                            }

                            // Sense keyboard li's contents
                            $('.letter').on('click', function () {

                                var $this = $(this);
                                var character = this.innerText;

                                if ($this.hasClass('shift')) {
                                    $('.letter > span > span').toggleClass('upper');
                                    return '';
                                }

                                if ($this.hasClass('local')) {
                                    $('.letter > span').toggleClass('kr');
                                    return '';
                                }

                                if ($this.hasClass('del')) {
                                    var text = $('.nameField').val();
                                    $('.nameField').val(text.substr(0, text.length - 1));
                                    return '';
                                }

                                if ($this.hasClass('space')) {
                                    character = ' ';
                                }

                                if ($this.hasClass('enter')) {
                                    character = '\n';
                                }

                                if ($this.hasClass('uppercase')) {
                                    character = character.toUpperCase();
                                }

                                // Add the character
                                $('.nameField').val($('.nameField').val() + character.replace(/&amp;/, '&').replace(/&lt;/, '<').replace(/&gt;/, '>'));
                                $('.nameField').val(Hangul.a($('.nameField').val()));
                            });
                            break;

                        case 'hangulField':

                            if (options._isRandom) {
                                generatedHTML = _writeHTML('symbol', _randomLayout('symbol', options._hangul));
                            }
                            else{
                                generatedHTML = _writeHTML('symbol', options._hangul);
                            }

                            // 기존에 키보드가 없는 경우
                            if (($keyboard.children().length) === 0) {
                                // 폼 아래에 충분한 공간이 있을 경우에는 그냥 하단에 키보드를 생성
                                if (event.clientY < (window.innerHeight * 0.7) && (window.innerHeight > 500)) {
                                    $keyboard.append(generatedHTML);
                                    $keyboard.css('top', window.innerHeight - $keyboard.height());
                                }
                                // 폼 아래에 충분한 공간이 없을 경우에는 키보드 만큼 스크롤을 내리고, 하단에 키보드를 생성시킨다.
                                else {
                                    $keyboard.append(generatedHTML);
                                    document.body.scrollTop = $keyboard.height();
                                    $keyboard.css('top', window.innerHeight - $keyboard.height());
                                }
                            }

                            // 기존 키보드가 있는 경우
                            else {
                                $keyboard.css('top', window.innerHeight);
                                document.body.scrollTop -= $keyboard.height();
                                $keyboard.html('');
                            }

                            // Sense keyboard li's contents
                            $('.symbol').on('click', function () {

                                var $this = $(this);
                                var character = this.innerText;

                                if ($this.hasClass('shift')) {
                                    $('.symbol > span > span').toggleClass('upper');
                                    return '';
                                }

                                if ($this.hasClass('local')) {
                                    $('.k > span').toggleClass('kr');
                                    return '';
                                }

                                if ($this.hasClass('del')) {
                                    var text = $('.hangulField').val();
                                    $('.hangulField').val(text.substr(0, text.length - 1));
                                    return '';
                                }

                                if ($this.hasClass('space')) {
                                    character = ' ';
                                }

                                if ($this.hasClass('enter')) {
                                    character = '\n';
                                }

                                // Add the character
                                $('.hangulField').val($('.hangulField').val() + character.replace(/&amp;/, '&').replace(/&lt;/, '<').replace(/&gt;/, '>'));
                                $('.hangulField').val(Hangul.a($('.hangulField').val()));
                            });
                            break;

                        case 'pwdField':

                            if (options._isRandom) {
                                generatedHTML = _writeHTML('number', _randomLayout('number', options._numpads));
                            }
                            else {
                                generatedHTML = _writeHTML('number', options._numpads);
                            }

                            // if keyboard is already opened, close present keyboard.
                            if (($keyboard.children().length) === 0) {
                                // attach keyboard to upper side form
                                if (event.clientY < (window.innerHeight * 0.7) && (window.innerHeight > 500)) {
                                    $keyboard.append(generatedHTML);
                                    $keyboard.css('top', window.innerHeight - $keyboard.height());
                                }
                                // attach keyboard to down side form
                                else {
                                    $keyboard.append(generatedHTML);
                                    document.body.scrollTop = $keyboard.height();
                                    $keyboard.css('top', window.innerHeight - $keyboard.height());
                                }
                            }
                            else {
                                $keyboard.css('top', window.innerHeight);
                                document.body.scrollTop -= $keyboard.height();
                                $keyboard.html('');
                            }

                            // Sense keyboard li's contents
                            $('.number').on('click', function () {

                                var $this = $(this);
                                var character = this.innerText;

                                if ($this.hasClass('del')) {
                                    var text = $('.pwdField').val();
                                    $('.pwdField').val(text.substr(0, text.length - 1));
                                    return '';
                                }
                                if ($this.hasClass('reset')){
                                    var text = $('.pwdField').val();
                                    $('.pwdField').val(text.substr(text.length));
                                    return '';
                                }

                                if ($this.hasClass('enter')) {
                                    character = '\n';
                                }

                                if ($this.hasClass('close')) {
                                    $('.keyboard').empty();
                                    return '';
                                }

                                // Add the character
                                $('.pwdField').val($('.pwdField').val() + character);
                            });
                            break;
                    }
                });
            }
            return 'keyboard initialized [ shuffle : ' + options._isRandom + ' ]';
        },

        //
        //  public methods
        //
        //  detach()
        //  if you want remove keyboard, you can call this method
        //

        detach: function () {
            $('.keyboard').remove();
        }
    };

    var _composeHangul = function (inputArray) {

        var context = '';

        var offset = 0xAC00;

        var choSung = [
            'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ',
            'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ',
            'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
        ];  // 19

        var jungSung = [
            'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ',
            'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', ['ㅗ', 'ㅏ'], ['ㅗ', 'ㅐ'],
            ['ㅗ', 'ㅣ'], 'ㅛ', 'ㅜ', ['ㅜ', 'ㅓ'], ['ㅜ', 'ㅔ'], ['ㅜ', 'ㅣ'],
            'ㅠ', 'ㅡ', ['ㅡ', 'ㅣ'], 'ㅣ'
        ];  // 21

        var jongSung = [
            '', 'ㄱ', 'ㄲ', ['ㄱ', 'ㅅ'], 'ㄴ', ['ㄴ', 'ㅈ'], ['ㄴ', 'ㅎ'], 'ㄷ', 'ㄹ',
            ['ㄹ', 'ㄱ'], ['ㄹ', 'ㅁ'], ['ㄹ', 'ㅂ'], ['ㄹ', 'ㅅ'], ['ㄹ', 'ㅌ'], ['ㄹ', 'ㅍ'], ['ㄹ', 'ㅎ'], 'ㅁ',
            'ㅂ', ['ㅂ', 'ㅅ'], 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
        ];  // 28

        var consonant = [
            'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄸ',
            'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ',
            'ㅁ', 'ㅂ', 'ㅃ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ',
            'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
        ];
        // input이 종성이다

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
    //  changedKeyset : randomized keypad array
    //

    var _randomLayout = function (keyboardType, layout) {

        var changedKeyset = JSON.parse(JSON.stringify(layout));
        var temp;
        var rNum;
        var rNum2;

        (function () {
            changedKeyset.forEach(function (lineItem, lineIdx) {
                rNum2 = Math.floor(Math.random() * lineIdx);
                lineItem.forEach(function (ary, index) {

                    rNum = Math.floor(Math.random() * index);

                    while(rNum > (lineItem.length - 2)){
                        rNum = Math.floor(Math.random() * (index));
                    }

                    if(index !== lineItem.length - 1) {
                        temp = lineItem[index];

                        switch (keyboardType) {

                            case 'number':

                                lineItem[index] = changedKeyset[rNum2][rNum];
                                changedKeyset[rNum2][rNum] = temp;
                                break;

                            default:

                                lineItem[index] = lineItem[rNum];
                                lineItem[rNum] = temp;
                        }
                    }
                });
            });
        })();
        console.log(changedKeyset);
        return changedKeyset;
    };

    //
    //    _writeHTML = function (keyboardType, layout)
    //
    //    Read keypad array's data and translate them to html tags
    //
    //    @parameter
    //
    //    keyboardType(String) : number(only numbers) ,
    //                           letter(only characters) ,
    //                           symbol(basic qwerty layout)
    //
    //    layout(Object)       : keyboard layout array object
    //
    //    @return
    //    html : html tags derived from keyboard which is selected from parameter
    //

    var _writeHTML = function (keyboardType, layout) {

        var html = '';

        (function () {
            layout.forEach(function (lineItem, lineNum) {       // line

                html += '<div class="line' + (lineNum + 1) + '">';

                lineItem.forEach(function (ary) {               // item array

                    html += '<span class="'+ keyboardType;

                    ary.forEach(function(item, idx){            // current item
                        switch (item){

                            case '\u232B':
                                html += ' del lastitem">' + item;
                                break;

                            case '\uD83C\uDF10':
                                html += ' local lastitem">' + item;
                                break;

                            case 'ENTER':
                                html += ' enter lastitem">' + item;
                                break;

                            case 'TAB':
                                html += ' tab lastitem">' + item;
                                break;

                            case 'SHIFT':
                                html += ' shift lastitem">' + item;
                                break;

                            case 'RESET':
                                html += ' reset lastitem">' + item;
                                break;

                            case 'CLOSE':
                                html += ' close lastitem">' + item;
                                break;

                            case 'SPACE':
                                html += ' space">' + item;
                                break;

                            case '':
                                html += ' null">' + item;
                                break;

                            default:

                                if (ary.length === 1){
                                    html += '">' + item + '</span>';
                                }

                                if (ary.length === 2){

                                    if(idx === 0) {
                                        html += '">' +
                                            '<span class="others"><span class="lower">' + item + '</span>';
                                    }

                                    else {
                                        html += '<span class="upper">' + item + '</span></span></span>';
                                    }
                                }
                                else {

                                    if(ary.length === 3){

                                        if(idx === 0){
                                            html += ' k">' +
                                                '<span class="en"><span class="lower">' + item + '</span>';
                                        }
                                        else if(idx === 1){
                                            html += '<span class="upper">' + item + '</span></span>';
                                        }
                                        else{
                                            html += '<span class="kr">' + item + '</span></span>';
                                        }
                                    }

                                    if(ary.length === 4){
                                        if(idx === 0){
                                            html += ' k">' +
                                                '<span class="en"><span class="lower">' + item + '</span>';
                                        }
                                        else if(idx === 1){
                                            html += '<span class="upper">' + item + '</span></span>';
                                        }
                                        else if(idx === 2){
                                            html += '<span class="kr"><span class="lower">' + item + '</span>';
                                        }
                                        else{
                                            html += '<span class="upper">' + item + '</span></span></span>';
                                        }
                                    }
                                }
                        }
                    });
                    html += '</span>';
                });
                html += '</div>';
            });
        })();
        return html;
    };

})(jQuery);
