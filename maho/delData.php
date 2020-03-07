<?php
$connect=mysqli_connect("localhost","root","","users");
mysqli_query($connect,"set names 'utf8'");

$shopid=$_REQUEST["shopsID"];

if($shopid=="all"){
    $sql=" DELETE FROM `cartdata` " ;

    mysqli_query($connect,$sql);
}else if(is_array($shopid)){
    foreach ($shopid as $key => $value) {
        $sql=" DELETE FROM `cartdata` WHERE `cartdata`.`shopID` = '$value' " ;
        mysqli_query($connect,$sql);
    }
}else{
    $sql=" DELETE FROM `cartdata` WHERE `cartdata`.`shopID` = '$shopid' " ;

    mysqli_query($connect,$sql);
}






?>
