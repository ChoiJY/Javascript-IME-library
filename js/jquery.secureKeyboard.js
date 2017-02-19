/**
 * Created by jychoi on 2017. 1. 5.
 *
 **/

(function ($) {

    'use strict';

    $.fn.SVkeyboard = $.SVkeyboard = $.svk = {  // namespace define & to easy use alias define

        //  default options stored object
        //  To protect default option data from abusing
        _defaults: function () {

            var _isRandom = false,
                _numpads = [
                    [['1'], ['2'], ['3'], ['\u232B']],
                    [['4'], ['5'], ['6'], ['ENTER']],
                    [['7'], ['8'], ['9'], ['RESET']],
                    [[''], ['0'], [''], ['CLOSE']]
                ],
                _alphabets = [
                    [['q'], ['w'], ['e'], ['r'], ['t'], ['y'], ['u'], ['i'], ['o'], ['p'], [''], ['\u232B']],
                    [[''], ['a'], ['s'], ['d'], ['f'], ['g'], ['h'], ['j'], ['k'], ['l'], [''], ['ENTER']],
                    [[''], [''], ['z'], ['x'], ['c'], ['v'], ['b'], ['n'], ['m'], [''], [''], ['SHIFT']],
                    [['SPACE'], ['\uD83C\uDF10']]
                ],
                _qwerty = [
                    [['`', '~'], ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], [''], ['\u232B']],
                    [['q', 'Q', 'ㅂ', 'ㅃ'], ['w', 'W', 'ㅈ', 'ㅉ'], ['e', 'E', 'ㄷ', 'ㄸ'], ['r', 'R', 'ㄱ', 'ㄲ'], ['t', 'T', 'ㅅ', 'ㅆ'], ['y', 'Y', 'ㅛ'], ['u', 'U', 'ㅕ'], ['i', 'I', 'ㅑ'], ['o', 'O', 'ㅐ', 'ㅒ'], ['p', 'P', 'ㅔ', 'ㅖ'], ['[', '{'], [']', '}'], ['\\', '|'], [''], ['TAB']],
                    [[''], ['a', 'A', 'ㅁ'], ['s', 'S', 'ㄴ'], ['d', 'D', 'ㅇ'], ['f', 'F', 'ㄹ'], ['g', 'G', 'ㅎ'], ['h', 'H', 'ㅗ'], ['j', 'J', 'ㅓ'], ['k', 'K', 'ㅏ'], ['l', 'L', 'ㅣ'], [';', ':'], ['\'', '"'], [''], [''], ['ENTER']],
                    [[''], [''], ['z', 'Z', 'ㅋ'], ['x', 'X', 'ㅌ'], ['c', 'C', 'ㅊ'], ['v', 'V', 'ㅍ'], ['b', 'B', 'ㅠ'], ['n', 'N', 'ㅜ'], ['m', 'M', 'ㅡ'], [',', '<'], ['.', '>'], ['/', '?'], [''], [''], ['SHIFT']],
                    [['SPACE'], ['\uD83C\uDF10']]
                ],
                _simpleQwerty = [
                    [['q', 'Q', 'ㅂ', 'ㅃ'], ['w', 'W', 'ㅈ', 'ㅉ'], ['e', 'E', 'ㄷ', 'ㄸ'], ['r', 'R', 'ㄱ', 'ㄲ'], ['t', 'T', 'ㅅ', 'ㅆ'], ['y', 'Y', 'ㅛ'], ['u', 'U', 'ㅕ'], ['i', 'I', 'ㅑ'], ['o', 'O', 'ㅐ', 'ㅒ'], ['p', 'P', 'ㅔ', 'ㅖ'], [''], ['\u232B']],
                    [[''], ['a', 'A', 'ㅁ'], ['s', 'S', 'ㄴ'], ['d', 'D', 'ㅇ'], ['f', 'F', 'ㄹ'], ['g', 'G', 'ㅎ'], ['h', 'H', 'ㅗ'], ['j', 'J', 'ㅓ'], ['k', 'K', 'ㅏ'], ['l', 'L', 'ㅣ'], [''], ['ENTER']],
                    [[''], [''], ['z', 'Z', 'ㅋ'], ['x', 'X', 'ㅌ'], ['c', 'C', 'ㅊ'], ['v', 'V', 'ㅍ'], ['b', 'B', 'ㅠ'], ['n', 'N', 'ㅜ'], ['m', 'M', 'ㅡ'], [''], [''], ['SHIFT']],
                    [['SPACE'], ['\uD83C\uDF10']]
                ],
                options = {
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
        //  randomOption(Object) : if user want to change options (ex. randomized keypad layout)
        //                         you write parameters that want to change
        //
        //  @return
        //  (String) : current keyboard initialized option

        init: function (randomOption) {

            // user options and default options are merged, by this line.
            var options = $.extend({}, this._defaults(), randomOption);
            var $body = $('body');
            if (document.getElementsByClassName('keyboard').length === 0) {

                $body.append('<div class="keyboard"></div>');
                var generatedHTML;
                var $keyboard = $('.keyboard');             //  caching multiple use function

                $body.on('click', function (event) {
                    //console.log(event.target.parentNode)
                    switch (event.target.className) {
                        case 'nameField':

                            $('.nameField').blur();     // mobile keypad not exist
                            if (options._isRandom) {
                                generatedHTML = _writeHTML('letter', _randomLayout('letter', options._alphabets));
                            }

                            else {
                                generatedHTML = _writeHTML('letter', options._alphabets);
                            }

                            if (($keyboard.children().length) === 0) {
                                // 폼 아래에 충분한 공간이 있을 경우에는 그냥 하단에 키보드를 생성
                                if ((window.innerHeight - event.clientY) > 300) {
                                    $keyboard.append(generatedHTML);
                                    $keyboard.css('top', window.innerHeight - $keyboard.height());
                                }
                                // 폼 아래에 충분한 공간이 없을 경우에는 키보드 만큼 스크롤을 내리고, 하단에 키보드를 생성시킨다.
                                else {
                                    console.log((window.innerHeight - event.clientY))
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

                                var $this = $(this),
                                    text = '',
                                    $screen = $(event.target),
                                    character = this.innerText;

                                if ($this.hasClass('shift')) {
                                    $('.letter > span > span').toggleClass('upper');
                                    return '';
                                }

                                if ($this.hasClass('local')) {
                                    $('.letter > span').toggleClass('kr');
                                    return '';
                                }

                                if ($this.hasClass('del')) {
                                    text = $screen.val();
                                    $screen.val(text.substr(0, text.length - 1));
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
                                $screen.val($screen.val() + character);
                                //$('.nameField').val(_composeHangul($('.nameField').val()));
                                //$screen.val(Hangul.a($screen.val()));
                                $screen.val(_composeHangul($screen.val()));
                            });
                            break;

                        case 'hangulField':

                            $('.hangulField').blur();     // mobile keypad not exist
                            if (options._isRandom) {
                                generatedHTML = _writeHTML('symbol', _randomLayout('symbol', options._hangul));
                            }
                            else {
                                generatedHTML = _writeHTML('symbol', options._hangul);
                            }

                            // 기존에 키보드가 없는 경우
                            if (($keyboard.children().length) === 0) {
                                // 폼 아래에 충분한 공간이 있을 경우에는 그냥 하단에 키보드를 생성

                                if ((window.innerHeight - event.clientY) > 400) {
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

                                var $this = $(this),
                                    $screen = $(event.target),
                                    text,
                                    character = this.innerText;

                                if ($this.hasClass('shift')) {
                                    $('.symbol > span > span').toggleClass('upper');
                                    return '';
                                }

                                if ($this.hasClass('local')) {
                                    $('.k > span').toggleClass('kr');
                                    return '';
                                }

                                if ($this.hasClass('del')) {
                                    text = $screen.val();
                                    $screen.val(text.substr(0, text.length - 1));
                                    return '';
                                }

                                if ($this.hasClass('space')) {
                                    character = ' ';
                                }

                                if ($this.hasClass('enter')) {
                                    character = '\n';
                                }

                                // Add the character
                                $screen.val($screen.val() + character);
                                $screen.val(Hangul.assemble($screen.val()));
                            });
                            break;

                        case 'pwdField':

                            $('.pwdField').blur();     // mobile keypad not exist

                            if (options._isRandom) {
                                generatedHTML = _writeHTML('number', _randomLayout('number', options._numpads));
                            }
                            else {
                                generatedHTML = _writeHTML('number', options._numpads);
                            }

                            // if keyboard is already opened, close present keyboard.
                            if (($keyboard.children().length) === 0) {
                                // attach keyboard to upper side form
                                // 남은 공간이 좌항의
                                if ((window.innerHeight - event.clientY) > 300) {
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

                                var $this = $(this),
                                    text,
                                    $screen = $(event.target),
                                    character = this.innerText;

                                if ($this.hasClass('del')) {
                                    text = $screen.val();
                                    $screen.val(text.substr(0, text.length - 1));
                                    return '';
                                }
                                if ($this.hasClass('reset')) {
                                    text = $screen.val();
                                    $screen.val(text.substr(text.length));
                                    return '';
                                }

                                if ($this.hasClass('enter')) {
                                    character = '\n';
                                }

                                if ($this.hasClass('close')) {
                                    $keyboard.empty();
                                    return '';
                                }

                                // Add the character
                                $screen.val($screen.val() + character);
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

    // 한글 자,모 합성
    // @param
    // input(String) -> user's input inserted by virtual keyboard
    // @return
    // result(String) ->

    var _composeHangul = function (input) {

        var offset = 0xAC00;

        var choSung = [
                'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
                'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ',
                'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ',
                'ㅍ', 'ㅎ'
            ],
            jungSung = [
                'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ',
                'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ',
                'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ',
                'ㅡ', 'ㅢ', 'ㅣ'
            ],
            jongSung = [
                '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
                'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
                'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
                'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
            ],
            consonants = [
                'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄸ',
                'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ',
                'ㅁ', 'ㅂ', 'ㅃ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ',
                'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
            ],
            _composedVowel = {
                ㅗㅏ: 'ㅘ',
                ㅗㅐ: 'ㅙ',
                ㅗㅣ: 'ㅚ',
                ㅜㅝ: 'ㅝ',
                ㅜㅔ: 'ㅞ',
                ㅜㅣ: 'ㅟ',
                ㅡㅣ: 'ㅢ'
            },
            _composedConsonant = {
                ㄱㅅ: 'ㄳ',
                ㄴㅈ: 'ㄵ',
                ㄴㅎ: 'ㄶ',
                ㄹㄱ: 'ㄺ',
                ㄹㅁ: 'ㄻ',
                ㄹㅂ: 'ㄼ',
                ㄹㅅ: 'ㄽ',
                ㄹㅌ: 'ㄾ',
                ㄹㅍ: 'ㄿ',
                ㄹㅎ: 'ㅀ',
                ㅂㅅ: 'ㅄ',
                ㅅㅅ: 'ㅆ'
            };

        function _completeHangul(unicode) {             // 가 ~ 힣
            return 0xAC00 <= unicode && unicode <= 0xd7a3;
        }

        function _isConsonant(inputChar) {
            var num = $.inArray(inputChar, consonants);
            if (num >= 0) {
                return num;
            }
            else {
                return -1;
            }
        }

        function _isCho(inputChar) {
            var num = $.inArray(inputChar, choSung);
            if (num >= 0) {
                return num;
            }
            else {
                return -1;
            }
        }

        function _isJung(inputChar) {
            var num = $.inArray(inputChar, jungSung);
            if (num >= 0) {
                return num;
            }
            else {
                return -1;
            }
        }

        function _isJong(inputChar) {
            var num = $.inArray(inputChar, jongSung);
            if (num >= 0) {
                return num;
            }
            else {
                return -1;
            }
        }

        function _isComposeVowel(first, second) {
            return _composedVowel[first + second] ? _composedVowel[first + second] : false;
        }

        function _isComposeConsonant(first, second) {
            return _composedConsonant[first + second] ? _composedConsonant[first + second] : false;
        }

        function _disassemble(input) {

            var result = [],
                temp,
                cho,
                jung,
                jong;

            // input string 길이만큼 loop
            for (var i = 0; i < input.length; i += 1) {

                temp = input[i].charCodeAt(0);
                // 완전한 한글 문자인 경우
                if (_completeHangul(temp)) {
                    temp -= offset;   // 인덱스의 문자 -'가'
                    jong = temp % 28;                         // 종성의 인덱스
                    jung = (temp - jong) / 28 % 21;           // 중성의 인덱스
                    cho = Math.floor((temp - jong) / 28 / 21);              // 초성의 인덱스
                    result.push(choSung[cho]);                // 해당 초성 배열을 넣음
                    switch (jungSung[jung]) {                  // 이중모음 / 단모음
                        case 'ㅘ':
                            result.push('ㅗ');
                            result.push('ㅏ');
                            break;
                        case 'ㅙ':
                            result.push('ㅗ');
                            result.push('ㅐ');
                            break;
                        case 'ㅚ':
                            result.push('ㅗ');
                            result.push('l');
                            break;
                        case 'ㅝ':
                            result.push('ㅜ');
                            result.push('ㅓ');
                            break;
                        case 'ㅞ':
                            result.push('ㅜ');
                            result.push('ㅔ');
                            break;
                        case 'ㅟ':
                            result.push('ㅜ');
                            result.push('ㅣ');
                            break;
                        case 'ㅢ':
                            result.push('ㅡ');
                            result.push('ㅣ');
                            break;
                        default:
                            result.push(jungSung[jung]);
                    }

                    if (jong > 0) {                               // 종성이 있는 경우

                        switch (jongSung[jong]) {
                            case 'ㄳ':
                                result.push('ㄱ');
                                result.push('ㅅ');
                                break;
                            case 'ㄵ':
                                result.push('ㄴ');
                                result.push('ㅈ');
                                break;
                            case 'ㄶ':
                                result.push('ㄴ');
                                result.push('ㅎ');
                                break;
                            case 'ㄺ':
                                result.push('ㄹ');
                                result.push('ㄱ');
                                break;
                            case 'ㄻ':
                                result.push('ㄹ');
                                result.push('ㅁ');
                                break;
                            case 'ㄼ':
                                result.push('ㄹ');
                                result.push('ㅂ');
                                break;
                            case 'ㄽ':
                                result.push('ㄹ');
                                result.push('ㅅ');
                                break;
                            case 'ㄾ':
                                result.push('ㄹ');
                                result.push('ㅌ');
                                break;
                            case 'ㄿ':
                                result.push('ㄹ');
                                result.push('ㅍ');
                                break;
                            case 'ㅀ':
                                result.push('ㄹ');
                                result.push('ㅎ');
                                break;
                            case 'ㅄ':
                                result.push('ㅂ');
                                result.push('ㅅ');
                                break;
                            default:
                                result.push(jongSung[jong]);
                        }

                    }
                }
                // 해당 인덱스의 내용이 자음만 있을 경우
                else if (_isConsonant(input[i]) >= 0) {
                    switch (input[i]) {
                        case 'ㄳ':
                            result.push('ㄱ');
                            result.push('ㅅ');
                            break;
                        case 'ㄵ':
                            result.push('ㄴ');
                            result.push('ㅈ');
                            break;
                        case 'ㄶ':
                            result.push('ㄴ');
                            result.push('ㅎ');
                            break;
                        case 'ㄺ':
                            result.push('ㄹ');
                            result.push('ㄱ');
                            break;
                        case 'ㄻ':
                            result.push('ㄹ');
                            result.push('ㅁ');
                            break;
                        case 'ㄼ':
                            result.push('ㄹ');
                            result.push('ㅂ');
                            break;
                        case 'ㄽ':
                            result.push('ㄹ');
                            result.push('ㅅ');
                            break;
                        case 'ㄾ':
                            result.push('ㄹ');
                            result.push('ㅌ');
                            break;
                        case 'ㄿ':
                            result.push('ㄹ');
                            result.push('ㅍ');
                            break;
                        case 'ㅀ':
                            result.push('ㄹ');
                            result.push('ㅎ');
                            break;
                        case 'ㅄ':
                            result.push('ㅂ');
                            result.push('ㅅ');
                            break;
                        default:
                            result.push(input[i]);

                    }
                }
                // 모음이거나 다른 문자일 경우는 그냥 한 문자 처리한다.
                else {
                    if (_isJung(input[i]) >= 0) {
                        switch (input[i]) {                  // 이중모음 / 단모음
                            case 'ㅘ':
                                result.push('ㅗ');
                                result.push('ㅏ');
                                break;
                            case 'ㅙ':
                                result.push('ㅗ');
                                result.push('ㅐ');
                                break;
                            case 'ㅚ':
                                result.push('ㅗ');
                                result.push('l');
                                break;
                            case 'ㅝ':
                                result.push('ㅜ');
                                result.push('ㅓ');
                                break;
                            case 'ㅞ':
                                result.push('ㅜ');
                                result.push('ㅔ');
                                break;
                            case 'ㅟ':
                                result.push('ㅜ');
                                result.push('ㅣ');
                                break;
                            case 'ㅢ':
                                result.push('ㅡ');
                                result.push('ㅣ');
                                break;
                            default:
                                result.push(input[i]);
                        }
                    }
                    else {
                        result.push(input[i]);
                    }
                }
            }
            result = result.join('');
            return result;
        }

        function _makeHangul(index){ // complete_index + 1부터 index까지를 greedy하게 한글로 만든다.
            var code,
                cho,
                jung1,
                jung2,
                jong1 = 0,
                jong2,
                hangul = ''
                ;
            if (complete_index + 1 > index) {
                return;
            }
            for (var step = 1; ; step++) {
                if (step === 1) {
                    cho = array[complete_index + step].charCodeAt(0);
                    if (_isJung(cho)) { // 첫번째 것이 모음이면 1) ㅏ같은 경우이거나 2) ㅙ같은 경우이다
                        if (complete_index + step + 1 <= index && _isJung(jung1 = array[complete_index + step + 1].charCodeAt(0))) { //다음것이 있고 모음이면
                            result.push(String.fromCharCode(_isJungJoinable(cho, jung1)));
                            complete_index = index;
                            return;
                        } else {
                            result.push(array[complete_index + step]);
                            complete_index = index;
                            return;
                        }
                    } else if (!_isCho(cho)) {
                        result.push(array[complete_index + step]);
                        complete_index = index;
                        return;
                    }
                    hangul = array[complete_index + step];
                } else if (step === 2) {
                    jung1 = array[complete_index + step].charCodeAt(0);
                    if (_isCho(jung1)) { //두번째 또 자음이 오면 ㄳ 에서 ㅅ같은 경우이다
                        cho = _isJongJoinable(cho, jung1);
                        hangul = String.fromCharCode(cho);
                        result.push(hangul);
                        complete_index = index;
                        return;
                    } else {
                        hangul = String.fromCharCode((CHO_HASH[cho] * 21 + JUNG_HASH[jung1]) * 28 + HANGUL_OFFSET);
                    }
                } else if (step === 3) {
                    jung2 = array[complete_index + step].charCodeAt(0);
                    if (_isJungJoinable(jung1, jung2)) {
                        jung1 = _isJungJoinable(jung1, jung2);
                    } else {
                        jong1 = jung2;
                    }
                    hangul = String.fromCharCode((CHO_HASH[cho] * 21 + JUNG_HASH[jung1]) * 28 + JONG_HASH[jong1] + HANGUL_OFFSET);
                } else if (step === 4) {
                    jong2 = array[complete_index + step].charCodeAt(0);
                    if (_isJongJoinable(jong1, jong2)) {
                        jong1 = _isJongJoinable(jong1, jong2);
                    } else {
                        jong1 = jong2;
                    }
                    hangul = String.fromCharCode((CHO_HASH[cho] * 21 + JUNG_HASH[jung1]) * 28 + JONG_HASH[jong1] + HANGUL_OFFSET);
                } else if (step === 5) {
                    jong2 = array[complete_index + step].charCodeAt(0);
                    jong1 = _isJongJoinable(jong1, jong2);
                    hangul = String.fromCharCode((CHO_HASH[cho] * 21 + JUNG_HASH[jung1]) * 28 + JONG_HASH[jong1] + HANGUL_OFFSET);
                }

                if (complete_index + step >= index) {
                    result.push(hangul);
                    complete_index = index;
                    return;
                }
            }
        }

        var result = [],
            length = input.length,
            code,
            stage = 0,
            complete_index = -1, //완성된 곳의 인덱스
            previous_code;

        for (var i = 0; i < length; i++) {

            code = input[i];

            if (_isCho(code) < 0 && _isJung(code) < 0 && _isJong(code) < 0) {
                _makeHangul(i - 1);                 // 현재 문자가 한글이 아니기 떄문에 이전 문자까지 한글 자모 합성
                _makeHangul(i);
                stage = 0;
                continue;
            }

            if (stage === 0) {                      // 현재 문자가 초성인지 아닌 지 판단
                if (_isCho(code) >= 0) {            // 초성이 오면 아무 문제 없다.
                    stage = 1;                      // 다음 문자가 중성인지 판단
                } else if (_isJung(code)) {
                    // 중성이오면 합성모음 판단하는 케이스로
                    stage = 4;
                }
            }

            else if (stage === 1) {               // 현재 문자가 중성인지 아닌 지 판단
                if (_isJung(code) >= 0) {           // 중성이 온 경우
                    stage = 2;
                } else {                            // 합성자음 여부 판단
                    if (_isComposeConsonant(previous_code, code)) {
                                                    // 합성자음이라고 해도 다음에 자음이 나오면 분리되어야 하므로 판단 필요
                        stage = 5;
                    } else {                        // 합성이 불가능한 자음이 온 경우에는 입력 전 까지의 문자를 합성하고 여전히 중성이 올 차례
                        _makeHangul(i - 1);
                    }
                }
            }

            else if (stage === 2) {               // 현재 문자가 종성인지 아닌 지 판단
                if (_isJong(code) >= 0) {           // 종성이 왔다면 다음 문자는 자,모음 이 와야함
                    stage = 3;
                } else if (_isJung(code) >= 0) {    // 모음이 오면 앞의 모음과 합칠 수 있는지 본다.
                    if (_isComposeVowel(previous_code, code)) { //합칠 수 있으면 여전히 종성이 올 차례고 그대로 진행
                    } else {                        // 합칠 수 없다면 오타가 생긴 경우  ex)'라ㅏ'
                        _makeHangul(i - 1);
                        stage = 4;                  // 오타의 경우에는 이전 글자까지 합성하고 다시 합성모음 판단하는 케이스로
                    }
                } else {                            // 종성이 되지 않는 자음이 온 경우에는 이전까지 완성하고 다시시작 ex) '아ㄸ'
                    _makeHangul(i - 1);
                    stage = 1;
                }
            }

            else if (stage === 3) {               // 종성이 하나 온 상태.
                if (_isCho(code) >= 0) {            // 또 자음이면 합칠수 있는지 본다. 키보드 입력으론 초성밖에 받을 수 없다
                    if (_isComposeConsonant(previous_code, code)) {} //합칠 수 있으면 계속 진행. 왜냐하면 이번에 온 자음이 다음 글자의 초성이 될 수도 있기 때문}
                    else {                        // 없으면 한글자 완성
                        _makeHangul(i - 1);
                        stage = 1;                  // 이 종성이 초성이 되고 중성부터 시작
                    }
                }
                else if (_isJung(code)>=0) {      // 모음이면 이전 종성은 이 중성과 합쳐지고 앞 글자는 받침이 없다.
                    _makeHangul(i - 2);
                    stage = 2;
                }
            }

            else if (stage === 4) { // 중성이 하나 온 상태
                if (_isJung(code)) { //중성이 온 경우
                    if (_isComposeVowel(previous_code, code)) { //이전 중성과 합쳐질 수 있는 경우
                        _makeHangul(i);
                        stage = 0;
                    } else { //중성이 왔지만 못합치는 경우. ㅒㅗ 같은
                        _makeHangul(i - 1);
                    }
                } else { // 아니면 자음이 온 경우.
                    _makeHangul(i - 1);
                    stage = 1;
                }
            }

            else if (stage === 5) { // 초성이 연속해서 두개 온 상태 ㄺ
                if (_isJung(code)) { //이번에 중성이면 ㄹ가
                    _makeHangul(i - 2);
                    stage = 2;
                } else {
                    _makeHangul(i - 1);
                    stage = 1;
                }
            }
            previous_code = code;
        }
        _makeHangul(i - 1);
        return result.join('');
    };

        /*
         input = _disassemble(input);
         // 합성모음의 경우에는 그냥 합쳐도 무방
         for (var i = 0; i < inputLength; i += 1) {
         current = input[i];     // 현재 문자
         previous = input[i - 1];
         previous2 = input[i - 2];

         if (_isJung(current) >= 0) {
         if (_isComposeVowel(previous, current)) {   // 합성모음
         temp.push(_isComposeVowel(previous, current));
         }
         }
         if (_isCho(current) >= 0) {
         if (_isJung(previous2) >= 0) {                  // 두개 전이 모음 '읅'
         if (_isComposeConsonant(previous, current)) { //합성자음인 경우
         temp.push(_isComposeConsonant(previous, current));
         }
         }
         else {

         }
         }
         }

         return temp.join('');
         */
        /*
         for (var i = 0; i < inputLength; i += 1) {

         current = input[i];     // 현재 문자
         previous = input[i - 1];
         previous2 = input[i - 2];
         if (_isCho(current) < 0 && _isJung(current) < 0 && _isJong(current) < 0) {  // 한글 문자가 아닌 경우
         result.push(current);
         }

         if (_isCho(current) >= 0) { // 현재 문자가 초성이 들어옴 ㄱ
         if (previous) {           // 처음 문자가 아닌 경우에

         // 이전 문자가 중성이니 현재 초성은 새 문자의 초성이 되든 기존 문자의 종성이 되든
         if (_isJung(previous) >= 0) {
         if (previous2) {
         if
         }
         }
         _isComposeConsonant(previous, current) ? result.push(_isComposeConsonant(previous, current)) : result.push(previous, current);
         }
         else {                  // 이전 문자가 없는 경우에는
         cho = current;      // 초성이다
         }

         }

         else if (_isJung(current) >= 0) {   // 현재 문자가 중성
         if (previous) {
         if (_isJung(previous) >= 0) {   // 이전 문자도 중성
         if(previous2){

         }
         result.push(previous);
         result.push(current);
         }
         }
         }

         }

         result = result.join('');
         return result;
         */
    /*
     for(var i=0; i<inputLength;i+=1){
     current = input[i];
     // 한글이 아닌 경우
     if (_isCho(current) < 0&& _isJung(current) < 0 && _isJong(current) < 0){
     _make(i-1);
     _make(i);
     stage = 0;  // 초성 판단이 가장 먼저
     continue;
     }
     if(stage === 0){    // 현재 커서가 초성인지
     if(_isCho(current)>=0){ // 초성인 경우
     stage = 1;  // 중성 판단으로
     }
     else if(_isJung(current) >=0){
     stage =4;   // 중성이 하나 온 경우
     }
     }
     else if(stage === 1){   // 현재 커서가 중성인지
     if(_isJung(current)>=0){    // 모음이 온 경우
     stage = 2;  // 종성 판단
     }
     else{   // 또 자음인 경우
     // 합성 가능한 자음인 경우
     if(_isComposeConsonant(previous, current)){
     stage =5; // 합성자음인 경우
     }else {
     _make(i-1); // 합성 불가능한 경우 전것까지 문자 합성
     }
     }
     }
     else if(stage === 2){   // 현재 커서가 종성인지
     if(_isJong(current)>=0){
     stage=3; // 종성 다음에 자음이든 모음이든 올 수 있음
     }
     else if(_isJung(current)>=0){
     _isComposeVowel(previous, current){

     }
     }
     }
     }

     function combineChar(cho, jung, jong) {
     var result;
     result = _charoffset + ($.inArray(cho, _choSung) * 21 * 28) + ($.inArray(jung, _jungSung) * 28) + $.inArray(jong, _jongSung);
     //console.log(result);
     result = String.fromCharCode(result);
     return result;
     }
     */


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

        var changedKeyset = JSON.parse(JSON.stringify(layout)),
            temp,
            rNum,
            rNum2;

        (function () {
            changedKeyset.forEach(function (lineItem, lineIdx) {

                rNum2 = Math.floor(Math.random() * lineIdx);

                lineItem.forEach(function (ary, index) {

                    rNum = Math.floor(Math.random() * index);

                    while (rNum > (lineItem.length - 2)) {
                        rNum = Math.floor(Math.random() * (index));
                    }

                    if (index !== lineItem.length - 1) {

                        temp = lineItem[index];

                        switch (keyboardType) {

                            case 'number':      // numpad는 random option 적용 시 모든 배치가 바뀌기 때문에

                                lineItem[index] = changedKeyset[rNum2][rNum];
                                changedKeyset[rNum2][rNum] = temp;
                                break;

                            default:            // 다른 키보드의 경우에는 키보드의 같은 라인만 랜덤 배치

                                lineItem[index] = lineItem[rNum];
                                lineItem[rNum] = temp;
                        }
                    }
                });
            });
        })();
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
            layout.forEach(function (lineItem, lineNum) {           // line

                html += '<div class="line' + (lineNum + 1) + '">';

                lineItem.forEach(function (ary) {                   // item array

                    html += '<span class="' + keyboardType;

                    ary.forEach(function (item, idx) {              // current item

                        switch (item) {

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

                                if (ary.length === 1) {             // numpad의 경우만 적용
                                    html += '">' + item + '</span>';
                                }

                                if (ary.length === 2) {             // 특수문자의 경우에 적용

                                    if (idx === 0) {
                                        html += '">' +
                                            '<span class="others"><span class="lower">' + item + '</span>';
                                    }

                                    else {
                                        html += '<span class="upper">' + item + '</span></span></span>';
                                    }
                                }
                                else {

                                    if (ary.length === 3) {         // 영어 대,소문자와 한글 문자 하나가 들어가는 경우

                                        if (idx === 0) {
                                            html += ' k">' +
                                                '<span class="en"><span class="lower">' + item + '</span>';
                                        }
                                        else if (idx === 1) {
                                            html += '<span class="upper">' + item + '</span></span>';
                                        }
                                        else {
                                            html += '<span class="kr">' + item + '</span></span>';
                                        }
                                    }

                                    if (ary.length === 4) {         // 영어 대,소문자와 한글 문자 두개가 들어가는 경우
                                        if (idx === 0) {
                                            html += ' k">' +
                                                '<span class="en"><span class="lower">' + item + '</span>';
                                        }
                                        else if (idx === 1) {
                                            html += '<span class="upper">' + item + '</span></span>';
                                        }
                                        else if (idx === 2) {
                                            html += '<span class="kr"><span class="lower">' + item + '</span>';
                                        }
                                        else {
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
