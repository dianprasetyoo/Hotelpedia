-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2019 at 09:42 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.1.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hotelpedia`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `identity_number` varchar(20) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `identity_number`, `phone_number`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'udin', '665544223', '81267768', NULL, '2019-10-26 00:00:00', '2019-10-28 10:24:43'),
(2, 'dadang', '334455', '7755', 'test', '2019-10-26 04:50:14', '2019-10-26 04:50:14'),
(3, 'Ujang', '12345', '2147483647', NULL, '2019-10-28 08:02:37', '2019-10-28 08:02:37'),
(4, 'Tyo', '11225567', '2147483647', NULL, '2019-10-28 08:50:35', '2019-10-28 08:50:35'),
(5, 'Upik', '3346564', '2147483647', NULL, '2019-10-28 08:57:11', '2019-10-28 08:57:11'),
(6, 'Joko', '24435465', '34567', NULL, '2019-10-28 09:04:26', '2019-10-28 09:04:26'),
(7, 'Sandi', '1234', '2147483647', NULL, '2019-10-28 09:22:23', '2019-10-28 09:22:23'),
(8, 'Fikri', '213213', '089885622', NULL, '2019-10-28 09:35:54', '2019-10-28 09:35:54'),
(9, 'Ilham', '665544223', '81267768', NULL, '2019-10-28 10:13:07', '2019-10-28 10:19:52');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL,
  `is_booked` tinyint(1) DEFAULT NULL,
  `is_done` tinyint(1) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `order_end_time` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Ruang 1', '2019-10-26 00:00:00', '2019-10-28 10:02:57'),
(2, 'Ruang 2', '2019-10-26 06:39:53', '2019-10-26 06:42:15'),
(3, 'Ruang 3', '2019-10-26 13:24:10', '2019-10-28 07:12:36'),
(15, 'Ruang 4', '2019-10-28 05:57:16', '2019-10-28 05:57:16'),
(16, 'Ruang 5', '2019-10-28 06:04:31', '2019-10-28 06:04:31'),
(17, 'Ruang 6', '2019-10-28 06:06:41', '2019-10-28 06:06:41'),
(18, 'Ruang 7', '2019-10-28 06:07:06', '2019-10-28 06:07:06'),
(19, 'Ruang 8', '2019-10-28 07:18:55', '2019-10-28 07:18:55');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20191026035823-create-users.js'),
('20191026035835-create-rooms.js'),
('20191026035848-create-customers.js'),
('20191026035900-create-orders.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'dianprasetyo', 'admin', 'tyo', '2019-10-26 00:00:00', '0000-00-00 00:00:00'),
(2, 'upik', 'admin', NULL, '2019-10-26 05:11:50', '2019-10-26 05:11:50'),
(3, 'test', 'admin', NULL, '2019-10-26 13:25:35', '2019-10-26 13:25:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `room_id` (`room_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;