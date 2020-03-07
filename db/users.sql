-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1:3306
-- 生成日期： 2020-03-07 13:01:57
-- 服务器版本： 5.7.24
-- PHP 版本： 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `users`
--

-- --------------------------------------------------------

--
-- 表的结构 `cartdata`
--

DROP TABLE IF EXISTS `cartdata`;
CREATE TABLE IF NOT EXISTS `cartdata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shopID` int(50) NOT NULL,
  `shopname` varchar(300) NOT NULL,
  `price` varchar(300) NOT NULL,
  `img` varchar(300) NOT NULL,
  `totalnum` int(200) NOT NULL,
  `isActive` int(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `userlist`
--

DROP TABLE IF EXISTS `userlist`;
CREATE TABLE IF NOT EXISTS `userlist` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(300) NOT NULL,
  `phone` varchar(200) NOT NULL,
  `cartnum` int(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `userlist`
--

INSERT INTO `userlist` (`id`, `name`, `password`, `email`, `phone`, `cartnum`) VALUES
(4, '12344', '12345a', '1235@qq.com', '16754756777', 0),
(3, '1234', '12345a', '1235@qq.com', '16754756777', 0),
(5, '12345', '12345a', '12342@qq.com', '17657657567', 0),
(6, '123445', '12345a', '1234@qq.com', '16757567577', 0),
(7, 'aaab', '12345a', 'wo@qq.com', '17567567777', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
