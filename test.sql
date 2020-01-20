/*
Navicat MySQL Data Transfer

Source Server         : REST
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2020-01-19 19:48:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `api_users`
-- ----------------------------
DROP TABLE IF EXISTS `api_users`;
CREATE TABLE `api_users` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `userName` varchar(50) NOT NULL,
  `password` varchar(64) NOT NULL,
  `salt` varchar(64) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of api_users
-- ----------------------------
INSERT INTO `api_users` VALUES ('1', 'test', '0088e57eaa37255290c6ea1d6e420b9c172ba4338bea3b2cd22df8ca70a31d3a', 'K0xfPzUYo416RpgwiyBvQHO5NnJX7LFTCGEqMhIV2c9ebdtDjkaWsrAmZ3luS8');

-- ----------------------------
-- Table structure for `groups`
-- ----------------------------
DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `groupName` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of groups
-- ----------------------------
INSERT INTO `groups` VALUES ('1', 'Default group');
INSERT INTO `groups` VALUES ('2', 'Computer Science');
INSERT INTO `groups` VALUES ('3', 'Chemistry');
INSERT INTO `groups` VALUES ('4', 'Maths');
INSERT INTO `groups` VALUES ('5', 'Social Science');

-- ----------------------------
-- Table structure for `students`
-- ----------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `userName` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `idGroup` tinyint(3) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of students
-- ----------------------------
INSERT INTO `students` VALUES ('1', 'kctest0025', 'Emma', 'Smith', '1', '1');
INSERT INTO `students` VALUES ('2', 'kctest0008', 'Olivia', 'Johnson', '2', '1');
INSERT INTO `students` VALUES ('3', 'kctest0010', 'Ava', 'Williams', '1', '1');
INSERT INTO `students` VALUES ('4', 'kctest0021', 'Isabella', 'Jones', '1', '1');
INSERT INTO `students` VALUES ('5', 'kctest0030', 'Sophia', 'Brown', '0', '0');
INSERT INTO `students` VALUES ('6', 'kctest0001', 'Charlotte', 'Davis', '1', '1');
INSERT INTO `students` VALUES ('7', 'kctest0002', 'Mia', 'Miller', '3', '0');
INSERT INTO `students` VALUES ('8', 'kctest0009', 'Amelia', 'Wilson', '2', '1');
INSERT INTO `students` VALUES ('9', 'kctest0011', 'Harper', 'Moore', '4', '1');
INSERT INTO `students` VALUES ('10', 'kctest0017', 'Evelyn', 'Taylor', '3', '0');
INSERT INTO `students` VALUES ('11', 'kctest0032', 'Abigail', 'Anderson', '1', '0');
INSERT INTO `students` VALUES ('12', 'kctest0012', 'Emily', 'Thomas', '3', '1');
INSERT INTO `students` VALUES ('13', 'kctest0028', 'Elizabeth', 'Jackson', '2', '0');
INSERT INTO `students` VALUES ('14', 'kctest0013', 'Mila', 'White', '5', '1');
INSERT INTO `students` VALUES ('15', 'kctest0020', 'Ella', 'Harris', '1', '1');
INSERT INTO `students` VALUES ('16', 'kctest0003', 'Avery', 'Martin', '5', '0');
INSERT INTO `students` VALUES ('17', 'kctest0018', 'Sofia', 'Thompson', '5', '1');
INSERT INTO `students` VALUES ('18', 'kctest0014', 'Camila', 'Garcia', '3', '0');
INSERT INTO `students` VALUES ('19', 'kctest0034', 'Liam', 'Martinez', '2', '1');
INSERT INTO `students` VALUES ('20', 'kctest0004', 'Noah', 'Robinson', '2', '1');
INSERT INTO `students` VALUES ('21', 'kctest0019', 'William', 'Clark', '1', '0');
INSERT INTO `students` VALUES ('22', 'kctest0031', 'James', 'Rodriguez', '3', '1');
INSERT INTO `students` VALUES ('23', 'kctest0015', 'Logan', 'Lewis', '5', '1');
INSERT INTO `students` VALUES ('24', 'kctest0022', 'Benjamin', 'Lee', '1', '1');
INSERT INTO `students` VALUES ('25', 'kctest0029', 'Mason', 'Walker', '5', '1');
INSERT INTO `students` VALUES ('26', 'kctest0005', 'Elijah', 'Hall', '1', '0');
INSERT INTO `students` VALUES ('27', 'kctest0033', 'Oliver', 'Allen', '5', '1');
INSERT INTO `students` VALUES ('28', 'kctest0016', 'Jacob', 'Young', '5', '1');
INSERT INTO `students` VALUES ('29', 'kctest0027', 'Lucas', 'Hernandez', '1', '1');
INSERT INTO `students` VALUES ('30', 'kctest0023', 'Michael', 'King', '3', '0');
INSERT INTO `students` VALUES ('31', 'kctest0006', 'Alexander', 'Wright', '1', '1');
INSERT INTO `students` VALUES ('32', 'kctest0024', 'Ethan', 'Lopez', '1', '1');
INSERT INTO `students` VALUES ('33', 'kctest0017', 'Daniel', 'Hill', '3', '1');
INSERT INTO `students` VALUES ('34', 'kctest0007', 'Matthew', 'Scott', '3', '0');
INSERT INTO `students` VALUES ('35', 'kctest0026', 'Henry', 'Green', '3', '1');
