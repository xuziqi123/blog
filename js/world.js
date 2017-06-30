/**
 * Created by admin on 2016/9/27.
 */
$(function(){

    var num=0;
    var length=$('.main_wtL ul li').length;
    var timer=null;
    $('.main_wtL ul li').each(function(index){
        var Index=$(this).index();
    });
    atuoplay();
    function atuoplay(){
        timer=setInterval(function(){
            num++;
            if(num==length){
                num=0;
            }
            $('.main_wtL ul li').eq(num).fadeIn().siblings().fadeOut();
            $('.main_wtL ol li').eq(num).addClass('run').siblings().removeClass('run');
        },1000);
    }
    $('.main_wtL ').hover(function(){
        clearInterval(timer);
    },function(){
        atuoplay();
    });
    $('.main_wtL ol li').click(function(){
        var index2=$(this).index();
        $('.main_wtL ul li').eq(index2).fadeIn().siblings().fadeOut();
        $(this).addClass('run').siblings().removeClass('run');
    });
});