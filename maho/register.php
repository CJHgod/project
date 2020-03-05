<?php

$connect=mysqli_connect("localhost","root","","users");
mysqli_query($connect,"set names 'utf8'");

// header('content-type:text/json;charset=utf-8');
$username=$_REQUEST["username"];
$password=$_REQUEST["password"];
$email=$_REQUEST["email"];
$phone=$_REQUEST["phone"];


//查询操作
$sql1 = "SELECT * FROM  `userlist` WHERE `name` = '$username'";
$result1=mysqli_query($connect,$sql1);
$data1=mysqli_fetch_array($result1,MYSQLI_ASSOC);



$data=array("message"=>"","status"=>"");
// if($result){
//     $data["message"]="success";
//     $data["status"]=1;
// }else{
//     $data["message"]="error";
//     $data["status"]=0;
// }

if($data1){
    $data["message"]="用户名重复，注册失败";
    $data["status"]=0;
    echo json_encode($data,true);
}else{
       //插入操作
$sql="INSERT INTO `userlist` (`id`, `name`, `password`, `email`, `phone`) VALUES (NULL, '$username', '$password', '$email', '$phone')";
$result=mysqli_query($connect,$sql);  //成功会返回1  ,不成功为空 也就是false
    if($result){
    $data["message"]="注册成功";
    $data["status"]=1;
    }else{
        $data["message"]="error";
        $data["status"]=2;
    }

    echo json_encode($data,true);
}












mysqli_close($connect);



?>