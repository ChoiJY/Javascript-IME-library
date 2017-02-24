[![Build Status](https://travis-ci.org/ChoiJY/2016-2017_m2soft.svg?branch=master)](https://travis-ci.org/ChoiJY/2016-2017_m2soft)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.svg)](http://gruntjs.com/)

# 자바스크립트 가상 보안 키보드

   Virtual keypad implemented by JavaScript, jQuery

   <br>

## 명세

   웹 페이지 상에서 키보드를 대체하여 문자를 입력할 수 있는 여러 종류의 입력기 구현
   
   <br>
   
## 사용법

1. setup
          
         <link rel="stylesheet" type="text/css" href="style.css"/>
         <script src="http://code.jquery.com/jquery-latest.min.js"></script>
         <script type='text/javascript' src="hangul.js"></script>
         <script type='text/javascript' src="jquery.secureKeyboard.js"></script>
         <script type='text/javascript' src="crypto.js"></script>

   keyboard를 사용할 html 페이지에 위의 스크립트를 추가합니다.
   
   <br>
   
2. initialization
   
          $(...).SVkeyboard.init(userOptions)
          $.SVkeyboard.init(userOptions)
   
 userOptions(Object)  
 아래의 옵션들을 변경하여 keyboard의 설정을 바꿀 수 있습니다. 변경하지 않거나 없는 옵션을 넣을 시에는 default 옵션으로 초기화됩니다.
 
 > secure(Boolean) : true시 보안 키보드 기능 활성화 (자판 배열이 임의로 변경됨), 기본 option은 false  
 >
 > 
 >
 > _secureKey(String) : 32bit의 임의의 string을 이용하여 입력값이 암호화, 복호화  
 > secure(Boolean) : true시 보안 키보드 기능 활성화 (자판 배열이 임의로 변경됨), 기본 option은 false
 >  
 > encrypt(Boolean) : true시 입력한 데이터를 AES를 이용해 암호화, 복호화해서 처리  
 >
 > _secureKey(String) : 32bit의 임의의 string을 이용하여 입력값이 암호화, 복호화  
 >
 > ex) $.svk.init({secure:true, _secureKey:'abcdefghijklmnopqrstuvwxyz123456'});  
   
   
3. terminalation
   
   
            $(...).SVkeyboard.detach()
            $.SVkeyboard.detach()
          
   위의 명령어들을 입력하여 현재 문서에서 제거 가능하다.
   
   <br>
   
4. aliasing
   
            $.svk.init() === $.SVkeyboard.init()
            $.svk.detach() === $.SVkeyboard.detach()
   모든 명령어들의 namespace는 위와 같이 줄여 사용 가능하다.
   
   <br>
        
## 데모 페이지
현재 진행중인 프로젝트는 아래의 페이지에서 확인할 수 있습니다

https://m2soft.herokuapp.com

