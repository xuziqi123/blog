/**
 * Created by admin on 2016/9/26.
 */
$(function(){
    var odiv=$('.muban1 div');
    var oli=$('.muban1 ul li');
    odiv.hide().eq(0).show();
    oli.each(function(index){
        $(this).mouseover(function(){
            odiv.hide().eq(index).show();
        });
    });
});