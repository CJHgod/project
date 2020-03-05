$(function () {


    //全局为input框添加个点击事件的样式
    $(".form-list input").click(function () {

        $(".form-list input").each(function (index, item) {
            $(item).removeClass("input-active");
        })
        //激活焦点，删除红色边框样式
        $(this).removeClass("input-error");

        $(this).addClass("input-active");
    })

    //用户名匹配
    let usernameReg = /^[\u4e00-\u9fa5_a-zA-Z0-9]{4,8}$/;
    let usernameFlag = false;

    $(".username").blur(function () {
        usernameFlag = usernameReg.test($(this).val());
        if ($(this).val()) {
            if (usernameFlag) {
                $(this).siblings("span").css({ display: "none" })
                $(this).removeClass("input-error")
            } else {
                $(this).siblings("span").css({ display: "block", color: "red" }).text("请输入正确的信息")
                $(this).addClass("input-error")
            }
        } else {
            $(this).siblings("span").css({ display: "block", color: "red" }).text("用户名不能为空")
            $(this).addClass("input-error")
        }
        //失去焦点，删除蓝色边框样式
        $(this).removeClass("input-active");
    })


    //简单邮箱匹配
    let emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    let emailFlag = false;
    $(".email").blur(function () {
        emailFlag = emailReg.test($(this).val());
        if ($(this).val()) {
            if (emailFlag) {
                $(this).siblings("span").css({ display: "none" })
                $(this).removeClass("input-error")
            } else {
                $(this).siblings("span").css({ display: "block", color: "red" }).text("请输入正确的信息");
                $(this).addClass("input-error")
            }
        } else {
            $(this).siblings("span").css({ display: "block", color: "red" }).text("邮箱不能为空");
            $(this).addClass("input-error")
        }
        $(this).removeClass("input-active");
    })


    //简单密码匹配
    let passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    let passwordFlag = false;
    $(".password-box .password").blur(function () {
        passwordFlag = passwordReg.test($(this).val());
        if ($(this).val()) {
            if (passwordFlag) {
                $(this).siblings("span").css({ display: "none" })
                $(this).removeClass("input-error")
            } else {
                $(this).siblings("span").css({ display: "block", color: "red" }).text("密码格式不正确")
                $(this).addClass("input-error")
            }
        } else {
            $(this).siblings("span").css({ display: "block", color: "red" }).text("密码不能为空")
            $(this).addClass("input-error")
        }
        $(this).removeClass("input-active");
    })

    // 确认密码匹配
    let password2Flag = false;
    $(".password2-box .password").blur(function () {
        let pasd1 = $(".password-box .password").val()
        let pasd2 = $(this).val();
        if (pasd1 == pasd2) {
            password2Flag = true;
            $(this).removeClass("input-error")
            $(this).siblings("span").css({ display: "none" })
        } else {
            $(this).siblings("span").css({ display: "block", color: "red" }).text("密码不正确")
            $(this).addClass("input-error")
        }

        $(this).removeClass("input-active");
    })

    //图形验证码
    let imgCodeFlag = false;
    let codeNum;
    let captcha1 = new Captcha({
        fontSize: 80,
        fontStyle: 'fill', //fill  stroke
    });
    captcha1.draw(document.querySelector('#captcha1'), r => {
        codeNum = r;
    });
    $("#captcha1").click(function () {
        imgCodeFn();
    })
    $(".inputCode").blur(function () {
        imgCodeFn();
    })

    function imgCodeFn() {
        let codeNum2 = $(".inputCode").val();
        if (codeNum2) {
            if (codeNum.toLowerCase() == codeNum2.toLowerCase()) {
                imgCodeFlag = true;
                $(".inputCode").removeClass("input-error")
                $(".inputCode").siblings("span").css({ display: "none" })
            } else {
                $(".inputCode").siblings("span").css({ display: "block", color: "red" }).text("密码不正确")
                $(".inputCode").addClass("input-error")
            }
        } else {
            $(".inputCode").siblings("span").css({ display: "block", color: "red" }).text("验证码不能为空")
            $(".inputCode").addClass("input-error")
        }


        $(".inputCode").removeClass("input-active");
    }



    //匹配手机号码
    let phoneFlag = false;
    let phoneReg = /^1[3456789]\d{9}$/;
    $(".phone").blur(function () {
        phoneFlag = phoneReg.test($(this).val());
        if ($(this).val()) {
            if (phoneFlag) {
                $(this).siblings("span").css({ display: "none" })
                $(this).removeClass("input-error")
            } else {
                $(this).siblings("span").css({ display: "block", color: "red" }).text("请输入核对手机号")
                $(this).addClass("input-error")
            }
        } else {
            $(this).siblings("span").css({ display: "block", color: "red" }).text("手机号不能为空")
            $(this).addClass("input-error")
        }
        $(this).removeClass("input-active");
    })

    $(".phoneNum").blur(function () {
        $(this).removeClass("input-active");
    })

    /*  发短信功能  */
    $(".sendCode").click(function () {
        //60S倒计时
        let time = 5;
        let timer = setInterval(() => {
            time--;

            $(this).text(time)
            if (time == 0) {
                clearInterval(timer);
                $(this).text("发送验证码")
            }
        }, 1000)

    })


    //协议按钮
    let agreeBtnFlag = false;
    $("#agreeBtn").click(function () {
        agreeBtnFlag = $(this).prop("checked")
    })

    //注册按钮
    $(".registerBtn").click(function () {



        // console.log(phoneFlag, imgCodeFlag, passwordFlag, password2Flag, usernameFlag, emailFlag);
        if (!agreeBtnFlag) {
            alert("请阅读协议!");
        } else {
            if (phoneFlag && imgCodeFlag && passwordFlag && password2Flag && usernameFlag && emailFlag) {
                //里面放ajax，老是失败
                let phoneNumber = $(".phone").val();
                let usernameText = $(".username").val();
                let passwordText = $(".password-box .password").val();
                let emailText = $(".email").val();
                // console.log(phoneNumber, usernameText, passwordText, emailText)
                //发请求操作，数据库
                $.ajax({
                    type: "post",
                    url: "/register",
                    dataType: "json",
                    data: {
                        username: usernameText,
                        password: passwordText,
                        email: emailText,
                        phone: phoneNumber,
                    },
                    success: function (response) {

                        //成功跳转  登录页面
                        if (response.status == 1) {
                            confirm("用户注册成功,是否回到登录页？")
                            window.location.href = "./login.html";
                        } else if (response.status == 0) {
                            alert("用户名已存在")
                        } else if (response.status == 2) {
                            alert("注册失败")
                        }

                    }
                })
            } else {
                alert("填写内容有误！ ")
            }

        }



    })

})