-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        10.1.20-MariaDB - mariadb.org binary distribution
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 hotel 的数据库结构
CREATE DATABASE IF NOT EXISTS `hotel` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `hotel`;

-- 导出  表 hotel.admin 结构
CREATE TABLE IF NOT EXISTS `admin` (
  `aid` int(6) NOT NULL AUTO_INCREMENT,
  `aname` varchar(50) NOT NULL DEFAULT '0' COMMENT '管理员的姓名',
  `aflag` int(11) NOT NULL DEFAULT '0' COMMENT '管理员的权限0为超管，什么都能看，1为收银员',
  `aphone` varchar(50) NOT NULL DEFAULT '0' COMMENT '管理员的手机号，用来登陆',
  `apwd` varchar(50) NOT NULL DEFAULT '0' COMMENT '管理员的登陆密码',
  PRIMARY KEY (`aid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='管理员表';

-- 正在导出表  hotel.admin 的数据：~2 rows (大约)
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
REPLACE INTO `admin` (`aid`, `aname`, `aflag`, `aphone`, `apwd`) VALUES
	(1, 'admin', 0, '13598342392', '111'),
	(2, '小明', 1, '111', '111');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

-- 导出  表 hotel.employee 结构
CREATE TABLE IF NOT EXISTS `employee` (
  `eid` int(6) NOT NULL AUTO_INCREMENT,
  `ename` varchar(50) DEFAULT NULL COMMENT '员工姓名',
  `eage` int(100) DEFAULT NULL COMMENT '员工年龄',
  `esex` varchar(50) DEFAULT NULL COMMENT '性别',
  `ephone` varchar(50) DEFAULT NULL COMMENT '员工联系方式',
  `eidcard` varchar(50) DEFAULT NULL COMMENT '员工身份证号',
  `eposition` varchar(50) DEFAULT NULL COMMENT '员工职位',
  `emoney` varchar(50) DEFAULT NULL COMMENT '员工工资',
  PRIMARY KEY (`eid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='员工表';

-- 正在导出表  hotel.employee 的数据：~7 rows (大约)
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
REPLACE INTO `employee` (`eid`, `ename`, `eage`, `esex`, `ephone`, `eidcard`, `eposition`, `emoney`) VALUES
	(1, '张三', 23, '女', 'J6tvTVhmhBQ=', 'Soq0+3mdpp801ktrjIBfCPRcIWpgJcVF', '维修', '8000'),
	(2, '李四', 26, '男', 't1lEGFNnF4E=', 'J7gctHmlRRX2FZhvBabf/OVdYTbg93n0', '大厅经理', '7500'),
	(3, '王五', 35, '男', 't1lEGFNnF4E=', 'J7gctHmlRRX2FZhvBabf/OVdYTbg93n0', '保洁', '5000'),
	(4, '赵六', 26, '女', 't1lEGFNnF4E=', 'gnUC0ZEanxjKQ3/g3VVgwVkkEl6QrBd6', '前台', '5000'),
	(5, '孙七', 28, '女', 't1lEGFNnF4E=', 'zBh0Xazluhdryce04BBI/00BYEBRX6LH', '前台', '5000'),
	(6, '周八', 35, '男', 't1lEGFNnF4E=', '4DDK9RsMjuT31MPnRlTc1RP7BxSACS9P', '保洁', '5000'),
	(7, '王九一', 35, '男', 't1lEGFNnF4E=', 'gnUC0ZEanxjKQ3/g3VVgwVkkEl6QrBd6', '维修', '8000');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;

-- 导出  表 hotel.reserve 结构
CREATE TABLE IF NOT EXISTS `reserve` (
  `reserveId` int(6) NOT NULL AUTO_INCREMENT,
  `reserveBeginTime` timestamp NULL DEFAULT NULL COMMENT '预定开始时间',
  `reserveEndTime` timestamp NULL DEFAULT NULL COMMENT '预定结束时间',
  `uid` int(6) DEFAULT '0',
  `rid` int(6) DEFAULT '0',
  PRIMARY KEY (`reserveId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='预定表';

-- 正在导出表  hotel.reserve 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `reserve` DISABLE KEYS */;
REPLACE INTO `reserve` (`reserveId`, `reserveBeginTime`, `reserveEndTime`, `uid`, `rid`) VALUES
	(1, '2020-02-13 00:00:00', '2020-02-15 00:00:00', 42, 6),
	(5, '2020-02-13 00:00:00', '2020-02-15 00:00:00', 43, 2);
/*!40000 ALTER TABLE `reserve` ENABLE KEYS */;

-- 导出  表 hotel.room 结构
CREATE TABLE IF NOT EXISTS `room` (
  `rid` int(6) NOT NULL AUTO_INCREMENT,
  `rserial` varchar(50) DEFAULT NULL COMMENT '房间编号',
  `uid` int(6) DEFAULT NULL COMMENT '用户外键',
  `rpic` varchar(1000) DEFAULT NULL COMMENT '房间图片',
  `rprice` double DEFAULT NULL COMMENT '房间价格',
  `rcontent` varchar(5000) DEFAULT NULL COMMENT '房间介绍',
  `rstatus` varchar(50) DEFAULT NULL COMMENT '房间状态 0为可用，1为不可用，2为预定状态',
  `rtype` varchar(50) DEFAULT NULL COMMENT '房间类型',
  PRIMARY KEY (`rid`),
  KEY `rid` (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COMMENT='房间';

-- 正在导出表  hotel.room 的数据：~37 rows (大约)
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
REPLACE INTO `room` (`rid`, `rserial`, `uid`, `rpic`, `rprice`, `rcontent`, `rstatus`, `rtype`) VALUES
	(1, '101', 20, '101.jpg', 98, '内部东西齐全，南北通透', '1', '标间'),
	(2, '102', 44, '102.jpg', 98, '内部东西齐全，南北通透', '1', '标间'),
	(3, '103', 44, '103.jpg', 98, '内部东西齐全，南北通透', '1', '标间'),
	(4, '104', 0, '104.jpg', 98, '内部东西齐全，南北通透', '0', '标间'),
	(5, '105', 0, '105.jpg', 98, '内部东西齐全，南北通透', '0', '标间'),
	(6, '106', 42, '106.jpg', 98, '内部东西齐全，南北通透', '2', '标间'),
	(7, '107', 0, '107.jpg', 98, '内部东西齐全，南北通透', '0', '标间'),
	(8, '201', 0, '201.jpg', 135, '内部东西齐全，南北通透', '0', '大床间'),
	(9, '202', 0, '202.jpg', 135, '内部东西齐全，南北通透', '0', '大床间'),
	(10, '203', 0, '203.jpg', 135, '内部东西齐全，南北通透', '0', '大床间'),
	(11, '204', 0, '204.jpg', 135, '内部东西齐全，南北通透', '0', '大床间'),
	(12, '205\r\n', 0, '205.jpg', 135, '内部东西齐全，南北通透', '0', '大床间'),
	(13, '206', 0, '206.jpg', 135, '内部东西齐全，南北通透', '0', '大床间'),
	(14, '207', 0, '207.jpg', 135, '内部东西齐全，南北通透', '0', '大床间'),
	(15, '301', 0, '301.jpg', 185, '内部东西齐全，南北通透', '0', '双人间'),
	(16, '302', 0, '302.jpg', 185, '内部东西齐全，南北通透', '0', '双人间'),
	(17, '303', 0, '303.jpg', 185, '内部东西齐全，南北通透', '0', '双人间'),
	(18, '304', 0, '304.jpg', 185, '内部东西齐全，南北通透', '0', '双人间'),
	(19, '305', 0, '305.jpg', 185, '内部东西齐全，南北通透', '0', '双人间'),
	(20, '306', 0, '306.jpg', 185, '内部东西齐全，南北通透', '0', '双人间'),
	(21, '307', 0, '308.jpg', 185, '内部东西齐全，南北通透', '0', '双人间'),
	(22, '401', 0, '401.jpg', 235, '内部东西齐全，南北通透', '0', '三人间'),
	(23, '402', 0, '402.jpg', 235, '内部东西齐全，南北通透', '0', '三人间'),
	(24, '403', 0, '403.jpg', 235, '内部东西齐全，南北通透', '0', '三人间'),
	(25, '404', 0, '404.jpg', 235, '内部东西齐全，南北通透', '0', '三人间'),
	(26, '405', 0, '405.jpg', 235, '内部东西齐全，南北通透', '0', '三人间'),
	(27, '406', 0, '406.jpg', 235, '内部东西齐全，南北通透', '0', '三人间'),
	(28, '407', 0, '407.jpg', 235, '内部东西齐全，南北通透', '0', '三人间'),
	(29, '501', 0, '501.jpg', 285, '内部东西齐全，南北通透', '0', '豪华套间'),
	(30, '502', 0, '502.jpg', 285, '内部东西齐全，南北通透', '0', '豪华套间'),
	(31, '503', 0, '503.jpg', 285, '内部东西齐全，南北通透', '0', '豪华套间'),
	(32, '504', 0, '504.jpg', 285, '内部东西齐全，南北通透', '0', '豪华套间'),
	(33, '505', 0, '505.jpg', 285, '内部东西齐全，南北通透', '0', '豪华套间'),
	(34, '506', 0, '506.jpg', 285, '内部东西齐全，南北通透', '0', '豪华套间'),
	(35, '601', 0, '601.jpg', 350, '内部东西齐全，南北通透', '0', '总统套间'),
	(36, '602', 0, '602.jpg', 350, '内部东西齐全，南北通透', '0', '总统套间'),
	(37, '603', 0, '603.jpg', 350, '内部东西齐全，南北通透', '0', '总统套间');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;

-- 导出  表 hotel.roomrecord 结构
CREATE TABLE IF NOT EXISTS `roomrecord` (
  `record_id` int(6) NOT NULL AUTO_INCREMENT,
  `rid` int(6) DEFAULT NULL,
  `uid` int(6) DEFAULT NULL,
  `record_start` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '开始入住时间',
  `record_end` timestamp NULL DEFAULT NULL COMMENT '入住结束时间',
  `record_state` varchar(50) DEFAULT '1' COMMENT '房间状态：0为已退   1为正在入住',
  `record_money` double NOT NULL DEFAULT '0' COMMENT '住房的总钱数',
  PRIMARY KEY (`record_id`),
  KEY `record_id` (`record_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COMMENT='客房记录';

-- 正在导出表  hotel.roomrecord 的数据：~10 rows (大约)
/*!40000 ALTER TABLE `roomrecord` DISABLE KEYS */;
REPLACE INTO `roomrecord` (`record_id`, `rid`, `uid`, `record_start`, `record_end`, `record_state`, `record_money`) VALUES
	(1, 1, 1, '2020-01-01 14:15:24', '2020-01-02 14:15:21', '0', 98),
	(2, 2, 2, '2020-01-01 14:15:24', '2020-01-05 18:39:56', '0', 392),
	(3, 3, 3, '2020-01-01 14:15:24', '2020-01-05 18:39:56', '0', 392),
	(4, 4, 4, '2020-01-01 14:15:24', '2020-01-05 18:39:56', '0', 392),
	(5, 5, 5, '2020-01-01 14:15:24', '2020-01-05 18:39:56', '0', 98),
	(6, 6, 6, '2020-01-01 14:15:24', '2020-01-02 14:15:24', '0', 98),
	(7, 7, 7, '2020-01-11 11:49:10', '2020-01-12 11:49:10', '0', 98),
	(9, 1, 9, '2020-01-14 17:16:54', '2020-01-15 17:14:57', '0', 98),
	(13, 37, 17, '2020-01-15 17:22:20', '2020-01-15 17:22:47', '0', 98),
	(16, 1, 20, '2020-01-15 18:40:22', NULL, '1', 0),
	(17, 2, 44, '2020-02-10 16:59:32', NULL, '1', 0),
	(18, 3, 44, '2020-02-10 17:02:05', NULL, '1', 0),
	(19, 2, 43, '2020-02-10 17:27:39', NULL, '1', 0);
/*!40000 ALTER TABLE `roomrecord` ENABLE KEYS */;

-- 导出  表 hotel.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `uid` int(6) NOT NULL AUTO_INCREMENT,
  `uname` varchar(50) DEFAULT NULL COMMENT '用户姓名',
  `uphone` varchar(50) DEFAULT NULL COMMENT '客户联系方式',
  `uidcard` varchar(50) DEFAULT NULL COMMENT '客户的身份证号',
  `uaddress` varchar(50) DEFAULT NULL COMMENT '客户的家庭住址',
  PRIMARY KEY (`uid`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 COMMENT='客户表';

-- 正在导出表  hotel.user 的数据：~17 rows (大约)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
REPLACE INTO `user` (`uid`, `uname`, `uphone`, `uidcard`, `uaddress`) VALUES
	(1, '唐三', 'uGVbrVym1j+HH1TsKTgdUw==', '81WRT4dqXSbsJy5GSlsrQgxtrQrzzUma', '河南省商丘市'),
	(2, '小舞', 'wTJ8V0z7opJknNbk1VVCHQ==', 'J/cjReV6OOOogfvW9jIN2rNMLJpw5Xuq', '河南省虞城'),
	(3, '胖子', 'x/SHpfbe7EG/O7CfANlu2A==', 'TkiQ5G0+iXLZ0P4kHA6jmLdZRBhTZxeB', '河南省郑州市'),
	(4, '唐斯', 'VpK7V4mn8px6sSudDBl27w==', '+qhmttdUYxTYDVmL78ZErVzx4Gieiog0', '湖南省'),
	(5, '刘能', 'F65Uynzn3qlWJvjxZHIKMQ==', 'j8R9RO0ZejrV5gf3oh/AfE0BYEBRX6LH', '浙江省'),
	(6, '范冰病', 'QL2A08nkw3N6sSudDBl27w==', 'j8R9RO0ZejrV5gf3oh/AfE0BYEBRX6LH', '浙江省'),
	(7, '神某人', 'QL2A08nkw3N6sSudDBl27w==', 'j8R9RO0ZejrV5gf3oh/AfE0BYEBRX6LH', '湖南省'),
	(8, '林偶人', 'QL2A08nkw3N6sSudDBl27w==', 'j8R9RO0ZejrV5gf3oh/AfE0BYEBRX6LH', '河南省郑州市'),
	(9, '阿龙', 'fTwT5ABa+ADBIxSxX8IW0w==', 'RQoHEczvJztsoQWVzLJBRO6FKn9J8+Gf', '河南省郑州市'),
	(10, '阿林', '0HI4k7+mHuXpqKqAq9kROA==', 'Pze33X6ZR+Bm09sbUsMXRvwtaBe0uw3X', '河南省信阳'),
	(17, '林冲', 'ywkXjPikdJDvtrYnRmxX4w==', 'Pze33X6ZR+DCEJzZMTVkAD6UxQIgPUiA', '浙江省'),
	(18, '阿花', 'fTwT5ABa+AAR/aqEhfwtvg==', '99+qmt410XhR2y4cx7OSqgxtrQrzzUma', '浙江'),
	(19, '豹子头', 'hWRsVzOv82qykq64FY3kig==', 'z/8tvxEKBrbPydONSA0VtPRcIWpgJcVF', '安徽'),
	(20, '大哥是你', 'wd240batEPGqD94vTMaOHg==', 'cdDlu5QVq60VfNxe2u5o9g==', '山东'),
	(42, '流星', 'cjpq+CEcjIV4c7+1ZOKpvA==', 'RQoHEczvJzs9W3BCPwcdibsqYScb0XrO', '山东'),
	(43, 'q', 'qvcLiE++Skw=', 'qvcLiE++Skw=', 'q'),
	(44, 'd', 'Uc5LeGB044c=', 'Uc5LeGB044c=', 'd');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
