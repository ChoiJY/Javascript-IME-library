
# 자바스크립트 가상 보안 키보드

   Virtual keypad implemented by javascript, jquery

## 명세

   웹 페이지 상에서 키보드를 대체하여 문자를 입력할 수 있는 여러 종류의 입력기 구현
   <br>
   
## 사용법


   1. setup

            <script type="text/javascript" src="node_modules/jquery/dist/jquery.js"></script>
            <script type='text/javascript' src="hangul.js"></script>
            <script type='text/javascript' src="jquery.secureKeyboard.js"></script>
            <br>
   
   2. initialization
   
            $(...).SVkeyboard.init(userOptions)
            $.SVkeyboard.init(userOptions)
   
   userOptions를 {_isRandom:true}로 초기화 할 경우에 키보드의 배열이 랜덤하게 바뀌어 출력된다.
   
   <br>
   
   3. terminalation
   
            $(...).SVkeyboard.detach()
            $.SVkeyboard.detach()
        
   위의 명령어들을 입력하여 현재 문서에서 제거 가능하다.
   
   <br>
   
   4. 별칭
   
            $.svk.init()
            $.SVkeyboard.init()
    
   모든 명령어들은 위와 같이 줄여 사용 가능하다.
        
## 데모 페이지
현재 진행중인 프로젝트는 아래의 페이지에서 확인할 수 있습니다

https://m2soft.herokuapp.com

