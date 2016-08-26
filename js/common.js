$(function(){ 
  $('footer').load('header.html footer');
  
  $('#out_main').load('header.html #main',function(){
    /**意见反馈框的弹出和隐藏**/
	$('#yijian').click(function(e){ 
	  e.preventDefault();
	  $('#present textarea').val('');
	  $('#present span').css('opacity',0);
	  $('#present').css('display','block').siblings('div').css('display','none');
	  $('#yj_pop').fadeIn();
	})
	$('#yj_close').click(function(e){
	  e.preventDefault();
	  $('#yj_pop').fadeOut();
	})
	/**意见反馈 提交按钮的提交的时候做验证**/
	$('#present>p>a').click(function(e){
	  e.preventDefault();
	  if($(this).parent().siblings('textarea').val().trim()){
		$(this).parent().parent().css('display','none').siblings('div').css('display','block');
	  }else{
		$(this).siblings('span').css('opacity',1);
	  } 
	})
	/**返回顶部动画**/
	window.onscroll=function(){
	  var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	  if(scrollTop===0){
		$('#top').css('opacity',0);
	  }else{
		$('#top').css('opacity',1);
	  }
	   //$('#top').css('opacity',scrollTop===0?0:1);
	}
	$('#top').click(function(e){
	  e.preventDefault();
	  var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	  var timer=setInterval(function(){
		scrollTop-=10;
		document.body.scrollTop=scrollTop;
		if(scrollTop<=0){
		  clearInterval(timer);
		}
	  },6)
	})
  });
  
  $('header').load('header.html header',function(){
	/**打卡的弹出框和关闭效果**/
	$('#card').click(function(e){
	  e.preventDefault();
	  $('#card_container').css('display','block');
	})
	$('#card_close').click(function(){
	  $('#card_container').css('display','none');
	})
	/**奔跑的小汽车**/
	function carMove(){
	  var cars=$('#car img');
	  var index=0;
	  setInterval(function(){
		index++;
		for(var i=0;i<cars.length;i++){
		  cars.css('display','none');
		}
		if(index===6){
		  index=0;
		}
		$(cars[index]).css('display','block');
	  },100)
	}
	carMove();
	/**打卡和每日任务间的切换**/
	$('#dayTask').click(function(e){
	  e.preventDefault();
	  $(this).addClass('dayTask');
	  $(this).prev().removeClass('card');
	  $($(this).attr('href')).addClass('show');
	  $($(this).prev().attr('href')).addClass('dismiss');
	  $('#car').addClass('dismiss');
	})
	$('#t_card').click(function(e){
	  e.preventDefault();
	  $(this).addClass('card');
	  $(this).siblings('a').removeClass('dayTask');
	  $($(this).attr('href')).removeClass('dismiss');
	  $($(this).siblings('a').attr('href')).removeClass('show');
	  $('#car').removeClass('dismiss');
	})
	/**登录框的显示与隐藏**/
	$('#login_bt').click(function(e){
	  e.preventDefault();
	  $('#login_box').fadeIn();
	  $('#login_form [name=upwd]').val('');
	})
	$('#login_close').click(function(){
	  $('#login_box').fadeOut();
	})
	/**登录框的验证**/
	$('#login_form [type=text]').blur(function(){
	  if(!($(this).val().trim())){
		$('#login_error').css('opacity',1).html('用户名不能为空！');
	  }else{
		$('#login_error').css('opacity',0);
	  }
	})
	$('#login_form [type=password]').blur(function(){
	  if(!($(this).val().trim())){
		$('#login_error').css('opacity',1).html('密码不能为空！');
	  }else{
		$('#login_error').css('opacity',0);
	  }
	})
    $('#bt_login').click(function(){
	  var result=$('#login_form').serialize();
	  var uname=$('#login_form [name=uname]').val();
	  var upwd=$('#login_form [name=upwd]').val();
	  $.post('data/login.php',result,function(data){
		if(data==='失败'){
		  $('#login_error').css('opacity',1).html('用户名或密码错误！');
		}else{
		  $('#login_out').hide();
		  $('#login_box').fadeOut();
		  $('#login_in').show();
		  localStorage.setItem('uname',uname);
		  localStorage.setItem('upwd',upwd);
		}
	  })
	})
    //**点击quit退出当前登录**
	$('#login_quit').click(function(e){
	  e.preventDefault();
	  $('#login_out').css('display','block');
	  $('#login_in').css('display','none');
	  localStorage.setItem('uname','');
	  localStorage.setItem('upwd','');
	})
  }); 
})