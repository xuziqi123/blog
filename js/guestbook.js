/**
 * Created by admin on 2016/9/20.
 */
window.onload=function(){
    var obtnReg=document.getElementById('btnReg');
    var ousername1=document.getElementById('username1');
    var opassword1=document.getElementById('password1');
    var ousername2=document.getElementById('username2');
    var opassword2=document.getElementById('password2');
    var overifyUserNameMsg=document.getElementById('verifyUserNameMsg');
     var ouserinfo=document.getElementById('userinfo');
    var ologout=document.getElementById('logout');
    var ologout2=document.getElementById('logout2');
    status();
    function status(){
        var uid = getCookie('uid');
        var username = getCookie('username');
        if (uid) {
            //如果是登陆状态
            ouserinfo.innerHTML = username;
        } else {
            ouserinfo.innerHTML = '';
        }
    }
    //获取cookie值
    function getCookie(key) {
        var arr1 = document.cookie.split('; ');
        for (var i=0; i<arr1.length; i++) {
            var arr2 = arr1[i].split('=');
            if (arr2[0]==key) {
                return arr2[1];
            }
        }
    }
    ousername1.onblur=function(){
        ajax('get','../html/guestbook/index.php','m=index&a=verifyUserName&username=' + this.value, function(data){
            var d=JSON.parse(data);
            overifyUserNameMsg.innerHTML= d.message;
        });
    }
    obtnReg.onclick=function(){
        ajax('post', '../html/guestbook/index.php', 'm=index&a=reg&username='+encodeURI(ousername1.value)+'&password=' + opassword1.value, function(data) {
            var d = JSON.parse(data);
            alert(d.message);
            if(d.code==0){
                $('#login').css('display','block');
                $('#regist').css('display','none');
                $('#logout').html('登录');
            }
        });
    }
    var oUsername2 = document.getElementById('username2');
    var oPassword2 = document.getElementById('password2');
    var oLoginBtn = document.getElementById('btnLogin');
    oLoginBtn.onclick = function() {
        ajax('post', '../html/guestbook/index.php', 'm=index&a=login&username='+encodeURI(oUsername2.value)+'&password=' + oPassword2.value, function(data) {
            var d = JSON.parse(data);
            alert(d.message);
            if(d.code==0){
                window.location.href='myblog.html';
            }
        });
    }
    var ologout = document.getElementById('logout');
    ologout.onclick=function out(){
        ajax('post', '../html/guestbook/index.php', 'm=index&a=logout', function(data) {
            var d = JSON.parse(data);
            alert(d.message);
            if(d.code==0){
                ouserinfo.innerHTML = '';
            }
        });
        return false;
    }
};