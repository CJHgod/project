$(function () {

    //切割查询字符串的方法
    let searchStr = window.location.search.slice(1);
    let searchArray = searchStr.split("&")
    let searchObj = {};
    searchArray.forEach((item) => {
        let arr = item.split("=")
        searchObj[arr[0]] = arr[1];
    })


    //利用携带的参数发请求获取数据
    sendAjax("get", "../json/indexData.json").then((res) => {

        let nowData = res[searchObj.id - 1];

        // console.log(nowData)

        //渲染左边大图片                                               ------这里还没做放大镜的图片               
        $(".currentImgBox .nowCurrentImg img").attr("src", nowData.imgData[0]);
        $(".currentImgBox .bigImgBox").css("background-image", `url('${nowData.imgData[0]}')`)

        //截取imgData数据中，前5条数据 来作为 下面小图片
        let minImgArray = nowData.imgData.slice(0, 5);
        let minImgDom = minImgArray.map((item) => {
            return ` <div class="min-imgBox">
                        <img src="${item}" alt="" data-bigImg="">
                    </div>`;
        }).join("")
        $(".readyImgBox").html(minImgDom);

        // 
        $(".readyImgBox .min-imgBox").eq(0).addClass("minImgBox-active")
        //渲染放大镜盒子 bigImgBox  的背景图   ,点击小盒子 切换大图功能
        $(".readyImgBox").on("click", ".min-imgBox", function () {

            let toggleImg = $(this).find("img").attr("src");
            $(this).addClass("minImgBox-active").siblings().removeClass("minImgBox-active")
            $(".currentImgBox .nowCurrentImg img").attr("src", toggleImg);
            $(".currentImgBox .bigImgBox").css("background-image", `url('${toggleImg}')`)
        })




        //用imgData数据 ，  渲染  商品详情   的图片 ,,,,,,,再做瀑布流(css做)
        let shopShowImg = nowData.imgData.map((item) => {
            return `  <div class="imgBox"> <img src="${item}" alt=""></div>`;
        }).join("")
        $("#showImgBox").html(shopShowImg)



        //利用数据渲染 信息
        $(".jp-name").text(nowData.indexData.name)  //名字一
        $(".china-name").text(nowData.indexData.chinaName)//名字二
        $(".price .context").text(nowData.indexData.price);
        let attrStr = nowData.indexData.attribute.map(function (attrItem) {
            return ` <div class="labelBox">${attrItem}</div>`;
        }).join("");
        $(".shop-label").html(attrStr);




        //用 nowData的 indexData数据  渲染 规格参数
        //属性是数组，单独渲染
        let indexDataAttribute = nowData.detailsData.map(function (items) {

            if (Object.prototype.toString.call(items.text) == "[object Array]") {
                var aDom = items.text.map(function (item, index) {
                    //判断逗号渲染几次
                    var commaStr = "";
                    if (index < items.text.length - 1) {
                        commaStr = " <span>、</span>"
                    }

                    return ` <a href="">${item}</a>
                                        ${commaStr}
                                     `
                }).join("");
                return ` <li>
                                    <div class="infos">${items.title}:</div>
                                    <div class="context">
                                     ${aDom}
                                    </div>
                                </li>`;
            } else {
                return `<li>
                                     <div class="infos">${items.title}:</div>
                                    <div class="context">${items.text}</div>
                                 </li>`

            }


        }).join("");
        $(".details-text ul").html(indexDataAttribute);
    })




    //放大镜功能
    //避免 放大镜移动 卡屏  先在外面获取 节点
    let maskDom_jq = $(".currentImgBox .maskBox");
    let currentImgBoxDom_jq = $(".currentImgBox");
    let bigImgBoxDom_jq = $(".currentImgBox .bigImgBox");
    //移入
    currentImgBoxDom_jq.mouseenter(function () {
        maskDom_jq.css({ display: "block" })
        bigImgBoxDom_jq.css({ display: "block" })

        //放大镜盒子的大小 = 遮罩层盒子的大小(1) * 放大镜盒子背景图的大小(2) / smallImgBox盒子的大小(3)

        //遮罩层的 宽  高   ( 1 )
        let maskBoxWidth = maskDom_jq.width();
        let maskBoxHeight = maskDom_jq.height();


        //放大镜盒子背景图的大小    ( 2 )
        let getBigImgBoxWidth_Style = window.getComputedStyle(bigImgBoxDom_jq[0])["background-size"].split(" "); //非行内样式
        var BigImgBoxWidth = parseInt(getBigImgBoxWidth_Style[0])
        var BigImgBoxHeight = parseInt(getBigImgBoxWidth_Style[1])
        // console.log(BigImgBoxWidth)


        //获取 放大镜放大图片的容器的 宽  高     ( 3 )
        let currentImgBoxWidth = currentImgBoxDom_jq.width();
        let currentImgBoxHeight = currentImgBoxDom_jq.height();



        //计算放大镜盒子大小
        let bigImgBoxDom_Width = (maskBoxWidth * BigImgBoxWidth / currentImgBoxWidth);
        let bigImgBoxDom_Height = (maskBoxHeight * BigImgBoxHeight / currentImgBoxHeight);

        bigImgBoxDom_jq.css({
            width: bigImgBoxDom_Width,
            height: bigImgBoxDom_Height
        })



        //先获取 当前放大镜作用的显示图片到  浏览器两边的距离
        let currentImgBox_x = currentImgBoxDom_jq.offset().left
        let currentImgBox_Y = currentImgBoxDom_jq.offset().top;

        $(this).mousemove(function (e) {

            let maskLeft = e.pageX - currentImgBox_x - (maskBoxWidth / 2);
            let maskHeight = e.pageY - currentImgBox_Y - (maskBoxHeight / 2);
            if (maskLeft <= 0) {
                maskLeft = 0;
            }
            if (maskHeight <= 0) {
                maskHeight = 0;
            }
            if (maskLeft >= currentImgBoxWidth - maskBoxWidth) {
                maskLeft = currentImgBoxWidth - maskBoxWidth
            }
            if (maskHeight >= currentImgBoxHeight - maskBoxHeight) {
                maskHeight = currentImgBoxHeight - maskBoxHeight
            }
            maskDom_jq.css({ left: maskLeft, top: maskHeight })

            // 背景图移动的距离 = 背景图大小 * mask移动距离 / show盒子的大小


            let bigImgBox_bgPosition_X = BigImgBoxWidth * maskLeft / currentImgBoxWidth;
            let bigImgBox_bgPosition_Y = BigImgBoxHeight * maskHeight / currentImgBoxHeight;
            // background-position-x:
            bigImgBoxDom_jq.css({
                backgroundPosition: `-${bigImgBox_bgPosition_X}px -${bigImgBox_bgPosition_Y}px`
            })
        })

    })

    //移出
    currentImgBoxDom_jq.mouseleave(function () {
        maskDom_jq.css({ display: "none" })
        bigImgBoxDom_jq.css({ display: "none" })
    })



    //数量的 添加功能
    //获取  input框的jq对象  
    let reduce_add_inputJq = $(".shop-num .context input");
    let nowShopNum = 1;
    $(".shop-num .reduce").click(function () {
        nowShopNum--;
        reduce_add_inputJq.val(nowShopNum)
    })
    reduce_add_inputJq.change(function () {
        nowShopNum = $(this).val();
    })
    $(".shop-num .add").click(function () {
        nowShopNum++;
        reduce_add_inputJq.val(nowShopNum)
    })



    //商品详情 和 规格参数 的切换功能
    $('.details-title .details-img').click(function () {
        $(this).addClass("details-active").siblings().removeClass("details-active ");
        $("#showImgBox").css({ display: "block" })
        $(".details-text").css({ display: "none" })
    })

    $('.details-title .details-data').click(function () {
        $(this).addClass("details-active").siblings().removeClass("details-active ");
        $("#showImgBox").css({ display: "none" })
        $(".details-text").css({ display: "block" })
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

