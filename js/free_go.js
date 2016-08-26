/*热门城市的显示和隐藏*/
$('#city_title').click(function(e){
  $(this).toggleClass('active').siblings().toggle();
  var div=$('.hot_pop')[0];
  $('body').one('click',function(e){
	 if(e.target!=div){
	   $(div).hide();
	 }
	 $('#city_title').removeClass('active');
  })
  e.stopPropagation();
  $(div).click(function(e){
	 e.stopPropagation();//阻止事件向上冒泡
  });
})   
/**hover时切换效果**/
function mouseToggle(obj){
  $(obj).on('mouseover','a',function(e){
    e.preventDefault();
	if($(this).hasClass('active')){
	  return;
	}else{
	  $(this).addClass('active').siblings('.active').removeClass('active');
	  $($(this).attr('href')).addClass('active').siblings('.active').removeClass('active');
	}
  })
}
/**字母城市的切换**/
mouseToggle('#alphabet');
/**主题推荐**/
mouseToggle('.title_toggle');
/**左侧导航的悬停切换**/
$('#details_area li').hover(function(){
   var me=this;
   $(this).addClass('active').siblings('.active').removeClass('active');
   $($(this).attr('data-show')).addClass('show').siblings('.show').removeClass('show');
   $($(this).attr('data-show')).hover(function(){
	   $(this).addClass('show');
	   $(me).addClass('active');
   },function(){
       $(this).removeClass('show');
	  $(me).removeClass('active');
   })
},function(){
  $(this).removeClass('active');
  $($(this).attr('data-show')).removeClass('show');
})
/*轮播*/
var slider={
  LIWIDTH:0,
  interval:200,
  distance:0,
  size:0,
  index:0,
  timer:null,
  canmove:true,
  init:function(){
    this.LIWIDTH=parseInt($('#list li').css('width'));
	this.size=$('#list li').length;
	var me=this;
	$('#next').click(function(e){
      e.preventDefault();
	  me.move(1);
    })
	$('#prev').click(function(e){
      e.preventDefault();
	  me.move(-1);
    })
	$('#buttons').on('click','a',function(e){
	  e.preventDefault();
	  var curI=$('#buttons li.active a').attr('href');
	  var tarI=$(this).attr('href');
	  var jumpI=tarI-curI;
	  if(jumpI==0){
	    return;
	  }else{
	    me.move(jumpI);
	  }
	})
	$('#container').mouseover(function(){
	  me.canmove=false;
	})
	$('#container').mouseout(function(){
	  me.canmove=true;
	})
    this.automove();
  },
  automove:function(){
	var me=this;
	setInterval(function(){
	  if(me.canmove){
	    console.log();
	    me.move(1);
	  }
	},2000);
  },
  move:function(n){
    this.distance=n*this.LIWIDTH;
	if(n>0){
	  this.index+=n;
	  this.index>(this.size-1)&&(this.index=0);
	  var i=this.index;
	  $('#list').stop().animate({
		  'left':-this.distance
	  },this.interval,function(){
	    $('#list li:lt('+n+')').appendTo('#list');
		$('#list').css('left',0);
		$('#buttons li:eq('+i+')').addClass('active').siblings('.active').removeClass('active');
	  });
	}
	if(n<0){
	  this.index+=n;
	  this.index<0&&(this.index=(this.size-1));
	  i=this.index;
	  $('#list').prepend($('#list li:gt('+(this.size-1+n)+')'));
      $('#list').css('left',this.distance+'px');
	  $('#list').stop().animate({
		  'left':0
	  },this.interval,function(){
	      $('#buttons li:eq('+i+')').addClass('active').siblings('.active').removeClass('active');
	  });
	}
  },
}
window.onload=function(){
  slider.init();
}