$(function(){
    //图片轮播
    (function(){
        var timer=null;
        $('.small_ul li').click(function(){
            var index=$(this).index();
                $('.big_ul li').eq(index).fadeIn().siblings().fadeOut();
                $(this).addClass('hover').siblings().removeClass('hover');
                });
        $('.small_ul li').hover(function(){
            $(this).addClass('hovers');
        },function(){
            $(this).removeClass('hovers');
        });
        var clicknum=0;
        $('.next_btn').click(function(){
            clicknum++;
            if(clicknum>=2){
                clicknum=2;
            }
            $('.small_ul').animate({'left':-440*clicknum},800);
        });
        $('.prev_btn').click(function(){
            clicknum--;
            if(clicknum<0){
                clicknum=0;
            }
            $('.small_ul').animate({'left':-440*clicknum},800);
        });
        $('.lunbo').hover(function(){
            $('.btn_con').animate({'height':'60px'},900);
            clearInterval(timer);
        },function(){
            $('.btn_con').animate({'height':'0px'},900);
            time();
        });
        //定时器
        time();
        var num=0;

        function time(){

            timer=setInterval(function(){
                var length=$('.small_ul li').length;
                num++;
                if(num==length){
                    num=0;
                }
                $('.big_ul li').eq(num).fadeIn().siblings().fadeOut();
            },1500);
        }
    })();
    //音乐播放器开始
    (function(){
      var array=['images/sun2.jpg','images/xusong7.jpg','images/liu1.jpg','images/wu.jpg'];
      var index;
      var MS=0;
        var MP3;
       $('.div_list ul li').dblclick(function(){
          index=$(this).index();
           var usrc=$(this).find('a').attr('dataSrc');
           $('._btn .ting_a img').attr('src','images/zanting.svg');
           $(this).find('a').css({'color':'greenyellow',"background-image":"url(images/pause.png)"});
           $(this).siblings().find('a').css({'color':'white',"background-image":"url(images/fang22.png)"});
           $('.msc_img').find('img').attr('src',array[index]);
           MP3=creatmusic(usrc);
           MP3.play();
           setInterval(function(){
               jd();
           },1000);
       });
        //创建音乐播放器
        function creatmusic(src){
           var ms=$("<audio src='"+src+"'></audio>").get(0);
           $('.music_play').html("");
           $('.music_play').append(ms);
            MS=ms;
           return ms;
       }
        //进度条
        function jd(){
            var cTime=MS.currentTime;
            var aTime=MS.duration;
            var bl=(cTime/aTime)*$('.music .jindu').width();
            $('.jindu .span1').css('width',bl);
            $('.jindu .span2').animate({'left':bl-5},400);

        }
        //下一首
        $('._btn .next_a img').click(function(){
            index++;
            $('.div_list ul li').eq(index).trigger('dblclick');
            if(index>$('.div_list ul li').length){
                index=0;
            }
        });
        //上一首
        $('._btn .prev_a img').click(function(){
            index--;
            $('.div_list ul li').eq(index).trigger('dblclick');
            if(index>$('.div_list ul li').length){
                index=0;
            }
        });
        //暂停

        var a=1;
        $('._btn .ting_a img').click(function(){
            if(a==0){
                MP3.pause();
                $(this).attr('src','images/bofang1.svg');
                a++;
            }
            else{
               // creatmusic($('.div_list ul li').eq(3).find('a').attr('dataSrc')).play();
                MP3.play();
                $(this).attr('src','images/zanting.svg');
                a=0;
            }
        });
        //列表显示
        var b=0;
        $('._btn .list2 img').click(function(){
            alert(3);
            if(b==0){
                $('.btn_list').css('display','block');
                b++;
            }
            else{
                $('.btn_list').css('display','none');
                b=0;
            }
        });
        //收起
        var c=0;
        $('.back').click(function(){
            if(c==0){
                $('.control').animate({'width':"360px"},400,function(){
                    $('.div_list').animate({'height':"100px"},500);
                });
                c++;
            }
            else{

                $('.div_list').animate({'height':"0px"},400,function(){
                    $('.control').animate({'width':"20px"},500);
                });
                c=0;
            }
        });
    })();
    //进度条

    //音乐播放器结束

});