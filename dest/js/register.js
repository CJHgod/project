"use strict";$(function(){$(".form-list input").click(function(){$(".form-list input").each(function(s,i){$(i).removeClass("input-active")}),$(this).removeClass("input-error"),$(this).addClass("input-active")});var s=/^[\u4e00-\u9fa5_a-zA-Z0-9]{4,8}$/,e=!1;$(".username").blur(function(){e=s.test($(this).val()),$(this).val()?e?($(this).siblings("span").css({display:"none"}),$(this).removeClass("input-error")):($(this).siblings("span").css({display:"block",color:"red"}).text("请输入正确的信息"),$(this).addClass("input-error")):($(this).siblings("span").css({display:"block",color:"red"}).text("用户名不能为空"),$(this).addClass("input-error")),$(this).removeClass("input-active")});var i=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,r=!1;$(".email").blur(function(){r=i.test($(this).val()),$(this).val()?r?($(this).siblings("span").css({display:"none"}),$(this).removeClass("input-error")):($(this).siblings("span").css({display:"block",color:"red"}).text("请输入正确的信息"),$(this).addClass("input-error")):($(this).siblings("span").css({display:"block",color:"red"}).text("邮箱不能为空"),$(this).addClass("input-error")),$(this).removeClass("input-active")});var t=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,n=!1;$(".password-box .password").blur(function(){n=t.test($(this).val()),$(this).val()?n?($(this).siblings("span").css({display:"none"}),$(this).removeClass("input-error")):($(this).siblings("span").css({display:"block",color:"red"}).text("密码格式不正确"),$(this).addClass("input-error")):($(this).siblings("span").css({display:"block",color:"red"}).text("密码不能为空"),$(this).addClass("input-error")),$(this).removeClass("input-active")});var o=!1;$(".password2-box .password").blur(function(){$(".password-box .password").val()==$(this).val()?(o=!0,$(this).removeClass("input-error"),$(this).siblings("span").css({display:"none"})):($(this).siblings("span").css({display:"block",color:"red"}).text("密码不正确"),$(this).addClass("input-error")),$(this).removeClass("input-active")});var a,l=!1;function p(){var s=$(".inputCode").val();s?a.toLowerCase()==s.toLowerCase()?(l=!0,$(".inputCode").removeClass("input-error"),$(".inputCode").siblings("span").css({display:"none"})):($(".inputCode").siblings("span").css({display:"block",color:"red"}).text("密码不正确"),$(".inputCode").addClass("input-error")):($(".inputCode").siblings("span").css({display:"block",color:"red"}).text("验证码不能为空"),$(".inputCode").addClass("input-error")),$(".inputCode").removeClass("input-active")}new Captcha({fontSize:80,fontStyle:"fill"}).draw(document.querySelector("#captcha1"),function(s){a=s}),$("#captcha1").click(function(){p()}),$(".inputCode").blur(function(){p()});var c=!1,d=/^1[3456789]\d{9}$/;$(".phone").blur(function(){c=d.test($(this).val()),$(this).val()?c?($(this).siblings("span").css({display:"none"}),$(this).removeClass("input-error")):($(this).siblings("span").css({display:"block",color:"red"}).text("请输入核对手机号"),$(this).addClass("input-error")):($(this).siblings("span").css({display:"block",color:"red"}).text("手机号不能为空"),$(this).addClass("input-error")),$(this).removeClass("input-active")}),$(".phoneNum").blur(function(){$(this).removeClass("input-active")}),$(".sendCode").click(function(){var s=this,i=5,t=setInterval(function(){i--,$(s).text(i),0==i&&(clearInterval(t),$(s).text("发送验证码"))},1e3)});var u=!1;$("#agreeBtn").click(function(){u=$(this).prop("checked")}),$(".registerBtn").click(function(){if(u)if(c&&l&&n&&o&&e&&r){var s=$(".phone").val(),i=$(".username").val(),t=$(".password-box .password").val(),a=$(".email").val();$.ajax({type:"post",url:"/register",dataType:"json",data:{username:i,password:t,email:a,phone:s},success:function(s){1==s.status?(confirm("用户注册成功,是否回到登录页？"),window.location.href="./login.html"):0==s.status?alert("用户名已存在"):2==s.status&&alert("注册失败")}})}else alert("填写内容有误！ ");else alert("请阅读协议!")})});