<?php
$connect=mysqli_connect("localhost","root","","users");
mysqli_query($connect,"set names 'utf8'");

$shopid=$_REQUEST["shopsID"];
$isActive=$_REQUEST["isActive"];

$allShops=$_REQUEST["allShop"];

if($allShops=="no"){
    $sql="UPDATE `cartdata` SET `isActive` = '$isActive' WHERE `cartdata`.`shopID` = '$shopid'" ;

}else if($allShops=="all"){
    $sql="UPDATE `cartdata` SET `isActive` = 1 " ;
}else if($allShops=="noAll"){
    $sql="UPDATE `cartdata` SET `isActive` = 0 " ;
}

mysqli_query($connect,$sql);

?>
