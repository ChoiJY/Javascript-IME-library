
# 자바스크립트 가상 보안 키보드

Virtual keypad implemented by javascript & jquery

# 명세

html form에서 입력 시의 요구사항에 따라서 동적으로 생성되는 키보드 구현

# 사용법

초기화
$(...).SVkeyboard.init(userOptions)
$.SVkeyboard.init(userOptions)

userOptions(Object)
_isRandom(boolean) : 기본 설정은 false로 되어 있으며, 초기화 시 {_isRandom:true}로 초기화 할 경우에 키보드의 배열이 랜덤하게 바뀌어 출력된다.


제거
$(...).SVkeyboard.detach()
$.SVkeyboard.detach()


# 진행중인 이슈
 
1. optimizing this file with many design pattern

# 완료된 이슈

1. make responsive view to several platforms (ex. phone, tablet, pc...)

2. keypad's basic function implementation

3. make this files to library for easily use
