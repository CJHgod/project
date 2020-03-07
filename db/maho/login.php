<?php
$connect=mysqli_connect("localhost","root","","users");
mysqli_query($connect,"set names 'utf8'");

$username=$_REQUEST["username"];
$password=$_REQUEST["password"];

$sql1 = "SELECT * FROM  `userlist` WHERE `name` = '$username' and `password` = '$password'";
$result1=mysqli_query($connect,$sql1);
$data1=mysqli_fetch_array($result1);

$data=array("message"=>"","status"=>"","datas"=>"");

if($data1){
    $data["message"]="success";
    $data["status"]=1;
    $data["datas"]=$data1;

}else{
    $data["message"]="error";
    $data["status"]=0;
}



// if($result1){
//     $data1=mysqli_fetch_array($result1,MYSQLI_ASSOC);

//     if($data1){
//       $data["message"]="success";
//      $data["status"]=1;
//     }else{
//      $data["message"]="error";
//         $data["status"]=0;
//     }

// }else{
//     $data["message"]="数据库没有该用户";
//        $data["status"]=0;
//    }

   echo json_encode($data,true);


?>