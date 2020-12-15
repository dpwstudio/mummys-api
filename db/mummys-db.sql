-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 04, 2020 at 10:08 AM
-- Server version: 5.7.26
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `mummys-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL,
  `image` varchar(100) NOT NULL,
  `name` varchar(200) NOT NULL,
  `price` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `ingredient` varchar(255) NOT NULL,
  `category` varchar(200) NOT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(100) CHARACTER SET utf8 NOT NULL,
  `lastname` varchar(100) CHARACTER SET utf8 NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 NOT NULL,
  `address` varchar(255) CHARACTER SET utf8 NOT NULL,
  `zipcode` varchar(32) CHARACTER SET utf8 NOT NULL,
  `city` varchar(32) CHARACTER SET utf8 NOT NULL,
  `phone` varchar(32) CHARACTER SET utf8 NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `address`, `zipcode`, `city`, `phone`, `password`, `createdAt`) VALUES
(23, 'test', 'test', 'dphengsiaroun@gmail.com', 'test', 'test', 'test', 'test', '$2b$10$Vsh2XCG.xk1JcCJ9GxjcsO36VWj/G4PRtYhLWKIMr3w1CFRyV7fAy', '2020-11-29 01:32:44'),
(24, 'Dany', 'Phengsiaroun', 'dph@gmail.com', '19 rue léonard de vinci', '77420', 'Champs sur marne', '0617925189', '$2b$10$nFU2pLZs0C8SLVyffgXQ1ed87v0v.y3qYeBCG1.NtD2Ml7TPdDwsa', '2020-11-29 01:44:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
