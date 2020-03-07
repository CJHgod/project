<?php
$connect=mysqli_connect("localhost","root","","users");
mysqli_query($connect,"set names 'utf8'");

$shopid=$_REQUEST["shopsID"];
$shopNum=$_REQUEST["shopNum"];
$sql="UPDATE `cartdata` SET `totalnum` = '$shopNum' WHERE `cartdata`.`shopID` = '$shopid'";
mysqli_query($connect,$sql);

?>
