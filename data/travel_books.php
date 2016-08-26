<?php
  header('Content-Type:application/json');
  $conn=mysqli_connect('127.0.0.1','root','','mfw',3306);
  mysqli_query($conn,'SET NAMES UTF8');
  $sql='SELECT * FROM books';
  $result=mysqli_query($conn,$sql);
  $output=[];
  while(($row=mysqli_fetch_assoc($result))!==null){
    $output[]=$row;
  }
//  var_dump($output)
  echo json_encode($output);
?>