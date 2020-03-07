$(function () {

    //进来直接向数据库发请求，获取购物车的数据 再渲染
    $.ajax({
        url: "/selectcart",
        type: "get",
        // dataType: "json",
        success: function (response) {
            response = JSON.parse(response)

            //渲染购物车页面
            let shopBoxDom = response.map(function (item) {
                // console.log(item)
                return `  <div class="shops" data-id="${item.shopID}">
                             <div class="checkbox">
                                 <input type="checkbox" ${item.isActive == 1 ? "checked=checked" : ""}>
                             </div>
                             <div class="shopName">
                                 <div class="dflex">
                                     <img src="${item.img}" alt="">
                                     <p> ${item.shopname}</p>
                                 </div>
                             </div>
                             <div style="width:200px;height:100%;"></div>
                             <div class="prices">
                                 ¥  <span>   ${item.price}</span>
                             </div>
                             <div class="num">
                                 <div class="num_box">
                                     <span>-</span>
                                     <input type="text" value="${item.totalnum}">
                                     <span>+</span>
                                 </div>
                             </div>
                             <div class="sum">
                                 ¥<span> ${item.price * item.totalnum}</span>
                             </div>
                             <div class="del">
                                 <span>删除</span>
                             </div>
                         </div>`;


            }).join("");
            $(".section4 .center").html(shopBoxDom);


            //获取 合计总价框
            let sum_jq = $(".section5 .rightss a");
            //获取全部的全选按钮,判断状态，来计算总价
            let totalPrice = 0;

            $(".section4 .shops .checkbox input").each(function (index, item) {
                // console.log(item)
                if ($(item).prop("checked")) {
                    totalPrice += $(item).parents(".checkbox").siblings(".sum").find("span").text() * 1
                    sum_jq.text(totalPrice);
                }
            })

            sum_jq.text(totalPrice);


            //全选功能判断
            allInputFn()
            function allInputFn() {
                let allFlag = 0;
                $(".section4 .shops .checkbox input").each(function (index, item) {
                    // console.log(item)
                    if ($(item).prop("checked")) {
                        allFlag++;
                        // totalPrice += $(item).parents(".checkbox").siblings(".sum").find("span").text() * 1
                        // sum_jq.text(totalPrice);
                    }
                })
                //全选功能按钮
                if (allFlag == $(".section4 .shops .checkbox input").length) {
                    $(".section3 input").prop("checked", "checked"); //上面的全选按钮
                    $(".section5 .checkb input").prop("checked", "checked"); //下面的全选按钮
                } else {
                    $(".section3 input").prop("checked", ""); //上面的全选按钮
                    $(".section5 .checkb input").prop("checked", ""); //下面的全选按钮
                }

            }

            //为上和下面的全选功能添加功能
            $(".section3 input").click(function () {

                let allinp = 0;
                if ($(this).prop("checked")) {

                    //更新数据库，选中状态操作
                    $.ajax({
                        url: "/updateActive",
                        data: {
                            allShop: "all",
                        },

                    })



                    $(".section4 .shops .checkbox input").each(function (index, item) {
                        $(item).prop("checked", "checked")
                        $(".section5 .checkb input").prop("checked", "checked")
                    })

                    //全选时，  把价格全部相加 

                    $(".section4 .shops .sum span").each(function (index, item) {

                        allinp += item.innerText * 1;
                        sum_jq.text(allinp);
                    })
                } else {

                    //更新数据库，选中状态操作
                    $.ajax({
                        url: "/updateActive",
                        data: {
                            allShop: "noAll",
                        },

                    })

                    $(".section4 .shops .checkbox input").each(function (index, item) {
                        $(item).prop("checked", "");
                        $(".section5 .checkb input").prop("checked", "");
                        sum_jq.text(0);
                    })
                }
            })
            $(".section5 .checkb input").click(function () {
                let allinp = 0;
                if ($(this).prop("checked")) {


                    //更新数据库，选中状态操作
                    $.ajax({
                        url: "/updateActive",
                        data: {
                            allShop: "all",
                        },

                    })
                    $(".section4 .shops .checkbox input").each(function (index, item) {
                        $(item).prop("checked", "checked")
                        $(".section3 input").prop("checked", "checked")
                    })

                    $(".section4 .shops .sum span").each(function (index, item) {

                        allinp += item.innerText * 1;
                        sum_jq.text(allinp);
                    })

                } else {


                    //更新数据库，选中状态操作
                    $.ajax({
                        url: "/updateActive",
                        data: {
                            allShop: "noAll",
                        },

                    })
                    $(".section4 .shops .checkbox input").each(function (index, item) {
                        $(item).prop("checked", "")
                        $(".section3 input").prop("checked", "")
                        sum_jq.text(0);
                    })
                }
            })


            //为单个 商品的的复选框  添加事件
            $(".section4 ").on("click", " .shops .checkbox input", function () {
                let thisId = $(this).parents(".shops").data("id");
                let flag = 0;
                if ($(this).prop("checked")) {
                    flag = 1;
                } else {
                    flag = 0;
                }

                //更新数据库，选中状态操作
                $.ajax({
                    url: "/updateActive",
                    data: {
                        shopsID: thisId,
                        isActive: flag,
                        allShop: "no",
                    },

                })



                let this_price = $(this).parents(".checkbox").siblings(".sum").find("span").text() * 1
                let changSum = 0;
                if ($(this).prop("checked")) {
                    changSum = sum_jq.text() * 1 + this_price;
                    sum_jq.text(changSum);
                } else {
                    changSum = sum_jq.text() * 1 - this_price;
                    sum_jq.text(changSum);
                }

                allInputFn()

            })


            //数量 加减功能
            $(".num").on("click", "span", function (e) {
                e.stopPropagation();
                //获取同级的 input标签   数量框
                let inputNum_jq = $(this).siblings("input")
                let now_inputNum = inputNum_jq.val() * 1;


                //获取同级的    总价框
                let inputSum_jq = $(this).parents(".num").siblings(".sum").find("span");
                let inputSum_num = inputSum_jq.text() * 1;
                //再获取单价框
                let price_jq = $(this).parents(".num").siblings(".prices").find("span");
                let price = price_jq.text() * 1;

                //获取  单个全选按钮
                let allInput_jq = $(this).parents(".num").siblings(".checkbox").find("input");

                let thisId = $(this).parents(".shops").data("id")

                if ($(this).text() == "+") {

                    now_inputNum += 1;
                    inputNum_jq.val(now_inputNum)
                    inputSum_jq.text(price * now_inputNum);

                    let nums = now_inputNum;
                    //更新数据库，商品数量
                    $.ajax({
                        url: "/updateShopNum",
                        data: {
                            shopsID: thisId,
                            shopNum: nums,
                        },
                    })




                    //如果 全选状态开启 才计算到总价里面
                    if (allInput_jq.prop("checked")) {
                        let nowsum = price + sum_jq.text() * 1
                        sum_jq.text(nowsum)
                    }
                } else {
                    if (now_inputNum == 0) return;
                    now_inputNum -= 1;
                    inputNum_jq.val(now_inputNum);
                    inputSum_jq.text(price * now_inputNum);
                    let nums = now_inputNum;
                    //更新数据库，商品数量
                    $.ajax({
                        url: "/updateShopNum",
                        data: {
                            shopsID: thisId,
                            shopNum: nums,
                        },
                    })

                    //如果 全选状态开启 才计算到总价里面
                    if (allInput_jq.prop("checked")) {
                        let nowsum = sum_jq.text() * 1 - price
                        sum_jq.text(nowsum)
                    }

                }
            })


            //单个商品的删除按钮添加功能
            $(".section4 ").on("click", ".del span", function () {
                let thisId = $(this).parents(".shops").data("id")

                //删除数据库操作
                $.ajax({
                    url: "/delData",
                    data: {
                        shopsID: thisId,
                    },

                })





                $(this).parents(".shops").remove();

                //还是要判断是否开启了选择
                let checkBoxFlag = $(this).parent().siblings(".checkbox").find("input").prop("checked");
                if (checkBoxFlag) {
                    //同时把总价给改了
                    let d_sum_jq = sum_jq.text() * 1;
                    let d_price = $(this).parent().siblings(".sum").find("span").text() * 1;
                    let d_sum = d_sum_jq - d_price;
                    sum_jq.text(d_sum)
                }
                allInputFn()
            })


            //清空购物车功能
            $(".section5 .fl_ul p").eq(1).click(function () {
                $(".section4 .center").html("清空操作")
                $(".section3 input").prop("checked", ""); //上面的全选按钮
                $(".section5 .checkb input").prop("checked", ""); //下面的全选按钮

                $.ajax({
                    url: "/delData",
                    data: {
                        shopsID: "all",
                    },
                    success: function (res) {
                        window.location.reload(); //重新刷新页面

                    }
                })
            })

            //批量删除
            $(".section5 .fl_ul p").eq(0).click(function () {
                let arr = [];
                //判断选中的  才删除
                $(".section4 .shops .checkbox input").each(function (index, item) {

                    // console.log(item)
                    if ($(item).prop("checked")) {
                        let thisId = $(this).parents(".shops").data("id")
                        arr.push(thisId)
                        $(item).parents(".shops").remove();
                    }
                })

                $.ajax({
                    url: "/delData",
                    data: {
                        shopsID: arr,
                    },
                    success: function (res) {
                        window.location.reload(); //重新刷新页面

                    }
                })

            })

        }
    })





})