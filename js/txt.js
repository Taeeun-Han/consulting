$(document).ready(function () {
    // 첫 번째 텍스트 요소의 높이를 가져옵니다.
    var textHeight = $("#container .animated-text:first").height();

    // 텍스트 높이를 애니메이션의 지속 시간으로 설정합니다.
    var animationDuration = textHeight / 80;  // 이 값을 조절하여 애니메이션 속도를 설정합니다.

    $(".animated-text").css("animation-duration", animationDuration + "s");
});