/**搜索框的切换**/
$('#search').on('click','a',function(e){
  e.preventDefault();
  $(this).addClass('active').siblings('.active').removeClass('active');
  var $id=$(this).attr('href');
  $($id).addClass('active').siblings('.active').removeClass('active');
})
/**一元自由行的动画效果**/
$('#free').on('click','a',function(e){
  e.preventDefault();
  $(this).parent().addClass('active').siblings('.active').removeClass('active');
  var $id=$(this).attr('href');
  $($id).addClass('active').siblings('.active').removeClass('active');
})
/**热门游记 最新发表的切换**/
$('#travel_choice').on('click','a',function(e){
  e.preventDefault();
  $(this).addClass('active').siblings('.active').removeClass('active');
  $id=$(this).attr('href');
  $($id).addClass('active').siblings('.active').removeClass('active');
})
/**横幅大广告轮播**/
var Bslider={
  index:0,
  moved:0,
  length:0, //数组的长度
  imgs:[],  //放大图片的数组
  Interval:2000,
  timer:null,
  init:function(){
	this.index=$('#BB_index');
    this.imgs=$('#BigBanner li');
	this.length=this.imgs.length;
	this.timer=setInterval(this.move.bind(this),this.Interval);
	var me=this;
	$('#BigBanner').mouseover(this.stop.bind(this));
	$('#BigBanner').mouseout(this.restart.bind(this));
	$('#BB_index').mouseover(this.stop.bind(this));
	$('#BB_index').on('click','a',function(e){
	  e.preventDefault();
	  $('#BB_index li.active').removeClass('active');
	  $('#BigBanner li.active').removeClass('active');
	  var i=$(this).attr('href');
	  console.log(i);
	  $(this).parent().addClass('active');
	  $(me.imgs[i]).addClass('active');
	})
  },
  stop:function(){
    clearInterval(this.timer);
	this.timer=null;
  },
  restart:function(){
	this.timer=setInterval(this.move.bind(this),this.Interval);
  },
  move:function(){
	var now=$('#BigBanner li.active');
    var curr_li=$('#BB_index li.active');
	this.moved=$('#BB_index li.active a').attr('href');
	if(this.moved==(this.length-1)){
	  $(now).removeClass('active');
      $('#BigBanner li:first-child').addClass('active');
	  $(curr_li).removeClass('active');
      $('#BB_index li:first-child').addClass('active');
	}else{
	  $(now).removeClass('active');
	  $(now).next().addClass('active');
	  $(curr_li).removeClass('active');
	  $(curr_li).next().addClass('active');
	}
  },
}
Bslider.init();
/**左侧轮播的小广告**/

var Sslider={
  LIWIDTH:260, //li的宽度
  lis:[],   //存放li的数组
  moved:0,   //移动了多少步数
  step:0,    //步长
  STEPS:40, //移动的总步数
  distance:0,//移动的总距离
  interval:0,//动画间隔
  DURATION:80,
  timer:null,

  WAIT:1000,

  init:function(){
	this.interval=this.DURATION/this.STEPS;
	var lis=$('#small_slider li');
	var me=this;
	$('#dotted a').mouseover(function(){
	  if(me.timer===null){
	    var starti=$('#dotted .active').attr('href');
        var endi=$(this).attr('href');
		me.move(endi-starti);
        $('#dotted .active').removeClass('active');
	    $(this).addClass('active');
	  }
	})	
  },
  move:function(n){
	this.distance=n*this.LIWIDTH;
	this.step=this.distance/this.STEPS;
    if(this.timer===null){
	  this.timer=setTimeout(this.moveStep.bind(this,n),this.interval);
	}
  },
  moveStep:function(n){//ul移动一步
	var left=parseFloat($('#small_slider').css('left'));
	$('#small_slider').css('left',left-this.step+'px');
	this.moved++;
	if(this.moved<this.STEPS){
	  this.timer=setTimeout(this.moveStep.bind(this,n),this.interval);
	}else{
	  clearTimeout(this.timer);
	  this.timer=null;
	  this.moved=0;
	}
  },
}
Sslider.init();
/*跑马灯效果*/
/*鼠标移入feeds时，高度变化*/
$('.feeds').hover(function(){
  var maxH=$('#first_addr img').css('height');
  $(this).stop().animate({height:maxH},1000);
},function(){
  var minH=$(this).css('min-height');
  $(this).stop().animate({height:minH},1000);
})
/**跑马灯效果**/
window.addEventListener('load',function(){
  var ulH=parseFloat($('.feeds ul').css('height'));
  var divH=parseFloat($('.feeds').css('height'));
  var imgH=parseFloat($('#first_addr img').css('height'));
  var moveTop=ulH;
  var top=parseFloat($('.feeds ul').css('top'));
  setInterval(function(){
	top--;
	if(top<=-moveTop){
	  var divH=parseFloat($('.free li.active .feeds').css('height'));
	  top=divH;
	}
	$('.feeds ul').css('top',top+'px');
  },50)
})
//**用webStorage实现的自动登录功能**
window.onload=function(){
  var uname=localStorage.getItem('uname');
  var upwd=localStorage.getItem('upwd');
  $.post('data/login.php',{'uname':uname,'upwd':upwd},function(data){
	if(data==='成功'){
	  $('#login_out').css('display','none');
	  $('#login_box').fadeOut();
	  $('#login_in').css('display','block');
	}
  })
}
