CREATE DATABASE  IF NOT EXISTS `webtek-final` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `webtek-final`;
-- MySQL dump 10.13  Distrib 5.7.17, for Linux (x86_64)
--
-- Host: localhost    Database: webtek-final
-- ------------------------------------------------------
-- Server version	5.7.18-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedback` (
  `feedback_id` int(11) NOT NULL,
  `ranking` int(2) DEFAULT NULL,
  `contacting_phone_number` varchar(20) DEFAULT NULL,
  `feedback_messages` longtext,
  `feedback_date` date NOT NULL,
  `consideration_date` date DEFAULT NULL,
  `feedback_status` int(2) NOT NULL,
  `checked_description` longtext,
  `request_id` int(11) DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`feedback_id`),
  KEY `fk_feedback_giver_idx` (`account_id`),
  KEY `fk_request_idx` (`request_id`),
  CONSTRAINT `fk_feedback_giver` FOREIGN KEY (`account_id`) REFERENCES `user_account` (`account_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_request` FOREIGN KEY (`request_id`) REFERENCES `service_request` (`request_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,5,'09062652263','34e20','2017-03-31',NULL,1,NULL,8,1),
(2,1,'09062652216','87c8f','2017-04-01',NULL,1,NULL,4,2),
(3,7,'09062652251','d9608','2017-04-12',NULL,1,NULL,6,3),
(4,4,'09062652210','96109','2017-04-02',NULL,1,NULL,5,4),
(5,4,'09062652238','98a8f','2017-04-14',NULL,1,NULL,2,5),
(6,9,'09062652288','37f98','2017-04-02',NULL,1,NULL,3,6),
(7,2,'09062652224','33470','2017-04-03',NULL,1,NULL,9,7),
(8,4,'09062652221','073be','2017-04-06',NULL,1,NULL,1,8),
(9,7,'09062652283','dadb5','2017-04-06',NULL,1,NULL,10,9),
(10,8,'09062652280','c3afa','2017-04-13',NULL,1,NULL,7,10);
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pet_service`
--

DROP TABLE IF EXISTS `pet_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pet_service` (
  `service_id` int(11) NOT NULL,
  `service_name` varchar(45) NOT NULL,
  `service_description` varchar(45) NOT NULL,
  `service_price` int(10) DEFAULT NULL,
  `service_picture` longblob,
  `service_hours` int(4) NOT NULL,
  `sp_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`service_id`),
  UNIQUE KEY `service_name_UNIQUE` (`service_name`),
  UNIQUE KEY `service_description_UNIQUE` (`service_description`),
  KEY `FK_SP_idx` (`sp_id`),
  KEY `FK_spid_idx` (`sp_id`),
  CONSTRAINT `FK_spid` FOREIGN KEY (`sp_id`) REFERENCES `user_account` (`account_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet_service`
--

LOCK TABLES `pet_service` WRITE;
/*!40000 ALTER TABLE `pet_service` DISABLE KEYS */;
INSERT INTO `pet_service` VALUES (1,'50a7f','176a0',142,NULL,0,NULL),(2,'f7cf9','4db39',238,NULL,0,NULL),(3,'a9776','85d54',176,NULL,0,NULL),(4,'a7f2e','d739a',127,NULL,0,NULL),(5,'43986','1f6fe',399,NULL,0,NULL),(6,'8a371','e55b8',187,NULL,0,NULL),(7,'d2e34','15c51',258,NULL,0,NULL),(8,'5b8a1','2457f',362,NULL,0,NULL),(9,'9e770','49a9d',377,NULL,0,NULL),(10,'da19c','2bbb5',336,NULL,0,NULL);
/*!40000 ALTER TABLE `pet_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(20) CHARACTER SET latin1 NOT NULL,
  `description` varchar(255) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_name_UNIQUE` (`role_name`),
  UNIQUE KEY `description_UNIQUE` (`description`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'customer','Customer role with limited access right'),(2,'service provider','service provider role with servicing right'),(3,'admin','admin role with admin access right');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_request`
--

DROP TABLE IF EXISTS `service_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service_request` (
  `request_id` int(11) NOT NULL,
  `start_servicing` date DEFAULT NULL,
  `end_servicing` date DEFAULT NULL,
  `request_status` int(2) unsigned zerofill NOT NULL,
  `service_id` int(11) DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL,
  `sp_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  KEY `FK_user_account_idx` (`account_id`),
  KEY `FK_sp_id` (`sp_id`),
  KEY `fk_pet_service_idx` (`service_id`),
  CONSTRAINT `FK_sp_id` FOREIGN KEY (`sp_id`) REFERENCES `user_account` (`account_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_user_account` FOREIGN KEY (`account_id`) REFERENCES `user_account` (`account_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pet_service` FOREIGN KEY (`service_id`) REFERENCES `pet_service` (`service_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_request`
--

LOCK TABLES `service_request` WRITE;
/*!40000 ALTER TABLE `service_request` DISABLE KEYS */;
INSERT INTO `service_request` VALUES (1,'2017-04-03','2017-04-18',01,3,2,11),(2,'2017-04-10','2017-04-19',01,2,2,11),(3,'2017-04-03','2017-04-18',01,2,9,11),(4,'2017-04-13','2017-04-18',01,8,10,11),(5,'2017-04-04','2017-04-22',01,7,10,11),(6,'2017-04-09','2017-04-22',01,2,6,11),(7,'2017-04-06','2017-04-16',01,9,6,11),(8,'2017-03-31','2017-04-19',01,7,3,11),(9,'2017-04-08','2017-04-17',01,7,8,11),(10,'2017-03-31','2017-04-16',01,6,1,11),(11,NULL,NULL,01,9,11,11);
/*!40000 ALTER TABLE `service_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_account`
--

DROP TABLE IF EXISTS `user_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_account` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `address` longtext NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `middle_name` varchar(45) DEFAULT NULL,
  `status` int(2) unsigned zerofill NOT NULL,
  `email_address` varchar(100) NOT NULL,
  `birthday` date DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `user_picture` longblob,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `email_address_UNIQUE` (`email_address`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `FK_user_account_role_idx` (`role_id`),
  CONSTRAINT `FK_user_account_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_account`
--

LOCK TABLES `user_account` WRITE;
/*!40000 ALTER TABLE `user_account` DISABLE KEYS */;
INSERT INTO `user_account` VALUES (1,'john123','9ece9','98b09','87475','0045b','347f9',01,'4fed7','2017-04-25','09062354522',NULL,1),(2,'jack23','92fa8','f087f','c26de','3223b','36ec6',01,'43142','2017-04-25','09062354590',NULL,1),(3,'lianne52','924dd','083ee','7653f','1e1d2','a1ad9',01,'c8239','2017-04-25','09062354577',NULL,1),(4,'jason65','c7705','9891a','885df','2f222','01ff1',01,'13a50','2017-04-25','09062354553',NULL,1),(5,'melody14','ae997','313ec','19460','1c765','9b127',01,'0f50c','2017-04-25','09062354518',NULL,1),(6,'alex74','7f3a9','88aed','3bece','d5f59','1c1dc',01,'a13b7','2017-04-25','09062354584',NULL,1),(7,'reuel95','758e8','c3eb5','5c8cb','d45ca','53353',01,'3faa2','2017-04-25','09062354525',NULL,1),(8,'bianca58','73352','bca2b','b6463','694a1','37afb',01,'26e0d','2017-04-25','09062354531',NULL,1),(9,'holly32','8a0e5','e0f2d','1fa68','68b64','5f4a2',01,'a7116','2017-04-25','09062354593',NULL,1),(10,'may45','c5d7d','54064','90514','2220a','75e2d',01,'f8f3b','2017-04-25','09062354549',NULL,1),(11,'mehdi','123','baguio','Mehdi','Afsari','',02,'mehdi@mail.com','1986-07-29','09062658383','',1),(12,'admin','admin','baguio','Mon','Dela','Joel',02,'mon@gmail.com','1997-12-19','09171234561','',3);
/*!40000 ALTER TABLE `user_account` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-11  9:33:45
