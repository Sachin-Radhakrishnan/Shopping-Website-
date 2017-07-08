-- MySQL dump 10.13  Distrib 5.7.18, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: database
-- ------------------------------------------------------
-- Server version	5.7.18-0ubuntu0.17.04.1

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
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `order_id` int(10) unsigned NOT NULL,
  `shipping_id` int(11) DEFAULT NULL,
  `price` bigint(1) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `confirmation_no` tinytext,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(145) NOT NULL,
  `product_description` varchar(275) DEFAULT NULL,
  `price` bigint(25) DEFAULT NULL,
  `quantity` int(11) unsigned NOT NULL,
  `status` varchar(10) DEFAULT 'active',
  `subcategory_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`product_id`,`quantity`),
  FULLTEXT KEY `product_name` (`product_name`),
  FULLTEXT KEY `product_name_2` (`product_name`),
  FULLTEXT KEY `product_description` (`product_description`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Action Shoes','. • Eloquent style • Lightweight high finish PU sole • Extra Comfort • Well-cushioned insole and a shock-absorbing heel',1099,0,'active',1),(2,' Imperial Analog Watch','Water Resistant,Display Type: Analog Strap: Black',545,15,'active',3),(3,'Lotto Men Brown Beige Sandals','Crafted from a rich quality material, this pair of floater sandals promises to keep your feet at ease all day long. ',325,0,'active',2),(4,'HP 15.6 inch Laptop Backpack ','Laptop Backpack,3 Compartments,Material: Polyester,Used For Laptop,Waterproof',1250,11,'active',4),(5,'Styylo Fashion Alloy Jewel Set  (Gold)','Earring & Necklace Set;For Women, Girls;Yellow Gold Plated,Made of Alloy,Color: Gold',388,11,'active',5),(6,'HP Laptops','Intel Core i3 Processor (6th Gen),4 GB DDR4 RAM,64 bit Windows 10 Operating System,1 TB HDD,14 inch Display',32990,15,'active',13),(7,'Acer','HD LED Backlit Display,Intel Core i3 Processor (6th Gen),4 GB DDR4 RAM,64 bit Windows 10 Operating System,1 TB HDD,15.6 inch Display',30990,10,'active',13),(8,'Dell Laptops','Intel Core i3 Processor (6th Gen),4 GB DDR4 RAM,64 bit Windows 10 Operating System,1 TB HDD,14 inch Display',31990,19,'active',13),(9,'Lenovo','Free Pre Loaded MS Office Home & Student 2016,Intel Core i3 Processor (6th Gen),4 GB DDR4 RAM,64 bit Windows 10 Operating System,1 TB HDD,14 inch Display',33000,10,'active',13),(10,'Micromax Canvas','Intel Core i3 Processor (5th Gen),4 GB DDR3 RAM,64 bit Windows 10 Operating System,1 TB HDD,15.6 inch Display',32990,12,'active',13),(11,'iBall Laptops','Backlit Display,Intel Core i3 Processor (6th Gen),4 GB DDR4 RAM,64 bit Windows 10 Operating System,1 TB HDD,15.6 inch Display',28325,15,'active',13);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shippingDetails`
--

DROP TABLE IF EXISTS `shippingDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shippingDetails` (
  `shipping_id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(45) NOT NULL,
  `lname` varchar(45) NOT NULL,
  `address` varchar(25) CHARACTER SET utf8 NOT NULL,
  `state` varchar(45) NOT NULL,
  `zip` int(11) NOT NULL,
  PRIMARY KEY (`shipping_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shippingDetails`
--

LOCK TABLES `shippingDetails` WRITE;
/*!40000 ALTER TABLE `shippingDetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `shippingDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shoppingcart`
--

DROP TABLE IF EXISTS `shoppingcart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shoppingcart` (
  `cart_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT '1',
  PRIMARY KEY (`cart_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoppingcart`
--

LOCK TABLES `shoppingcart` WRITE;
/*!40000 ALTER TABLE `shoppingcart` DISABLE KEYS */;
/*!40000 ALTER TABLE `shoppingcart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategory`
--

DROP TABLE IF EXISTS `subcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subcategory` (
  `subcategory_id` int(11) NOT NULL AUTO_INCREMENT,
  `subcategory_name` varchar(35) NOT NULL,
  `category_id` int(11) NOT NULL,
  `status` varchar(10) DEFAULT 'active',
  PRIMARY KEY (`subcategory_id`),
  FULLTEXT KEY `subcategory_name` (`subcategory_name`),
  FULLTEXT KEY `subcategory_name_2` (`subcategory_name`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategory`
--

LOCK TABLES `subcategory` WRITE;
/*!40000 ALTER TABLE `subcategory` DISABLE KEYS */;
INSERT INTO `subcategory` VALUES (1,'Shoes',6,'active'),(2,'Sandals',6,'active'),(3,'Watches',5,'active'),(4,'Bags',4,'active'),(5,'Jewellery',4,'active'),(6,'Men T- Shirts',4,'active'),(7,'Men Jeans',4,'active'),(8,'Sarees',4,'active'),(9,'Churidars',4,'active'),(10,'Baby Frocks',4,'active'),(11,'LED TV',3,'active'),(12,'40 Inches TV',3,'active'),(13,'Branded Laptops',1,'active'),(14,'Laptop Accessories',1,'active'),(15,'Android Mobiles',2,'active'),(16,'iPhones',2,'active');
/*!40000 ALTER TABLE `subcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `token` (
  `token_id` int(11) NOT NULL AUTO_INCREMENT,
  `hashValue` varchar(45) NOT NULL,
  `expiry` varchar(45) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`token_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES (3,'8d73c75e88facc818fb2c557d26b5fb0c9b99e63','2017-06-30 12:08:43.894',22);
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(15) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (19,'sachin','sachin.r@gadgeon.com','Sachin@123',NULL),(21,'saswer','sachin.kurup02@gmail.com','Sachin@123',NULL),(22,'sdfrtt','something@mailinator.com',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-07-08  8:27:01
