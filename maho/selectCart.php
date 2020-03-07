<?php
$connect=mysqli_connect("localhost","root","","users");
mysqli_query($connect,"set names 'utf8'");


$sql="SELECT * FROM  `cartdata`";
$result=mysqli_query($connect,$sql);
$data=mysqli_fetch_all($result,MYSQLI_ASSOC);


// print_r($data);

// $dataArray=array("message"=>"","status"=>"","datas"=>"$data");

echo json_encode($data,true);


?>