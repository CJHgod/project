$(function () {
    $(".headerBox nav").on("click", "a", function (e) {
        e.preventDefault();
        window.location.href = "../html/listpage.html"
    })
})