"use strict";$(function(){$.ajax({url:"/selectcart",dataType:"json",success:function(t){$(".cartBuy .numBox").text(t.length)}})});