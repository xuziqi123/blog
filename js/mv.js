/**
 * Created by admin on 2016/9/24.
 */
$(function(){
   $('.perday ul li').click(function(){
       var osrc=$(this).find('.a_img img').attr('dataSrc');
       $('.con_mv').html(' <embed src="'+osrc+'" allowFullScreen="true" quality="high" width="526" height="350" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>');
    });
    $('.perday ul li').hover(function(){
        $(this).find('.cover').animate({'height':'70px'},500);
    },function(){
        $(this).find('.cover').animate({'height':'0px'},500);
    });
});