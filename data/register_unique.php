<?php
  //用户名是否重复
  header('Content-Type:application/json');
  $uname=$_REQUEST['uname'];
  $sql="select id from user_table where uname='$uname'";
  $conn=mysqli_connect('127.0.0.1','root','','mfw',3306);
  mysqli_query($conn,'set names utf8');
  $result=mysqli_query($conn,$sql);
  $row=mysqli_fetch_assoc($result);
  if($row){
    echo json_encode('exists');
  }else{
    echo json_encode('noexists');
  }
?>