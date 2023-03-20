$(function () {
    $(".ico-roll-network").click(function () {
        $(".block-roll").toggleClass("open-is");
        return false;
    });
    $(".message-list, .chat-chat-icon").click(function () {
        $(".block-roll").removeClass("open-is");
        return false;
    });
});