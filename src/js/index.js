
$(function () {

    //渲染走马灯部分
    //请求渲染floor3  数据重复用
    sendAjax("get", "../json/indexData.json").then((res) => {

        //渲染走马灯部分
        let swiper_slide = res.map(function (item) {
            return ` <div class="swiper-slide" data-id="${item.indexData.id}">
                     <div class="imgBox">
                        <img src="${item.rowLeftImg}" alt="">
                     </div>  
                     <div class="text">
                        <p>${item.indexData.name}</p>
                     </div>
                 </div>
                `;
        }).join("");
        $(".autoBox .autoBox-section .swiper-wrapper").html(swiper_slide)
        //渲染完页面，才能加走马灯效果
        let swiper1 = new Swiper('.swiper-container1', {
            autoplay: {
                delay: 0,    //延迟时间，走马灯为零。  
            },
            speed: 5000,     //滚动速度，如果轮播图的话，设置小一点，让给delay一点时间即可
            loop: true,
            freeMode: true,
            slidesPerView: 6,      //slider容器能够同时显示的slides数量,如果swiper-slide小于该值，则动画不生效
            spaceBetween: 12,
            slidesPerGroup: 1,   //多个为一组，滚动
        })
        //走马灯移入 移出 停止
        $(".swiper-container1").hover(function () {

            swiper1.autoplay.stop()
        }, function () {
            swiper1.autoplay.start()
        })

        //走马灯的点击事件，事件委托
        $(".autoBox-section").on("click", ".swiper-slide", function () {
            let clickId = $(this).data("id")
            window.open(`./details.html?id=${clickId}`)

        })



        //请求渲染floor3  数据重复用
        let shopBoxDom = "";
        for (var i = 0; i < 10; i++) {
            shopBoxDom += `<div class="shopBox" data-id="${res[i].indexData.id}">
                                <div class="imgBox">
                                    <img src="${res[i].rowLeftImg}" alt="">
                                </div>

                                <div class="blackBox">
                                    <div class="contextBox">
                                        <div class="title">${res[i].indexData.name}</div>
                                        <div class="price">${res[i].indexData.price}</div>
                                    </div>
                                </div>
                            </div>`;
        }
        $(".floor3 .bottom-content").html(shopBoxDom);
        $(".floor3 .bottom-content").on("click", ".shopBox", function () {
            let shopId = $(this).data("id")
            window.location.href = `../html/details.html?id=${shopId}`
        })



        //请求渲染cooperation2-box   数据重复用
        let cBox = "";
        for (var i = 6; i < 12; i++) {
            cBox += `  <div class="shopBox" data-id="${res[i].indexData.id}">
                            <div class="imgBox">
                                <img src="${res[i].rowLeftImg}" alt="">
                            </div>
                            <div class="font-box">
                                <div class="fb-title">${res[i].indexData.name}</div>
                                <div class="details">
                                    <div class="price">${res[i].indexData.price}</div>
                                    <div class="flag">现货</div>
                                </div>
                            </div>
                        </div>`;
        }
        $(".cooperation2-box  .right-context").html(cBox);

        //cooperation2-box 渲染完成，添加点击事件
        $(".cooperation2-box .right-context").on("click", ".shopBox", function () {
            let shopId = $(this).data("id")
            window.location.href = `../html/details.html?id=${shopId}`
        })


    })


    //发请求，渲染头部轮播图部分数据
    sendAjax("get", "../json/rotationBoxData.json").then((res) => {
        //渲染轮播图
        let swiperBoxDom = res.swiperBox.map((item) => {
            return ` <div class="swiper-slide">
                        <a href="">
                        <img src="${item}" alt="">
                        </a>
                     </div>`;
        }).join("");
        $(".rotation-box .swiper-wrapper").html(swiperBoxDom)

        //渲染中间盒子的图片
        let middleBoxDom = `<a href="">
                    <img src="${res.middleBox}" alt="">
                </a>`;
        $(".rotation-box .middle-box").html(middleBoxDom);


        //渲染最右边四个盒子数据
        let rightBoxDom = res.rightBox.map((item) => {
            return `  <a href=""><img src="${item}" alt=""></a>`;
        }).join("");
        $(".rotation-box .rightBox").html(rightBoxDom)


        //轮播图的功能
        var swiper2 = new Swiper('.swiper-container2', {
            loop: true, // 循环模式选项
            autoplay: {
                delay: 2000,    //延迟时间，走马灯为零。  
            },
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        })
        //移入轮播图 停止和开始
        $(".swiper-container2").hover(function () {
            swiper2.autoplay.stop()
            $(this).find(".swiper-button-prev").stop().fadeIn("fast");
            $(this).find(".swiper-button-next").stop().fadeIn("fast");
        }, function () {
            swiper2.autoplay.start();
            $(this).find(".swiper-button-prev").stop().fadeOut("fast");
            $(this).find(".swiper-button-next").stop().fadeOut("fast");

        })


    })




    //渲染导航  nav  中的secondNav
    sendAjax("get", "../json/secondNavData.json").then((res) => {
        let navUl_li = res.map(function (item) {

            let secondNavDom = item.list.map(function (data) {
                return `<div class="item">
               <i class="iconfont icon-collection-fill"></i>
               <span>${data}</span>
           </div>`
            }).join("");
            return ` <li>
           <img src="${item.logoImg}" alt="">
           <p>${item.title}</p>
           <div class="secondNav">
               <h2>${item.title}</h2>
               ${secondNavDom}
           </div>
       </li>`;
        }).join("");

        $(".navBox ul").html(navUl_li);

    })



    //渲染floor1   楼层1  
    sendAjax("get", "../json/floor1Data.json").then(function (res) {

        //渲染头部导航

        let liDom = res.floor1UlData.map(function (liData) {
            return `<li>${liData}</li>`
        }).join("");
        let topTitleDom = `<div class="leftBox">
                                <h1> <span>1F</span> ${res.floor1Title}</h1>
                                <ul>
                                   ${liDom}
                                </ul>
                            </div>
                            <div class="rightBox">
                                <i class="iconfont icon-collection-fill"></i>
                                <a href="">更多</a>
                            </div>`;
        $(".floor1 .top-title").html(topTitleDom);


        let contentBoxDom = res.floor1Datas.map(function (item, index) {
            let gridBoxDom = item.map(function (data) {
                return `   <div class="grid-box">
                                <div class="imgBox">
                                    <img src="${data.imgSrc}" alt="">
                                </div>
                                <div class="font-text">
                                    <h2>${data.title}</h2>
                                    <div class="context">
                                        <div class="author">
                                            <div class="headerImg">
                                                <img src="${data.headerImg}" alt="">
                                            </div>
                                            <div class="author-name">${data.author}</div>

                                        </div>
                                        <div class="times">${data.time}</div>

                                    </div>
                                </div>
                            </div>`;
            }).join("");


            return ` <div class="f-box"> <div class="content-area"> ${gridBoxDom}  </div> </div>`;
        }).join("");
        $(".floor1 .bottom-context").html(contentBoxDom);

        //为楼层1 的切换标签添加事件
        $(".floor1 .top-title ul li").eq(0).addClass("li-active");
        $(".floor1 .top-title ul li").click(function () {
            let index = $(this).index();
            $(this).addClass("li-active").siblings().removeClass("li-active")
            $(".floor1 .bottom-context .f-box").eq(index).css("display", "block").siblings().css("display", "none")
        })//切换
        $(".floor1 .top-title ul li").hover(function () {
            $(this).addClass("li-hover")
        }, function () {
            $(this).removeClass("li-hover")
        })

    })//请求


    //渲染floor2   楼层2  
    sendAjax("get", "../json/floor2Data.json").then(function (res) {

        //渲染头部导航

        let liDom = res.floor2UlData.map(function (liData) {
            return `<li>${liData}</li>`
        }).join("");
        let topTitleDom = `<div class="leftBox">
                            <h1> <span>2F</span> ${res.floor2Title}</h1>
                            <ul>
                               ${liDom}
                            </ul>
                        </div>
                        <div class="rightBox">
                            <i class="iconfont icon-collection-fill"></i>
                            <a href="">更多</a>
                        </div>`;
        $(".floor2 .top-title").html(topTitleDom);


        let contentBoxDom = res.floor2Datas.map(function (item, index) {
            let gridBoxDom = item.map(function (data) {
                return `   <div class="grid-box">
                            <div class="imgBox">
                                <img src="${data.imgSrc}" alt="">
                            </div>
                            <div class="blackBox">
                                <div class="china-name">${data.chinaName}</div>
                                <div class="jp-name">${data.jpName}</div>
                                <div class="line"></div>
                                <div class="num">${data.num}</div>
                            </div>

                        </div>`;
            }).join("");


            return ` <div class="f-box"> <div class="content-area"> ${gridBoxDom}  </div> </div>`;
        }).join("");
        $(".floor2 .bottom-context").html(contentBoxDom);

        //为楼层2 的切换标签添加事件
        $(".floor2 .top-title ul li").eq(0).addClass("li-active");
        $(".floor2 .top-title ul li").click(function () {
            let index = $(this).index();
            $(this).addClass("li-active").siblings().removeClass("li-active")
            $(".floor2 .bottom-context .f-box").eq(index).css("display", "block").siblings().css("display", "none")
        })//切换
        $(".floor2 .top-title ul li").hover(function () {
            $(this).addClass("li-hover")
        }, function () {
            $(this).removeClass("li-hover")
        })

    })//请求


    //处理从 登录页成功后跳转到首页的功能
    let sessionUsername = window.sessionStorage.getItem("username");
    let sessionPassword = window.sessionStorage.getItem("password");
    if (sessionUsername && sessionPassword) {
        $.ajax({
            type: "post",
            url: "/login",
            dataType: "json",
            data: {
                username: sessionUsername,
                password: sessionPassword,
            },
            success: function (res) {
                if (res.status == 1) {
                    $(".notLoginBox").css({ display: "none" });
                    $(".logining").css({ display: "block" });
                    $(".login-username").text(sessionUsername);

                    $(".i-username").text(`用户名:${res.datas.name}`)
                    $(".i-email").text(`邮箱:${res.datas.email}`)

                }
            }
        })

    }



    //页面进来首页时，首先判断是否存在cookie, 有则自动登录
    //页面进来，自动获取cookie的值 发一个ajax请求
    let cookieUsername = Cookie.getCookie("username");
    let cookiePassword = Cookie.getCookie("password");
    if (cookieUsername && cookiePassword) {  //cookie不为空再发请求
        $.ajax({
            type: "post",
            url: "/login",
            dataType: "json",
            data: {
                username: cookieUsername,
                password: cookiePassword,
            },
            success: function (res) {
                if (res.status == 1) {
                    $(".notLoginBox").css({ display: "none" });
                    $(".logining").css({ display: "block" });
                    $(".login-username").text(Cookie.getCookie("username"));

                    $(".i-username").text(`用户名:${res.datas.name}`)
                    $(".i-email").text(`邮箱:${res.datas.email}`)

                }
            }
        })
    }


    //首页点击退出账户时的功能
    $(".exitBtn a").click(function () {
        Cookie.clearAllCookie();
        window.sessionStorage.removeItem("username");
        window.sessionStorage.removeItem("password");
    })






})


// 发送请求方法
function sendAjax(type, url, data) {
    var p_obj = new Promise(function (resolve, reject) {
        $.ajax({
            url: url,
            type: type,
            data: data,
            dataType: "json",
            success: function (res) {
                resolve(res)
            }
        })
    });
    return p_obj;
}

