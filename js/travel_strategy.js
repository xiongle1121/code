//轮播广告动效
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
	$('#buttons').on('click','li',function(e){
	  var curI=$('#buttons li.on').attr('data-index');
	  var tarI=$(this).attr('data-index');
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
		  left:-this.distance
	  },this.interval,function(){
	    $('#list li:lt('+n+')').appendTo('#list');
		$('#list').css('left',0);
		$('#buttons li:eq('+i+')').addClass('on').siblings('.on').removeClass('on');
	  });
	}
	if(n<0){
	  this.index+=n;
	  this.index<0&&(this.index=(this.size-1));
	  i=this.index;
	  $('#list').prepend($('#list li:gt('+(this.size-1+n)+')'));
      $('#list').css('left',this.distance+'px');
	  $('#list').stop().animate({
		  left:0
	  },this.interval,function(){
	      $('#buttons li:eq('+i+')').addClass('on').siblings('.on').removeClass('on');
	  });
	  console.log($('#list').css('left'))
	}
  }
}
window.onload=function(){
  slider.init();
}
//加载更多
function loadMore(){
  $.get('data/travel_books.php',function(data){
	for(var i=0;i<data.length;i++){
	  $('#book_rank').append("<dl><dt><a href='#'><img src='imgs/travel_strategy/"+data[i].src+"'></a></dt><dd>更新时间："+data[i].time+"</dd><dd>"+data[i].download+"人下载</dd></dl>");
	}
	rank();
    if($(["data-location='download'"]).hasClass('active')){
	  download();
	}
  })
}
loadMore();
$('#loadMore').click(function(e){
  e.preventDefault();
  loadMore();
});
/**下载人气和更新时间的排序**/
function rank(){
  $('#rank_title').on('click','a',function(e){
	  e.preventDefault();
	  if($(this).hasClass('active')){
		return;
	  }else{
		$(this).addClass('active').siblings('.active').removeClass('active');
		switch($(this).attr('data-location')){
		  case 'download':download();
		  break;
		  case 'update':update();
		  break;
		}
	  }
  })
}
function download(){
	var arr=[];
	$('#book_rank dl dd:last-child').each(function(){
        var nums=parseInt($(this).html());
		$(this).parent().attr('data-rank',nums);
		arr.push(nums);
	});
	arr.sort(function(a,b){return b-a;});
	$.each(arr,function(k,v){
	  $('#book_rank [data-rank="'+v+'"]').appendTo($('#book_rank'));
	})
}
function update(){}