$(function () {


    //图形验证码
    var imgCode = "";
    let captcha1 = new Captcha({
        fontSize: 80,
        fontStyle: 'fill', //fill  stroke
    });
    captcha1.draw(document.querySelector('#captcha1'), r => {
        imgCode = r;
    });
    $(".codeBox canvas").click(function () {
        captcha1.draw(document.querySelector('#captcha1'), r => {
            imgCode = r;
        });
    })



    //是否开启自动登录功能
    var cookieFlag = false;
    $("#cookie-flag").click(function () {
        cookieFlag = $(this).prop("checked");
    })



    $(".loginBtn").click(function () {
        let usernameText = $(".form-list .username").val();
        let passwordText = $(".form-list .password").val();
        let imgCodeNum = $(".codeBox .inputCode").val();



        if (imgCode.toLowerCase() == imgCodeNum.toLowerCase()) {
            sendAjax(usernameText, passwordText);
            /*  
            $.ajax({
                    type: "post",
                    url: "/login",
                    dataType: "json",
                    data: {
                        username: usernameText,
                        password: passwordText
                    },
                    success: function (res) {
                        if (res.status == 1) {
                            //点击登录按钮，判断是否免登录
                            if (cookieFlag) {
                                Cookie.setCookie("username", usernameText, 7);
                                Cookie.setCookie("password", passwordText, 7);
                            } else {
                                Cookie.removeCookie("username");
                                Cookie.removeCookie("password");
                            }
                            confirm("登录成功");
                            window.location.href = "./index.html"
                        } else {
                            alert("用户名或密码错误");
                        }
                    }
                })*/
        } else {
            alert("验证码有误")

        }
    })


    //封装一下 ajax请求
    function sendAjax(usernameText, passwordText) {
        $.ajax({
            type: "post",
            url: "/login",
            dataType: "json",
            data: {
                username: usernameText,
                password: passwordText
            },
            success: function (res) {
                if (res.status == 1) {

                    //点击登录按钮，判断是否免登录
                    if (cookieFlag) {
                        Cookie.setCookie("username", usernameText, 7);
                        Cookie.setCookie("password", passwordText, 7);
                    } else {
                        //不需要免登录 ， 当前就用  sessionLocalStorage
                        window.sessionStorage.setItem("username", usernameText);
                        window.sessionStorage.setItem("password", passwordText)
                    }
                    // confirm("登录成功");
                    window.location.href = "./index.html"
                } else {
                    alert("用户名或密码错误");
                }
            }
        })
    }



})


