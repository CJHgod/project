$(function () {

    //切割查询字符串的方法
    let searchStr = window.location.search.slice(1);
    let searchArray = searchStr.split("&")
    let searchObj = {};
    searchArray.forEach((item) => {
        let arr = item.split("=")
        searchObj[arr[0]] = arr[1];
    })



    //进来时获取获取url 传参 再发请求 渲染数据

    $.ajax({
        type: "get",
        url: "../json/listpage.json",
        dataType: "json",
        success: function (res) {

            //只截取12个数据渲染  
            let firstShop = 0;
            let lageShop = 12;
            var totalArray = JSON.parse(JSON.stringify(res.listdata));   //深拷贝数组，防止被修改
            var nowArray = totalArray.slice(firstShop, lageShop)
            let listDataDom = listDomFn(nowArray);
            $(".shop-list").html(listDataDom)


            //价格排序   升序
            $("#upPrice").click(function () {
                $(this).addClass("oBox-active").siblings().removeClass("oBox-active")
                //让对象数组，按照某个字段排序
                function compare(property) {
                    return function (a, b) {
                        var value1 = parseInt(a[property]);
                        var value2 = parseInt(b[property]);
                        return value1 - value2;
                    }
                }
                let sortArray = totalArray.sort(compare('price'));
                togglePage(sortArray);
                let nowSortArray = sortArray.slice(firstShop, lageShop)
                let listDataDom = listDomFn(nowSortArray);
                $(".shop-list").html(listDataDom)
                loadFn()
            })
            //价格排序   降序
            $("#downPrice").click(function () {
                $(this).addClass("oBox-active").siblings().removeClass("oBox-active")
                //让对象数组，按照某个字段排序
                function compare(property) {
                    return function (a, b) {
                        var value1 = parseInt(a[property]);
                        var value2 = parseInt(b[property]);
                        return value2 - value1;
                    }
                }
                let sortArray = totalArray.sort(compare('price'));
                togglePage(sortArray)
                let nowSortArray = sortArray.slice(firstShop, lageShop)
                let listDataDom = listDomFn(nowSortArray);
                $(".shop-list").html(listDataDom);
                loadFn()
            })

            //默认按钮
            $("#o-default").click(function () {
                $(this).addClass("oBox-active").siblings().removeClass("oBox-active")
                togglePage(res.listdata)
                let listDataDom = listDomFn(nowArray);
                $(".shop-list").html(listDataDom)
                loadFn()

            })



            //换页功能
            togglePage(res.listdata)
            function togglePage(arr) {
                $('.m-style').pagination({
                    totalData: res.totalData,
                    showData: lageShop,
                    coping: true,
                    callback: function (api) {
                        let nowClickPage = api.getCurrent();
                        let nowFristShopIndex = (nowClickPage - 1) * this.showData
                        let nowLastShopIndex = nowClickPage * this.showData
                        let nowArray2 = arr.slice(nowFristShopIndex, nowLastShopIndex)
                        let listDataDom = listDomFn(nowArray2);
                        $(".shop-list").html(listDataDom);
                        loadFn()
                        $(window).scrollTop(0);
                    }
                });
            }



            //滚动加载   函数
            loadFn()
            function loadFn() {
                let isok = true;
                let shopfirst = 0;
                let shoplast = 12;
                window.onscroll = function () {
                    //判断滚动的地方，  然后发请求再次渲染数据   
                    let pageHeight = window.innerHeight;

                    //最后一张图片容器   到浏览器 顶部的高度
                    let lastContentHeight = $(".shop-list .shopBox").last()[0].offsetTop;

                    //滚动条滚动的高度
                    let sTop = $(window).scrollTop();

                    // console.log(pageHeight, lastContentHeight, sTop)
                    if (lastContentHeight < pageHeight + sTop) {

                        //如果截取的最大值 小于 总数据的最大值，则才发请求，否则不发请求
                        if (isok && shoplast < res.totalData) {
                            $(window).scrollTop(lastContentHeight);
                            $(".loadBox").fadeIn(1000)
                            isok = false;
                            shopfirst += 12;
                            shoplast += 12;
                            setTimeout(() => {
                                $.ajax({
                                    type: "get",
                                    url: "../json/listpage.json",
                                    dataType: "json",
                                    success: function (response) {
                                        let nowArray = response.listdata.slice(shopfirst, shoplast)
                                        let listDataDom = listDomFn(nowArray);
                                        $(".shop-list")[0].innerHTML += listDataDom;
                                        isok = true;
                                        $(".loadBox").fadeOut(300)
                                    }
                                })
                            }, 1000);

                        }

                    }


                    // if (checkFlag()) {                
                    //     // if (rollFlag) {
                    //     $.ajax({
                    //         type: "get",
                    //         url: "../json/listpage.json",
                    //         dataType: "json",
                    //         success: function (response) {

                    //             var totalArray = JSON.parse(JSON.stringify(response.listdata));   //深拷贝数组，防止被修改
                    //             var nowArray = totalArray.slice(0, 12)
                    //             let listDataDom = listDomFn(nowArray);
                    //             $(".shop-list")[0].innerHTML += listDataDom;

                    //             console.log($(".shop-list .shopBox").length)
                    //         }
                    //     })
                    //     // flag = false;
                    //     // }


                    // }
                }

            }



            //事件委托    为页面加入点击事件
            $(".shop-list").on("click", ".shopBox", function () {
                let shopId = $(this).data("id");
                window.location.href = `./details.html?id=${shopId}`
            })


        }
    })

    //封装一下 渲染 列表数据的方法
    function listDomFn(arr) {
        return arr.map(function (item) {
            return `<div class="shopBox" data-id="${item.id}">
                        <div class="imgBox">
                            <img src="${item.img}" alt="">
                        </div>
                        <div class="shop-context">
                            <div class="price">${item.price} </div>
                            <div class="shop-name">${item.name}</div>
                            <div class="shopState"> 现货 </div>
                        </div>
                    </div>`;
        }).join("");
    }





})