$(function () {
    //     $(".headerBox nav").on("click", "a", function (e) {
    //         e.preventDefault();
    //         window.location.href = "../html/listpage.html"
    //     })



    //向数据库发请求  获取数据
    $.ajax({
        url: "/selectcart",
        dataType: "json",
        success: function (res) {
            $(".cartBuy .numBox").text(res.length);
        }
    })



})