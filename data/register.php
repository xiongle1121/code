<?php
//注册成功的数据处理
  header('Content-Type:application/json');
  $uname=$_REQUEST['uname'];
  $upwd=$_REQUEST['upwd'];

  $sql="insert into user_table values(null,'$uname','$upwd')";
  $conn=mysqli_connect('127.0.0.1','root','','mfw',3306);
  mysqli_query($conn,'set names utf8');
  $result=mysqli_query($conn,$sql);
  if($result){
    echo json_encode('注册成功！');
  }else{
    echo json_encode('注册失败！');
  }
?>