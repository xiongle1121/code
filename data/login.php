<?php
  header('Content-Type:application/json');
  $uname=$_REQUEST['uname'];
  $upwd=$_REQUEST['upwd'];
  $sql="SELECT id FROM user_table WHERE uname='$uname' AND upwd='$upwd'";
  $conn=mysqli_connect('127.0.0.1','root','','mfw',3306);
  mysqli_query($conn,'SET NAMES UTF8');
  $result=mysqli_query($conn,$sql);
  $row=mysqli_fetch_assoc($result);
  $str='';
  if($row){
    $str='成功';
  }else{
    $str='失败' ;
  }
  echo json_encode($str);
?>