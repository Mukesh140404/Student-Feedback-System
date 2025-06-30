-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 30, 2025 at 03:26 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studentdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `all_feedback`
--

CREATE TABLE `all_feedback` (
  `id` int(11) NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  `faculty_name` varchar(50) DEFAULT NULL,
  `QR` varchar(10) DEFAULT NULL,
  `Q7` varchar(50) DEFAULT NULL,
  `Q8` varchar(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `all_feedback`
--

INSERT INTO `all_feedback` (`id`, `username`, `faculty_name`, `QR`, `Q7`, `Q8`, `date`, `time`) VALUES
(1, 'aman122', 'ajax saxena', '232323', 'codination improvement', 'good in teaching', '2025-06-28', '17:47:27'),
(2, 'aman122', 'meena joshi', '444444', 'xyz', 'abc', '2025-06-28', '17:50:11'),
(3, 'aman122', 'pawan kumar', '544545', 'qwe', 'nnne', '2025-06-28', '17:50:39'),
(4, 'aman122', 'neeraj gupta', '334435', 'nonwee', 'bbbbbb', '2025-06-28', '17:51:10'),
(5, 'aman122', 'neha gola', '434434', 'bbbbb', 'ytyty', '2025-06-28', '17:51:35'),
(6, 'amrita23', 'ajax saxena', '344544', 'hjhjhjh', 'uiiuuuiuiuiu', '2025-06-28', '18:27:05'),
(7, 'amrita23', 'pawan kumar', '535455', 'iuiuiuuiuiui', 'mnmnmnmnm', '2025-06-28', '18:27:27'),
(8, 'amrita23', 'neha gola', '444444', 'jhhjjhggfgf', 'rerytyt', '2025-06-28', '18:28:03'),
(9, 'sunil77', 'neha gola', '434444', 'yuyu', 'yuyu', '2025-06-28', '18:32:18'),
(10, 'sunil77', 'meena joshi', '223344', 'trttrt', 'trttrtr', '2025-06-28', '18:32:42'),
(11, 'sunil77', 'pawan kumar', '255555', 'uiuiuiui', 'uuuuuuuuu', '2025-06-28', '18:33:08');

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `id` int(11) NOT NULL,
  `f_name` varchar(30) DEFAULT NULL,
  `f_description` varchar(50) DEFAULT NULL,
  `contact` varchar(15) DEFAULT NULL,
  `added_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`id`, `f_name`, `f_description`, `contact`, `added_at`) VALUES
(1, 'ajax saxena', 'HOD CSE', '9867453289', '2025-06-28 17:19:57'),
(2, 'meena joshi', 'HOD IT', '7876878965', '2025-06-28 17:20:33'),
(3, 'pawan kumar', 'lect. cse', '8989788767', '2025-06-28 17:21:38'),
(4, 'neeraj gupta', 'lect. IT', '8999878765', '2025-06-28 17:22:42'),
(5, 'neha gola', 'HOD ME', '9089887765', '2025-06-28 17:25:09');

-- --------------------------------------------------------

--
-- Table structure for table `login_users`
--

CREATE TABLE `login_users` (
  `id` int(11) NOT NULL,
  `username` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login_users`
--

INSERT INTO `login_users` (`id`, `username`, `email`, `password`) VALUES
(1, 'admin', 'admin@gmail.com', 'admin4444'),
(2, 'aman122', 'aman@gmail.com', 'aman1234'),
(3, 'amrita23', 'am@gmail.com', 'amrita123456'),
(4, 'sunil77', 'sunil@gmail.com', 'sunil1234');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `full_name` varchar(30) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `contact` varchar(15) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `gender` char(1) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `last_update` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `username`, `full_name`, `email`, `contact`, `image`, `description`, `password`, `gender`, `DOB`, `created_at`, `last_update`) VALUES
(1, 'aman122', 'aman singh', 'aman@gmail.com', '8978675645', 'back.png', 'i am a web developer \r\nand i have a 3  year of experiance of industry', 'aman1234', 'M', '2004-06-16', '2025-06-28 16:02:23', '2025-06-28 17:17:59'),
(2, 'amrita23', 'amrita', 'am@gmail.com', '9639799605', 'ChatGPT Image Apr 9, 2025, 07_23_58 PM.png', 'i am a graphic designer\r\nand i am  a student', 'amrita123456', 'F', '2006-02-26', '2025-06-28 17:54:44', '2025-06-29 10:24:45'),
(3, 'sunil77', 'sunil kumar', 'sunil@gmail.com', '9876567898', 'sung-jinwoo-dope-3840x2160-20241.jpg', 'hey i am a mechenical engg.', 'sunil1234', 'M', '2005-04-23', '2025-06-28 18:29:37', '2025-06-28 18:31:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `all_feedback`
--
ALTER TABLE `all_feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login_users`
--
ALTER TABLE `login_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `all_feedback`
--
ALTER TABLE `all_feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `login_users`
--
ALTER TABLE `login_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
