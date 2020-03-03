$(function () {
    new Swiper('.swiper-container1', {
        autoplay: {
            delay: 0,    //延迟时间，走马灯为零。  
        },
        speed: 5000,     //滚动速度，如果轮播图的话，设置小一点，让给delay一点时间即可
        loop: true,
        freeMode: true,
        slidesPerView: 11,      //slider容器能够同时显示的slides数量,如果swiper-slide小于该值，则动画不生效
        spaceBetween: 14,
        slidesPerGroup: 1,   //多个为一组，滚动
    })

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