/**
 * Created by admin on 2016/9/22.
 */

window.onload = function() {
    var oUser = document.getElementById('user');
    var oReg = document.getElementById('reg');
    var oLogin = document.getElementById('login');
    var oUserInfo = document.getElementById('userinfo');
    var oList = document.getElementById('list');
    var iPage = 1;
    var em1=$('.em1');
    var em2=$('.em2');

    //var olist =document.getElementById('list');
    var olist=$('.list');
    var oShowMore = document.getElementById('showMore');
    var ologout = document.getElementById('logout');
    var oUsername1 = document.getElementById('username1');
    var oVerifyUserNameMsg = document.getElementById('verifyUserNameMsg');
    var oUser = document.getElementById('btnPost');
    //留言初始 化
    var oContent = document.getElementById('content');
    var oPostBtn = document.getElementById('btnPost');
    var oshowMore=document.getElementById('showMore');
    showlist();
    updateUserStatus();
    function updateUserStatus() {
        var uid = getCookie('uid');
        var username = getCookie('username');
        if (uid) {
            //如果是登陆状态
            oUser.style.display = 'block';
            oUserInfo.innerHTML = username;
            oReg.style.display = 'none';
            oLogin.style.display = 'none';
        } else {
            oUser.style.display = 'none';
            oUserInfo.innerHTML = '';
            oReg.style.display = 'block';
            oLogin.style.display = 'block';
        }
    }
    //用户验证
    oUsername1.onblur = function() {
        ajax('get', 'guestbook/index.php', 'm=index&a=verifyUserName&username=' + this.value, function(data) {
            //alert(data);
            var d = JSON.parse(data);

            oVerifyUserNameMsg.innerHTML = d.message;

            if (d.code) {
                oVerifyUserNameMsg.style.color = 'red';
            } else {
                oVerifyUserNameMsg.style.color = 'green';
            }
        });
    }
    //用户注册
    var oPassword1 = document.getElementById('password1');
    var oRegBtn = document.getElementById('btnReg');
    oRegBtn.onclick = function() {
        ajax('post', 'guestbook/index.php', 'm=index&a=reg&username='+encodeURI(oUsername1.value)+'&password=' + oPassword1.value, function(data) {
            var d = JSON.parse(data);
            alert(d.message);
        });

    }
    //登录
    var oUsername2 = document.getElementById('username2');
    var oPassword2 = document.getElementById('password2');
    var oLoginBtn = document.getElementById('btnLogin');
    oLoginBtn.onclick = function() {
        ajax('post', '../html/guestbook/index.php', 'm=index&a=login&username='+encodeURI(oUsername2.value)+'&password=' + oPassword2.value, function(data) {
            var d = JSON.parse(data);
            alert(d.message);
            if (!d.code) {
                updateUserStatus();
            }
        });
    }
    //退出
    ologout.onclick=function(){
        ajax('post', 'guestbook/index.php', 'm=index&a=logout', function(data) {
            var d = JSON.parse(data);
            alert(d.message);
            if (!d.code) {
                updateUserStatus();
            }
        });
        return false;
    }
    //留言
    oPostBtn.onclick = function(){

        ajax('post', '../html/guestbook/index.php', 'm=index&a=send&content='+encodeURI(oContent.value), function(data) {
            var d = JSON.parse(data);
            alert(d.message);
            if (!d.code) {
                creatLlist(d.data, true);
            }
            em1.html(d.page);
            em2.html(d.pages);
        });
    }
    //添加当前留言到列表中
    function getCookie(key) {
        var arr1 = document.cookie.split('; ');
        for (var i=0; i<arr1.length; i++) {
            var arr2 = arr1[i].split('=');
            if (arr2[0]==key) {
                return arr2[1];
            }
        }
    }
    //创建留言板
        var submit=$('#btnPost');
    //留言显示设置
    function showlist(){
        ajax('post','../html/guestbook/index.php','m=index&a=getList&n=4&page='+iPage,function(data){
           var d=JSON.parse(data);
           var data=d.data;
            em1.html(data.page);
            em2.html(data.pages);
            if(data){
                for(var i=0;i<data.list.length;i++){
                    creatLlist(data.list[i]);
                }
            }
            else{
               if(iPage==1){
                   olist.innerHTML="还没有留言，快来抢沙发吧~~~~~~";
                   olist.html('还没有留言，快来抢沙发吧~~~~~~');
               }
                oshowMore.style.display="none";
            }
        });
    }
    oshowMore.onclick=function(){
        iPage++;
        showlist();
    }
    function creatLlist(data){
        var otext=$('#content').val();
        var t=getLocalTime(data.dateline);
        var ol=$('<dl><dt><span class="name"><img src="../images/9.jpg " class="fl"/><a href="#" class="fl">'+data.username+'</a></span></dt><dd class="content">'+data.content+'</dd><dd class="bot_dd"><span class="time">'+t+'</span><a href="#" class="ding">顶（<span>'+data.support+'</span>)</a><a href="#" class="ding">踩（<span>'+data.oppose+'</span>)</a></dd></dl>');
        olist.prepend(ol);

    };
    //时间戳转化
    function getLocalTime(nS) {
        return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    };

};

