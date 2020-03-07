
<?php
//点击加入购物车时
$connect=mysqli_connect("localhost","root","","users");
mysqli_query($connect,"set names 'utf8'");

//判断点击事件时，数据库是否存在该条数据    存在总数++就行
$shopid=$_REQUEST["shopsID"];
$shopName=$_REQUEST["shopName"];
$shopPrice=$_REQUEST["price"];
$imgSrc=$_REQUEST["img"];

//传个要加入购物车的总数过来
$totalNum=$_REQUEST["totalnum"];

$sql = "SELECT * FROM  `cartdata` WHERE `shopID` = '$shopid' ";
$result=mysqli_query($connect,$sql);
$data=mysqli_fetch_array($result,MYSQLI_ASSOC);

$dataArray=array("message"=>"","status"=>"","datas"=>"");


if($data){
    //如果存在   还要先查询出总数再相加     只要更新 totalnum字段即可
    $selectNum="SELECT `totalnum` FROM  `cartdata` WHERE `shopID` = '$shopid' ";
    $seling=mysqli_query($connect,$selectNum);
    $sum=mysqli_fetch_array($seling,MYSQLI_ASSOC);

    $totalNum2 =  $sum["totalnum"] + $totalNum;
     $updateSql=" UPDATE `cartdata` SET `totalnum` = '$totalNum2' WHERE `cartdata`.`shopId` = '$shopid'" ;
     $updateCart=mysqli_query($connect,$updateSql);
    $dataArray["message"]="更新数据库成功";
    $dataArray["status"]=1;
}else{

    //不存在则执行，插入语句
    $insetSql="INSERT INTO `cartdata` (`id`, `shopID`, `shopname`, `price`, `img`, `totalnum`,`isActive`) VALUES (NULL, '$shopid', '$shopName', '$shopPrice', '$imgSrc','$totalNum',1)";
    $addRes=mysqli_query($connect,$insetSql);

     $dataArray["message"]="插入数据成功";
    $dataArray["status"]=1;
    // $dataArray["datas"]=$data;
}

echo json_encode($dataArray,true);

?>