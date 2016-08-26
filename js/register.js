 /*注册和登录之间的切换*/
 function bottom_toggle(e){
   e.preventDefault();
   $(this).parent().parent().hide();
   var id=$(this).attr('href');
   $(id).show();
 }
 $('#rn_login').click('e',bottom_toggle);
 $('#rn_register').click('e',bottom_toggle);
 /*验证码 h5绘图*/
 /*绘制矩形，作为背景*/
 /*随机颜色*/
 function Randomtext(){
	$('svg').html('');
	function rc(min,max){
	   var r=Math.floor(Math.random()*(max-min)+min);
	   var g=Math.floor(Math.random()*(max-min)+min);
	   var b=Math.floor(Math.random()*(max-min)+min);
	   return 'rgb('+r+','+g+','+b+')';
	 }
	 var bg=document.createElementNS('http://www.w3.org/2000/svg','rect');
	 bg.setAttribute('width',100);
	 bg.setAttribute('height',30);
	 bg.setAttribute('fill',rc(200,240));
	 Rtext.appendChild(bg);
	 /*随机文本*/
	 var text='abcdefghijkmnpqsrtwxyzABCDEFGHJKMNPQRSTWXYZ23456789';
	 /*随机数*/
	 function rn(min,max){
	   var i=Math.floor(Math.random()*(max-min)+min);
	   return i;
	 }
	 var arr=[];
	 for(var j=0;j<4;j++){
	   var txt=text[rn(0,text.length-1)];
	   arr[arr.length]=txt;
	 }
	 for(var i=0;i<arr.length;i++){
	   /*添加文本*/
	   var t=document.createElementNS('http://www.w3.org/2000/svg','text');
	   t.innerHTML=arr[i];
	   t.setAttribute('x',20*i+rn(-2,2)+12);
	   t.setAttribute('y',25);
	   t.setAttribute('fill',rc(0,120));
	   t.setAttribute('font-weight','bold');
	   t.setAttribute('font-size',rn(25,30));
	   t.setAttribute('rotate',rn(-15,15));
	   Rtext.appendChild(t);
	   /*添加干扰线*/
	   var l=document.createElementNS('http://www.w3.org/2000/svg','line');
	   l.setAttribute('x1',rn(0,100));
	   l.setAttribute('y1',rn(0,30));
	   l.setAttribute('x2',rn(0,100));
	   l.setAttribute('y2',rn(0,30));
	   l.setAttribute('stroke',rc(50,100));
	   Rtext.appendChild(l);
	 }
	 /*添加杂色*/
	 for(var i=0;i<50;i++){
	   var c=document.createElementNS('http://www.w3.org/2000/svg','circle');
	   c.setAttribute('cx',rn(1,99));
	   c.setAttribute('cy',rn(1,29));
	   c.setAttribute('r',1);
	   c.setAttribute('fill',rc(50,200));
	   Rtext.appendChild(c);
	 }
 }
 Randomtext();
 $('#changeNext').click(function(e){
   e.preventDefault();
   Randomtext();
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
      $('#waiting').show();//??为什么等待的图片不能出来
	/*var time=new Date();
	  do{
	    var now=new Date();
	  }while((now-time)<5000);*/
	  location.href='index.html';
	  $('#login_out').hide();
	  $('#login_box').fadeOut();
	  $('#login_in').show();
	  localStorage.setItem('uname',uname);
	  localStorage.setItem('upwd',upwd);
	}
  })
})
/**注册验证**/
$(function(){
  /*用户名验证*/
  var uname=false;
  var upwd=false;
  var supwd=false;
  var utext=false;
  $('#register_form [name=uname]').blur(function(){
	var str=$(this).val();
	var Preg=/^(0086)?(\+86)?1[3578]\d{9}$/;//手机号正则
	var Ereg=/^(\w*\.*)+@(\w?)+(\.\w{2,})+$/;//邮箱正则
	if(!str){
	  $('#uname_error').css('opacity',1).html('用户名不能为空！');
	}else{
	  $('#uname_error').css('opacity',0);
	}
	if(!(Ereg.test(str)||Preg.test(str))){
	  $('#uname_error').css('opacity',1).html('格式不正确！');
	  uname=false;
	}else{
	  $('#uname_error').css('opacity',0);
	  $.get('data/register_unique.php?uname='+str,function(data){
	    if(data=='exists'){
		  $('#uname_error').css('opacity',1).html('用户名已被占用！');
		  uname=false;
		}else{
		  uname=true;
		}
	  })
	}
  }) 
  /*密码验证*/
  $('#register_form [name=upwd]').blur(function(){
    var str=$(this).val();
	var reg=/^\w{6,12}$/;//密码正则
    if(!str){
	  $('#upwd_error').css('opacity',1).html('密码不能为空！');
	}else{
	  $('#upwd_error').css('opacity',0);
	}
	if(!reg.test(str)){
	  $('#upwd_error').css('opacity',1).html('格式不正确！');
	  upwd=false;
	}else{
	  $('#upwd_error').css('opacity',0);
	  upwd=true;
	}
  })
  /*确认密码*/
  $('#register_form [name=supwd]').blur(function(){
    var str=$(this).val();
	var pwd=$(this).prev().prev().val();
	if(!(str===pwd)){
	  $('#supwd_error').css('opacity',1).html('两次密码不一致！');
	  supwd=false;
	}else{
	  $('#supwd_error').css('opacity',0);
	  supwd=true;
	}
  })
  /*验证码验证*/
  $('#register_form .valid input').blur(function(){
	var text=($('svg').text()).toUpperCase();
	var str=($(this).val()).toUpperCase();
	if(!(text===str)){
	  $('#text_error').css('opacity',1).html('验证码不正确！');
	  text=false;
	}else{
	  $('#text_error').css('opacity',0);
	  utext=true;
	}
  })
  $('#bt_register').click(function(){
	if(uname&&upwd&&supwd&&utext){
	  var user_name=$('#register_form [name=uname]').val();
	  var user_pwd=$('#register_form [name=upwd]').val();
	  console.log(user_name+','+user_pwd)
	  $.post('data/register.php',{'uname':user_name,'upwd':user_pwd},function(data){
	    alert(data);
        $('#register_form [name=uname]').val('');
        $('#register_form [name=upwd]').val('');
        $('#register_form [name=supwd]').val('');
        $('#register_form [name=text]').val('');
	  })
	}
  })
})