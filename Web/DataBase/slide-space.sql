-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 17 يوليو 2025 الساعة 15:32
-- إصدار الخادم: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gp-v2`
--

-- --------------------------------------------------------

--
-- بنية الجدول `default_pptx_presentations`
--

CREATE TABLE `default_pptx_presentations` (
  `id` int(11) NOT NULL,
  `presentation_id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `default_pptx_presentations`
--

INSERT INTO `default_pptx_presentations` (`id`, `presentation_id`, `filename`, `created_at`) VALUES
(1, 131, 'default_pptx_150_1749972878.pptx', '2025-06-15 10:34:38'),
(2, 133, 'default_pptx_151_1749973490.pptx', '2025-06-15 10:44:50'),
(3, 139, 'default_pptx_162_1749991552.pptx', '2025-06-15 15:45:52');

-- --------------------------------------------------------

--
-- بنية الجدول `documents`
--

CREATE TABLE `documents` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `status` enum('notUsed',' used') DEFAULT 'notUsed',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `documents`
--

INSERT INTO `documents` (`id`, `user_id`, `title`, `filename`, `status`, `created_at`) VALUES
(7, 2, 'ass', 'assa', '', '2025-06-04 06:01:57'),
(9, 13, 'website planing', '1749006321_website planing.docx', '', '2025-06-04 06:05:21'),
(10, 13, 'lec9', '1749145989_lec9.pdf', 'notUsed', '2025-06-05 20:53:09'),
(11, 13, 'lec7&8', '1749149127_lec7&8.pdf', 'notUsed', '2025-06-05 21:45:27'),
(12, 13, 'Lec 3', '1749150034_Lec 3.pdf', 'notUsed', '2025-06-05 22:00:34'),
(13, 13, 'lec2 - HarrisDetector_wafy', '1749150261_lec2 - HarrisDetector_wafy.pdf', 'notUsed', '2025-06-05 22:04:21'),
(14, 13, 'lec4 - SIFT_1 ', '1749150573_lec4 - SIFT_1 .pdf', 'notUsed', '2025-06-05 22:09:33'),
(15, 13, 'Lec 1', '1749159821_Lec 1.pdf', 'notUsed', '2025-06-06 00:43:41'),
(16, 13, 'lec4 - SIFT_1 ', '1749172699_lec4 - SIFT_1 .pdf', 'notUsed', '2025-06-06 04:18:20'),
(17, 13, 'lec7&8', '1749222566_lec7&8.pdf', 'notUsed', '2025-06-06 18:09:26'),
(18, 13, 'lec4 - SIFT_1 ', '1749225610_lec4 - SIFT_1 .pdf', 'notUsed', '2025-06-06 19:00:10'),
(19, 13, 'lec1 - filter_for_web', '1749227134_lec1 - filter_for_web.pdf', 'notUsed', '2025-06-06 19:25:34'),
(20, 13, 'lec2 - HarrisDetector_wafy', '1749227153_lec2 - HarrisDetector_wafy.pdf', 'notUsed', '2025-06-06 19:25:53'),
(21, 13, 'lec6', '1749245363_lec6.pdf', 'notUsed', '2025-06-07 00:29:23'),
(22, 13, 'lec6', '1749245384_lec6.pdf', 'notUsed', '2025-06-07 00:29:44'),
(23, 13, 'lec7&8', '1749245559_lec7&8.pdf', 'notUsed', '2025-06-07 00:32:39'),
(24, 13, 'lec6', '1749246143_lec6.pdf', 'notUsed', '2025-06-07 00:42:23'),
(25, 13, 'lec4 - SIFT_1 ', '1749246273_lec4 - SIFT_1 .pdf', 'notUsed', '2025-06-07 00:44:33'),
(26, 13, 'lec6', '1749246445_lec6.pdf', 'notUsed', '2025-06-07 00:47:25'),
(27, 13, 'lec6', '1749246511_lec6.pdf', 'notUsed', '2025-06-07 00:48:31'),
(28, 13, 'lec7&8', '1749246602_lec7&8.pdf', 'notUsed', '2025-06-07 00:50:02'),
(29, 13, 'lec3 - summary_pyramid', '1749246673_lec3 - summary_pyramid.pdf', 'notUsed', '2025-06-07 00:51:13'),
(30, 13, 'lec9', '1749246773_lec9.pdf', 'notUsed', '2025-06-07 00:52:53'),
(31, 13, 'lec9', '1749247046_lec9.pdf', 'notUsed', '2025-06-07 00:57:26'),
(33, 13, 'lec9', '1749249048_lec9.pdf', 'notUsed', '2025-06-07 01:30:48'),
(34, 13, 'asr02-signal', '1749253845_asr02-signal.pdf', 'notUsed', '2025-06-07 02:50:45'),
(35, 13, 'asr08-lvcsr', '1749256095_asr08-lvcsr.pdf', 'notUsed', '2025-06-07 03:28:15'),
(36, 13, 'asr11-hybrid_hmm_nn', '1749256328_asr11-hybrid_hmm_nn.pdf', 'notUsed', '2025-06-07 03:32:08'),
(37, 13, 'chapter 10 attention', '1749259190_chapter 10 attention.pdf', 'notUsed', '2025-06-07 04:19:50'),
(38, 13, 'asr17-e2e', '1749260798_asr17-e2e.pdf', 'notUsed', '2025-06-07 04:46:38'),
(39, 13, 'chapter 10 attention', '1749261670_chapter 10 attention.pdf', 'notUsed', '2025-06-07 05:01:10'),
(40, 13, 'asr08-lvcsr', '1749264920_asr08-lvcsr.pdf', 'notUsed', '2025-06-07 05:55:20'),
(41, 13, 'asr11-hybrid_hmm_nn', '1749265031_asr11-hybrid_hmm_nn.pdf', 'notUsed', '2025-06-07 05:57:11'),
(42, 13, 'asr16-ctc', '1749265117_asr16-ctc.pdf', 'notUsed', '2025-06-07 05:58:37'),
(43, 13, 'asr08-lvcsr', '1749265230_asr08-lvcsr.pdf', 'notUsed', '2025-06-07 06:00:30'),
(44, 13, 'asr08-lvcsr', '1749265336_asr08-lvcsr.pdf', 'notUsed', '2025-06-07 06:02:16'),
(45, 13, 'chapter 10 attention', '1749265764_chapter 10 attention.pdf', 'notUsed', '2025-06-07 06:09:24'),
(46, 13, 'asr06-gmms', '1749265858_asr06-gmms.pdf', 'notUsed', '2025-06-07 06:10:58'),
(47, 13, 'asr06-gmms', '1749265897_asr06-gmms.pdf', 'notUsed', '2025-06-07 06:11:37'),
(48, 13, 'asr16-ctc', '1749266212_asr16-ctc.pdf', 'notUsed', '2025-06-07 06:16:52'),
(49, 13, 'asr16-ctc', '1749266258_asr16-ctc.pdf', 'notUsed', '2025-06-07 06:17:38'),
(50, 13, 'asr11-hybrid_hmm_nn', '1749266960_asr11-hybrid_hmm_nn.pdf', 'notUsed', '2025-06-07 06:29:20'),
(51, 13, 'asr05-hmm-algorithms', '1749267045_asr05-hmm-algorithms.pdf', 'notUsed', '2025-06-07 06:30:45'),
(52, 13, 'asr11-hybrid_hmm_nn', '1749272195_asr11-hybrid_hmm_nn.pdf', 'notUsed', '2025-06-07 07:56:35'),
(53, 13, 'asr16-ctc', '1749272389_asr16-ctc.pdf', 'notUsed', '2025-06-07 07:59:49'),
(54, 13, 'asr16-ctc', '1749308135_asr16-ctc.pdf', 'notUsed', '2025-06-07 17:55:35'),
(55, 13, 'asr11-hybrid_hmm_nn', '1749308567_asr11-hybrid_hmm_nn.pdf', 'notUsed', '2025-06-07 18:02:47'),
(56, 13, 'asr08-lvcsr', '1749309673_asr08-lvcsr.pdf', 'notUsed', '2025-06-07 18:21:13'),
(57, 13, 'asr16-ctc', '1749313569_asr16-ctc.pdf', 'notUsed', '2025-06-07 19:26:09'),
(58, 13, 'asr11-hybrid_hmm_nn', '1749314784_asr11-hybrid_hmm_nn.pdf', 'notUsed', '2025-06-07 19:46:24'),
(59, 13, 'asr11-hybrid_hmm_nn', '1749314846_asr11-hybrid_hmm_nn.pdf', 'notUsed', '2025-06-07 19:47:26'),
(60, 13, 'asr11-hybrid_hmm_nn', '1749314891_asr11-hybrid_hmm_nn.pdf', 'notUsed', '2025-06-07 19:48:11'),
(61, 13, 'asr08-lvcsr', '1749336701_asr08-lvcsr.pdf', 'notUsed', '2025-06-08 01:51:41'),
(62, 13, 'asr16-ctc', '1749338355_asr16-ctc.pdf', 'notUsed', '2025-06-08 02:19:15'),
(63, 13, 'asr17-e2e', '1749338658_asr17-e2e.pdf', 'notUsed', '2025-06-08 02:24:18'),
(64, 13, 'asr11-hybrid_hmm_nn', '1749338681_asr11-hybrid_hmm_nn.pdf', 'notUsed', '2025-06-08 02:24:41'),
(65, 13, 'asr16-ctc', '1749338749_asr16-ctc.pdf', 'notUsed', '2025-06-08 02:25:49'),
(66, 13, 'asr08-lvcsr', '1749338777_asr08-lvcsr.pdf', 'notUsed', '2025-06-08 02:26:17'),
(67, 13, 'asr16-ctc', '1749346346_asr16-ctc.pdf', 'notUsed', '2025-06-08 04:32:26'),
(68, 13, 'asr11-hybrid_hmm_nn', '1749347649_asr11-hybrid_hmm_nn.pdf', 'notUsed', '2025-06-08 04:54:09'),
(69, 13, 'asr08-lvcsr', '1749347666_asr08-lvcsr.pdf', 'notUsed', '2025-06-08 04:54:26'),
(70, 13, 'asr17-e2e', '1749347732_asr17-e2e.pdf', 'notUsed', '2025-06-08 04:55:32'),
(71, 13, 'asr11-hybrid_hmm_nn', '1749347745_asr11-hybrid_hmm_nn.pdf', 'notUsed', '2025-06-08 04:55:45'),
(72, 13, 'asr17-e2e', '1749347762_asr17-e2e.pdf', 'notUsed', '2025-06-08 04:56:02'),
(73, 13, 'asr17-e2e', '1749347869_asr17-e2e.pdf', 'notUsed', '2025-06-08 04:57:49'),
(74, 13, 'asr17-e2e', '1749348086_asr17-e2e.pdf', 'notUsed', '2025-06-08 05:01:26'),
(75, 13, 'asr02-signal', '1749351400_asr02-signal.pdf', 'notUsed', '2025-06-08 05:56:40'),
(76, 12, 'asr11-hybrid_hmm_nn', '1749353740_asr11-hybrid_hmm_nn.pdf', 'notUsed', '2025-06-08 06:35:40'),
(77, 13, 'asr08-lvcsr', '1749426775_asr08-lvcsr.pdf', 'notUsed', '2025-06-09 02:52:55'),
(78, 13, 'Back-end_Session1_S25', '1749529646_Back-end_Session1_S25.pdf', 'notUsed', '2025-06-10 07:27:26'),
(79, 13, 'lec2 - HarrisDetector_wafy', '1749530235_lec2 - HarrisDetector_wafy.pdf', 'notUsed', '2025-06-10 07:37:15'),
(80, 13, 'lec2 - HarrisDetector_wafy', '1749531122_lec2 - HarrisDetector_wafy.pdf', 'notUsed', '2025-06-10 07:52:02'),
(81, 13, 'MyTalk', '1749531255_MyTalk.docx', 'notUsed', '2025-06-10 07:54:15'),
(82, 13, 'MyTalk', '1749531351_MyTalk.docx', 'notUsed', '2025-06-10 07:55:51'),
(83, 16, 'MyTalk', '1749531501_MyTalk.docx', 'notUsed', '2025-06-10 07:58:21'),
(84, 16, 'A', '1749531783_A.pdf', 'notUsed', '2025-06-10 08:03:03'),
(85, 16, 'A', '1749531901_A.pdf', 'notUsed', '2025-06-10 08:05:01'),
(86, 16, 'asr11-hybrid_hmm_nn', '1749532236_asr11-hybrid_hmm_nn.pdf', 'notUsed', '2025-06-10 08:10:36'),
(87, 16, 'A', '1749532547_A.pdf', 'notUsed', '2025-06-10 08:15:47'),
(88, 16, 'A', '1749532777_A.pdf', 'notUsed', '2025-06-10 08:19:37'),
(89, 16, 'asr11-hybrid_hmm_nn', '1749534084_asr11-hybrid_hmm_nn.pdf', 'notUsed', '2025-06-10 08:41:24'),
(90, 16, 'asr17-e2e', '1749534109_asr17-e2e.pdf', 'notUsed', '2025-06-10 08:41:49'),
(91, 16, 'asr11-hybrid_hmm_nn', '1749534596_asr11-hybrid_hmm_nn.pdf', 'notUsed', '2025-06-10 08:49:56'),
(92, 16, 'asr17-e2e', '1749539300_asr17-e2e.pdf', 'notUsed', '2025-06-10 10:08:20'),
(93, 16, 'asr11-hybrid_hmm_nn', '1749539381_asr11-hybrid_hmm_nn.pdf', 'notUsed', '2025-06-10 10:09:41'),
(94, 16, 'asr16-ctc', '1749540370_asr16-ctc.pdf', 'notUsed', '2025-06-10 10:26:10'),
(95, 16, 'asr17-e2e', '1749548104_asr17-e2e.pdf', 'notUsed', '2025-06-10 12:35:04'),
(96, 16, 'A', '1749548445_A.pdf', 'notUsed', '2025-06-10 12:40:45'),
(97, 16, 'asr17-e2e', '1749548782_asr17-e2e.pdf', 'notUsed', '2025-06-10 12:46:22'),
(98, 16, 'A', '1749572996_A.pdf', 'notUsed', '2025-06-10 19:29:56'),
(99, 16, 'A', '1749573738_A.pdf', 'notUsed', '2025-06-10 19:42:19'),
(100, 16, 'asr16-ctc', '1749573742_asr16-ctc.pdf', 'notUsed', '2025-06-10 19:42:22'),
(101, 16, 'chapter 10 attention', '1749578443_chapter 10 attention.pdf', 'notUsed', '2025-06-10 21:00:43'),
(102, 16, 'asr16-ctc', '1749578652_asr16-ctc.pdf', 'notUsed', '2025-06-10 21:04:12'),
(103, 16, 'asr06-gmms', '1749579008_asr06-gmms.pdf', 'notUsed', '2025-06-10 21:10:08'),
(104, 16, 'chapter 10 attention', '1749579097_chapter 10 attention.pdf', 'notUsed', '2025-06-10 21:11:37'),
(105, 16, 'A', '1749579881_A.pdf', 'notUsed', '2025-06-10 21:24:41'),
(106, 16, 'A', '1749580515_A.pdf', 'notUsed', '2025-06-10 21:35:15'),
(107, 16, 'chapter 10 attention', '1749581847_chapter 10 attention.pdf', 'notUsed', '2025-06-10 21:57:27'),
(108, 16, 'chapter 10 attention', '1749586125_chapter 10 attention.pdf', 'notUsed', '2025-06-10 23:08:45'),
(109, 16, 'chapter 10 attention', '1749588894_chapter 10 attention.pdf', 'notUsed', '2025-06-10 23:54:54'),
(110, 16, 'A', '1749589045_A.pdf', 'notUsed', '2025-06-10 23:57:25'),
(111, 16, 'asr17-e2e', '1749590128_asr17-e2e.pdf', 'notUsed', '2025-06-11 00:15:28'),
(112, 16, 'asr06-gmms', '1749590799_asr06-gmms.pdf', 'notUsed', '2025-06-11 00:26:39'),
(113, 16, 'asr06-gmms', '1749591147_asr06-gmms.pdf', 'notUsed', '2025-06-11 00:32:27'),
(114, 16, 'asr17-e2e', '1749594538_asr17-e2e.pdf', 'notUsed', '2025-06-11 01:28:58'),
(115, 16, 'tech jop description', '1749595325_tech jop description.docx', 'notUsed', '2025-06-11 01:42:05'),
(116, 16, 'IEEE S\'25 plan', '1749595595_IEEE S\'25 plan.docx', 'notUsed', '2025-06-11 01:46:35'),
(117, 16, 'IEEE S\'25 plan', '1749595625_IEEE S\'25 plan.docx', 'notUsed', '2025-06-11 01:47:05'),
(118, 16, 'IEEE S\'25 plan', '1749595840_IEEE S\'25 plan.docx', 'notUsed', '2025-06-11 01:50:40'),
(119, 16, 'IEEE S\'25 plan', '1749601091_IEEE S\'25 plan.docx', 'notUsed', '2025-06-11 03:18:11'),
(120, 16, 'IEEE S\'25 plan', '1749602376_IEEE S\'25 plan.docx', 'notUsed', '2025-06-11 03:39:36'),
(121, 16, 'IEEE S\'25 plan', '1749603898_IEEE S\'25 plan.docx', 'notUsed', '2025-06-11 04:04:58'),
(122, 16, 'IEEE S\'25 plan', '1749603913_IEEE S\'25 plan.docx', 'notUsed', '2025-06-11 04:05:13'),
(123, 16, 'Job Description S\'23', '1749604568_Job Description S\'23.pdf', 'notUsed', '2025-06-11 04:16:08'),
(124, 16, 'IEEE S\'25 plan', '1749608685_IEEE S\'25 plan.docx', 'notUsed', '2025-06-11 05:24:45'),
(125, 16, 'Job Description S\'23', '1749608857_Job Description S\'23.pdf', 'notUsed', '2025-06-11 05:27:37'),
(126, 16, 'Job Description S\'23', '1749608857_Job Description S\'23.pdf', 'notUsed', '2025-06-11 05:27:37'),
(127, 16, 'A', '1749608980_A.pdf', 'notUsed', '2025-06-11 05:29:40'),
(128, 16, 'A', '1749608980_A.pdf', 'notUsed', '2025-06-11 05:29:41'),
(129, 16, 'lec2 - HarrisDetector_wafy', '1749611903_lec2 - HarrisDetector_wafy.pdf', 'notUsed', '2025-06-11 06:18:23'),
(130, 16, 'lec9', '1749634356_lec9.pdf', 'notUsed', '2025-06-11 12:32:36'),
(131, 12, 'A', '1749747652_A.pdf', 'notUsed', '2025-06-12 20:00:52'),
(132, 12, 'A', '1749747999_A.pdf', 'notUsed', '2025-06-12 20:06:39'),
(133, 12, 'chapter 10 attention', '1749748109_chapter 10 attention.pdf', 'notUsed', '2025-06-12 20:08:29'),
(134, 12, 'A', '1749749294_A.pdf', 'notUsed', '2025-06-12 20:28:14'),
(135, 12, 'A', '1749927992_A.pdf', 'notUsed', '2025-06-14 22:06:32'),
(136, 12, 'IEEE S\'25 plan', '1749928335_IEEE S\'25 plan.docx', 'notUsed', '2025-06-14 22:12:15'),
(137, 12, 'IEEE S\'25 plan', '1749929069_IEEE S\'25 plan.docx', 'notUsed', '2025-06-14 22:24:29'),
(138, 12, 'Section 1', '1749937371_Section 1.pdf', 'notUsed', '2025-06-15 00:42:51'),
(139, 12, 'Section 1', '1749938153_Section 1.pdf', 'notUsed', '2025-06-15 00:55:53'),
(140, 12, 'section 2', '1749947124_section 2.pdf', 'notUsed', '2025-06-15 03:25:24'),
(141, 12, 'Section 1', '1749951128_Section 1.pdf', 'notUsed', '2025-06-15 04:32:08'),
(142, 12, 'Section 1', '1749952759_Section 1.pdf', 'notUsed', '2025-06-15 04:59:19'),
(143, 12, 'Section 1', '1749954178_Section 1.pdf', 'notUsed', '2025-06-15 05:22:58'),
(144, 12, 'Section 1', '1749958777_Section 1.pdf', 'notUsed', '2025-06-15 06:39:37'),
(145, 12, 'Section 1', '1749959176_Section 1.pdf', 'notUsed', '2025-06-15 06:46:16'),
(146, 12, 'Section 1', '1749964572_Section 1.pdf', 'notUsed', '2025-06-15 08:16:12'),
(147, 12, 'Section 1', '1749964847_Section 1.pdf', 'notUsed', '2025-06-15 08:20:47'),
(148, 12, 'Section 5', '1749968435_Section 5.pdf', 'notUsed', '2025-06-15 09:20:35'),
(149, 12, 'Section 5', '1749972755_Section 5.pdf', 'notUsed', '2025-06-15 10:32:35'),
(150, 12, 'Section 5', '1749972825_Section 5.pdf', 'notUsed', '2025-06-15 10:33:45'),
(151, 12, 'Section 5', '1749973334_Section 5.pdf', 'notUsed', '2025-06-15 10:42:14'),
(152, 12, 'Section 5', '1749986894_Section 5.pdf', 'notUsed', '2025-06-15 14:28:14'),
(153, 12, 'Section 1', '1749987156_Section 1.pdf', 'notUsed', '2025-06-15 14:32:36'),
(154, 12, 'Section 1', '1749987531_Section 1.pdf', 'notUsed', '2025-06-15 14:38:51'),
(155, 12, 'Section 1', '1749987939_Section 1.pdf', 'notUsed', '2025-06-15 14:45:39'),
(156, 12, 'Section 1', '1749988479_Section 1.pdf', 'notUsed', '2025-06-15 14:54:39'),
(157, 12, 'Section 1', '1749988911_Section 1.pdf', 'notUsed', '2025-06-15 15:01:51'),
(158, 12, 'Section 1', '1749989574_Section 1.pdf', 'notUsed', '2025-06-15 15:12:54'),
(159, 12, 'Section 1', '1749989852_Section 1.pdf', 'notUsed', '2025-06-15 15:17:32'),
(160, 12, 'Section 1', '1749990006_Section 1.pdf', 'notUsed', '2025-06-15 15:20:06'),
(161, 12, 'Section 1', '1749990752_Section 1.pdf', 'notUsed', '2025-06-15 15:32:32'),
(162, 12, 'Section 1', '1749991483_Section 1.pdf', 'notUsed', '2025-06-15 15:44:43'),
(163, 12, 'Section 1', '1749991801_Section 1.pdf', 'notUsed', '2025-06-15 15:50:01'),
(164, 12, 'Section 3', '1749991906_Section 3.pdf', 'notUsed', '2025-06-15 15:51:46'),
(165, 12, 'Section 1', '1749992008_Section 1.pdf', 'notUsed', '2025-06-15 15:53:28'),
(166, 12, 'section 2', '1749992427_section 2.pdf', 'notUsed', '2025-06-15 16:00:27'),
(167, 12, 'section 2', '1750437688_section 2.pdf', 'notUsed', '2025-06-20 19:41:29'),
(168, 17, 'Section 1', '1750739253_Section 1.pdf', 'notUsed', '2025-06-24 07:27:33'),
(169, 17, 'Section 1', '1750739300_Section 1.pdf', 'notUsed', '2025-06-24 07:28:20'),
(170, 17, 'Section 1', '1750826625_Section 1.pdf', 'notUsed', '2025-06-25 07:43:45');

-- --------------------------------------------------------

--
-- بنية الجدول `ga_pptx_presentations`
--

CREATE TABLE `ga_pptx_presentations` (
  `id` int(11) NOT NULL,
  `presentation_id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `ga_pptx_presentations`
--

INSERT INTO `ga_pptx_presentations` (`id`, `presentation_id`, `filename`, `created_at`) VALUES
(1, 131, 'ga_pptx_150_1749972914.pptx', '2025-06-15 10:35:14'),
(2, 133, 'ga_pptx_151_1749973537.pptx', '2025-06-15 10:45:37'),
(3, 139, 'ga_pptx_162_1749991624.pptx', '2025-06-15 15:47:04'),
(4, 141, 'ga_pptx_169_1750743561.pptx', '2025-06-24 08:39:21');

-- --------------------------------------------------------

--
-- بنية الجدول `presentations_content`
--

CREATE TABLE `presentations_content` (
  `id` int(11) NOT NULL,
  `document_id` int(11) NOT NULL,
  `slide_content_path` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `presentations_content`
--

INSERT INTO `presentations_content` (`id`, `document_id`, `slide_content_path`, `created_at`) VALUES
(104, 0, '../../slides/slides_d07c2317-c29b-4206-b05c-2d59a10c9f26_1749606122.json', '2025-06-11 04:42:02'),
(105, 125, '../../slides/1749608888_Job Description S\'23.pdfslide.json', '2025-06-11 05:28:09'),
(106, 127, '../../slides/1749609030_A.pdfslide.json', '2025-06-11 05:30:30'),
(107, 129, '1749611988_lec2 - HarrisDetector_wafy.pdfslide.json', '2025-06-11 06:19:48'),
(108, 137, '1749929208_IEEE S\'25 plan.docxslide.json', '2025-06-14 22:26:48'),
(109, 138, '1749937911_Section 1.pdfslide.json', '2025-06-15 00:51:52'),
(110, 139, '1749938209_Section 1.pdfslide.json', '2025-06-15 00:56:49'),
(111, 142, '1749953060_Section 1.pdfslide.json', '2025-06-15 05:04:21'),
(112, 143, '1749954217_Section 1.pdfslide.json', '2025-06-15 05:23:37'),
(113, 144, '1749958858_Section 1.pdfslide.json', '2025-06-15 06:40:58'),
(120, 145, '1749964083_slides_145.json', '2025-06-15 08:08:03'),
(129, 147, '1749966696_slides_147.json', '2025-06-15 08:51:36'),
(130, 148, '1749968468_Section 5.pdfslide.json', '2025-06-15 09:21:08'),
(131, 150, '1749972848_Section 5.pdfslide.json', '2025-06-15 10:34:08'),
(133, 151, '1749973464_slides_151.json', '2025-06-15 10:44:24'),
(134, 155, '1749988233_Section 1.pdfslide.json', '2025-06-15 14:50:33'),
(135, 158, '1749989732_Section 1.pdfslide.json', '2025-06-15 15:15:32'),
(136, 159, '1749989897_Section 1.pdfslide.json', '2025-06-15 15:18:17'),
(137, 160, '1749990057_Section 1.pdfslide.json', '2025-06-15 15:20:57'),
(138, 161, '1749990783_Section 1.pdfslide.json', '2025-06-15 15:33:03'),
(139, 162, '1749991519_Section 1.pdfslide.json', '2025-06-15 15:45:19'),
(141, 169, '1750743507_slides_169.json', '2025-06-24 08:38:28');

-- --------------------------------------------------------

--
-- بنية الجدول `presentations_titles`
--

CREATE TABLE `presentations_titles` (
  `id` int(11) NOT NULL,
  `document_id` int(11) NOT NULL,
  `titles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`titles`)),
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `presentations_titles`
--

INSERT INTO `presentations_titles` (`id`, `document_id`, `titles`, `created_at`) VALUES
(1, 13, '[\r\n  { \"title\": \"Introduction to Quantum Computing\" },\r\n  { \"title\": \"Key Concepts\" },\r\n  { \"title\": \"Algorithms\" },\r\n  { \"title\": \"Hardware Challenges\" },\r\n  { \"title\": \"Future Outlook\" }\r\n]\r\n', '2025-06-07 04:04:05'),
(2, 14, '[\r\n  { \"title\": \"Introduction to Quantum Computing\" },\r\n  { \"title\": \"Key Concepts\" },\r\n  { \"title\": \"Algorithms\" },\r\n  { \"title\": \"Hardware Challenges\" },\r\n  { \"title\": \"Future Outlook\" }\r\n]\r\n', '2025-06-07 04:04:55'),
(12, 36, '[{\"title\":\"AAAAAAAAAAAAAAAAAAAAAA\"},{\"title\":\"B\"},{\"title\":\"C\"},{\"title\":\"D\"},{\"title\":\"D\"}]', '2025-06-07 04:18:19'),
(13, 37, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-07 04:19:54'),
(19, 38, '[{\"id\":\"new-1749261001174\",\"title\":\"1\"},{\"id\":\"new-1749261056197\",\"title\":\"2\"},{\"id\":\"new-1749261059781\",\"title\":\"3\"},{\"id\":\"new-1749261064621\",\"title\":\"4\"}]', '2025-06-07 05:00:19'),
(21, 35, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-07 05:24:13'),
(23, 39, '[{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"adadfdfgd\"},{\"title\":\"22222222222222222222222\"}]', '2025-06-07 05:31:31'),
(24, 40, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-07 05:55:36'),
(25, 45, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-07 06:09:32'),
(26, 49, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-07 06:18:36'),
(27, 50, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-07 06:29:28'),
(28, 52, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-07 07:56:58'),
(29, 53, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-07 07:59:54'),
(30, 54, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-07 17:55:42'),
(31, 55, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-07 18:02:58'),
(32, 56, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-07 18:21:26'),
(34, 57, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-07 19:28:20'),
(35, 59, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-07 19:47:34'),
(36, 60, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-07 19:48:15'),
(37, 61, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-08 01:51:54'),
(38, 63, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-08 02:24:24'),
(40, 64, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-08 02:25:41'),
(41, 65, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-08 02:25:52'),
(42, 66, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-08 02:26:20'),
(43, 67, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-08 04:33:08'),
(44, 68, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-08 04:54:13'),
(45, 69, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-08 04:54:32'),
(46, 70, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-08 04:55:36'),
(47, 71, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-08 04:55:49'),
(48, 74, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-08 05:01:32'),
(49, 75, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-08 05:56:46'),
(50, 76, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-08 06:35:45'),
(51, 77, '[{\"title\":\"Introduction to Quantum Computing\"},{\"title\":\"Key Concepts\"},{\"title\":\"Algorithms\"},{\"title\":\"Hardware Challenges\"},{\"title\":\"Future Outlook\"}]', '2025-06-09 02:53:15'),
(55, 79, '[{\"index\":0,\"title\":\"Introduction to the Research Topic\"},{\"index\":1,\"title\":\"Background and Literature Review\"},{\"index\":2,\"title\":\"Methodology and Approach\"},{\"index\":3,\"title\":\"Experimental Setup and Data Collection\"}]', '2025-06-10 07:47:39'),
(56, 83, '[{\"index\":0,\"title\":\"Introduction to the Research Topic\"},{\"index\":1,\"title\":\"Background and Literature Review\"},{\"index\":2,\"title\":\"Methodology and Approach\"},{\"index\":3,\"title\":\"Experimental Setup and Data Collection\"},{\"index\":4,\"title\":\"Results and Analysis\"},{\"index\":5,\"title\":\"Discussion and Interpretation\"},{\"index\":6,\"title\":\"Conclusion and Future Work\"},{\"index\":7,\"title\":\"References and Citations\"}]', '2025-06-10 08:01:07'),
(64, 85, '[{\"index\":0,\"title\":\"New Title\"},{\"index\":1,\"title\":\"New Title\"}]', '2025-06-10 08:10:17'),
(66, 86, '[{\"index\":1,\"title\":\"Problem Statement and Objectives\"},{\"index\":2,\"title\":\"Implications and Recommendations\"},{\"index\":3,\"title\":\"Theoretical Framework\"},{\"index\":4,\"title\":\"Literature Review and Related Work\"},{\"index\":4,\"title\":\"New Title\"}]', '2025-06-10 08:11:02'),
(69, 87, '[{\"index\":0,\"title\":\"New Titleasdasd\"},{\"index\":1,\"title\":\"New Titleasdasd\"},{\"index\":2,\"title\":\"New Titleasdsda\"},{\"index\":3,\"title\":\"New Titleasdasd\"}]', '2025-06-10 08:18:05'),
(76, 88, '[{\"index\":3,\"title\":\"References and nbbnbnb\"},{\"index\":4,\"title\":\"Comparative Analysis\"},{\"index\":5,\"title\":\"Data Sources and Collection Methods\"},{\"index\":6,\"title\":\"New Title\"},{\"index\":8,\"title\":\"New Title\"}]', '2025-06-10 08:21:41'),
(77, 89, '[{\"index\":0,\"title\":\"Conclusion and Future Directions\"},{\"index\":1,\"title\":\"References and Bibliography\"},{\"index\":2,\"title\":\"Discussion and Interpretation\"},{\"index\":3,\"title\":\"Limitations and Constraints\"},{\"index\":4,\"title\":\"Data Collection and Analysis\"}]', '2025-06-10 08:41:30'),
(79, 90, '[{\"index\":0,\"title\":\"Literature Review and Related Work\"},{\"index\":1,\"title\":\"Research Questions and Hypotheses\"},{\"index\":2,\"title\":\"Comparative Analysis\"},{\"index\":3,\"title\":\"Implications and Recommendations\"},{\"index\":4,\"title\":\"Statistical Analysis and Results\"},{\"index\":5,\"title\":\"Data Collection and Analysis\"},{\"index\":6,\"title\":\"Methodology and Research Design\"},{\"index\":7,\"title\":\"Experimental Results and Findings\"},{\"index\":8,\"title\":\"Data Sources and Collection Methods\"},{\"index\":9,\"title\":\"Theoretical Framework\"}]', '2025-06-10 08:47:09'),
(81, 91, '[{\"index\":0,\"title\":\"Research Questions and Hypotheses\"},{\"index\":1,\"title\":\"Theoretical Framework\"},{\"index\":2,\"title\":\"Comparative Analysis\"},{\"index\":3,\"title\":\"Literature Review and Related Work\"},{\"index\":4,\"title\":\"Data Sources and Collection Methods\"}]', '2025-06-10 08:52:49'),
(82, 92, '[{\"index\":0,\"title\":\"Implications and Recommendations\"},{\"index\":1,\"title\":\"Literature Review and Related Work\"},{\"index\":2,\"title\":\"Background and Context of 1749539300_asr17-e2e\"},{\"index\":3,\"title\":\"Theoretical Framework\"},{\"index\":4,\"title\":\"Problem Statement and Objectives\"},{\"index\":5,\"title\":\"Research Questions and Hypotheses\"},{\"index\":6,\"title\":\"Conclusion and Future Directions\"},{\"index\":7,\"title\":\"Summary and Key Takeaways\"}]', '2025-06-10 10:08:26'),
(83, 93, '[{\"index\":0,\"title\":\"Statistical Analysis and Results\"},{\"index\":1,\"title\":\"Key Concepts and Definitions\"},{\"index\":2,\"title\":\"Research Questions and Hypotheses\"},{\"index\":3,\"title\":\"Conclusion and Future Directions\"},{\"index\":4,\"title\":\"Background and Context of 1749539381_asr11-hybrid_hmm_nn\"}]', '2025-06-10 10:09:45'),
(86, 94, '[{\"index\":0,\"title\":\"Implications and Recommendations\"},{\"index\":1,\"title\":\"Literature Review and Related Work\"},{\"index\":2,\"title\":\"Summary and Key Takeaways\"},{\"index\":3,\"title\":\"Conclusion and Future Directions\"},{\"index\":4,\"title\":\"Research Questions and Hypotheses\"}]', '2025-06-10 12:33:53'),
(88, 97, '[{\"index\":15,\"title\":\"ctc components encoder softmax\"},{\"index\":16,\"title\":\"decoder models ctc model\"},{\"index\":17,\"title\":\"decoder models ctc\"},{\"index\":18,\"title\":\"decoder models recap ctc\"},{\"index\":19,\"title\":\"encoder decoder models ctc\"}]', '2025-06-10 13:00:50'),
(89, 98, '[{\"index\":0,\"title\":\"unsupervised learning algorithm hmm\"},{\"index\":1,\"title\":\"hidden markov model things\"},{\"index\":2,\"title\":\"hidden markov models start\"},{\"index\":3,\"title\":\"markov models hmms way\"},{\"index\":4,\"title\":\"tutorial hidden markov models\"},{\"index\":5,\"title\":\"algorithm hmm training forward\"},{\"index\":6,\"title\":\"hmm matrices formally learning\"},{\"index\":15,\"title\":\"learning algorithm hmm forward\"},{\"index\":17,\"title\":\"markov model hmm allows\"}]', '2025-06-10 19:34:40'),
(90, 100, '[{\"index\":0,\"title\":\"training hmms using\"},{\"index\":1,\"title\":\"ml trained hmms\"},{\"index\":2,\"title\":\"speech architecture end\"},{\"index\":3,\"title\":\"conversational speech recognition\"},{\"index\":4,\"title\":\"trained hmms kind end\"},{\"index\":5,\"title\":\"conversational speech recognition neural\"},{\"index\":6,\"title\":\"ctc example deep speech\"},{\"index\":7,\"title\":\"speech architecture end end\"},{\"index\":8,\"title\":\"sequence discriminative training typically\"},{\"index\":9,\"title\":\"end speech recognition reading\"},{\"index\":10,\"title\":\"ctc deep speech\"},{\"index\":11,\"title\":\"deep speech architecture end\"},{\"index\":12,\"title\":\"ctc deep speech training\"},{\"index\":13,\"title\":\"end speech recognition using\"},{\"index\":14,\"title\":\"discriminative training hmms using\"},{\"index\":15,\"title\":\"systems ctc deep speech\"},{\"index\":16,\"title\":\"discriminative training hmms\"},{\"index\":17,\"title\":\"end end speech recognition\"},{\"index\":18,\"title\":\"sequence discriminative training hmms\"},{\"index\":19,\"title\":\"end speech recognition\"}]', '2025-06-10 19:42:59'),
(93, 107, '[{\"index\":12,\"title\":\"attention language modeling\"},{\"index\":13,\"title\":\"comparison attention mechanisms rnns\"},{\"index\":17,\"title\":\"rnns attention\"},{\"index\":18,\"title\":\"self attention networks sequence\"},{\"index\":19,\"title\":\"neural networks rnns attention\"}]', '2025-06-10 23:08:34'),
(96, 108, '[{\"index\":16,\"title\":\"networks rnns attention\"},{\"index\":17,\"title\":\"rnns attention\"},{\"index\":18,\"title\":\"self attention networks sequence\"},{\"index\":19,\"title\":\"neural networks rnns attention\"}]', '2025-06-10 23:13:03'),
(97, 109, '[{\"index\":15,\"title\":\"attention networks sequence sequence\"},{\"index\":16,\"title\":\"networks rnns attention\"},{\"index\":17,\"title\":\"rnns attention\"},{\"index\":18,\"title\":\"self attention networks sequence\"},{\"index\":19,\"title\":\"neural networks rnns attention\"}]', '2025-06-10 23:55:59'),
(100, 110, '[{\"index\":0,\"title\":\"unsupervised learning algorithm hmm\"},{\"index\":1,\"title\":\"hidden markov model things\"},{\"index\":2,\"title\":\"hidden markov models start\"},{\"index\":3,\"title\":\"markov models hmms way\"},{\"index\":4,\"title\":\"tutorial hidden markov models\"},{\"index\":5,\"title\":\"algorithm hmm training forward\"},{\"index\":6,\"title\":\"hmm matrices formally learning\"},{\"index\":7,\"title\":\"useful hmm tasks\"},{\"index\":8,\"title\":\"learning algorithm hmm\"},{\"index\":9,\"title\":\"useful hmm tasks given\"},{\"index\":18,\"title\":\"hidden markov model hmm\"},{\"index\":19,\"title\":\"hidden markov models hmms\"}]', '2025-06-11 00:15:15'),
(101, 111, '[{\"index\":15,\"title\":\"ctc components encoder softmax\"},{\"index\":16,\"title\":\"decoder models ctc model\"},{\"index\":17,\"title\":\"decoder models ctc\"},{\"index\":18,\"title\":\"decoder models recap ctc\"},{\"index\":19,\"title\":\"encoder decoder models ctc\"}]', '2025-06-11 00:16:02'),
(102, 113, '[{\"index\":16,\"title\":\"gaussian mixture models gaussian\"},{\"index\":17,\"title\":\"gaussian mixture models overview\"},{\"index\":18,\"title\":\"mixture models gaussian distribution\"},{\"index\":19,\"title\":\"asr lecture gaussian mixture\"}]', '2025-06-11 00:32:51'),
(103, 118, '[{\"index\":16,\"title\":\"ieee volunteers\"},{\"index\":17,\"title\":\"marketing ieee volunteers projects\"},{\"index\":18,\"title\":\"projects marketing ieee volunteers\"},{\"index\":19,\"title\":\"ieee volunteers projects\"}]', '2025-06-11 01:51:03'),
(104, 120, '[{\"index\":18,\"title\":\"projects marketing ieee volunteers\"},{\"index\":19,\"title\":\"ieee volunteers projects\"}]', '2025-06-11 03:47:38'),
(105, 122, '[{\"index\":0,\"title\":\"volunteers technical\"},{\"index\":1,\"title\":\"collaboration committees engaging volunteers\"},{\"index\":2,\"title\":\"objectives cross committee projects\"},{\"index\":3,\"title\":\"volunteers technical soft\"},{\"index\":4,\"title\":\"project plan\"},{\"index\":5,\"title\":\"engagement projects team\"},{\"index\":6,\"title\":\"ieee 25 technical plan\"},{\"index\":7,\"title\":\"projects team\"},{\"index\":8,\"title\":\"volunteers technical soft skills\"},{\"index\":9,\"title\":\"projects marketing ieee\"},{\"index\":10,\"title\":\"volunteers sessions events projects\"},{\"index\":11,\"title\":\"enhance skills volunteers technical\"},{\"index\":12,\"title\":\"marketing ieee volunteers\"},{\"index\":13,\"title\":\"skills volunteers technical soft\"},{\"index\":14,\"title\":\"skills volunteers technical\"},{\"index\":15,\"title\":\"ieee volunteers projects linkedin\"},{\"index\":16,\"title\":\"ieee volunteers\"},{\"index\":17,\"title\":\"marketing ieee volunteers projects\"},{\"index\":18,\"title\":\"projects marketing ieee volunteers\"},{\"index\":19,\"title\":\"ieee volunteers projects\"}]', '2025-06-11 04:05:41'),
(107, 123, '[{\"index\":0,\"title\":\"presentation title photographing gatherings\"},{\"index\":16,\"title\":\"logistics presentation title gathering\"},{\"index\":17,\"title\":\"presentation skills logistics presentation\"},{\"index\":18,\"title\":\"human resources presentation title\"},{\"index\":19,\"title\":\"human resources presentation\"},{\"index\":5,\"title\":\"New Title\"}]', '2025-06-11 04:32:11'),
(108, 124, '[{\"index\":0,\"title\":\"volunteers technical\"},{\"index\":1,\"title\":\"collaboration committees engaging volunteers\"},{\"index\":2,\"title\":\"objectives cross committee projects\"},{\"index\":3,\"title\":\"volunteers technical soft\"},{\"index\":4,\"title\":\"project plan\"},{\"index\":5,\"title\":\"engagement projects team\"},{\"index\":6,\"title\":\"ieee 25 technical plan\"}]', '2025-06-11 05:25:05'),
(109, 126, '[{\"index\":0,\"title\":\"presentation title photographing gatherings\"},{\"index\":18,\"title\":\"human resources presentation title\"},{\"index\":19,\"title\":\"human resources presentation\"}]', '2025-06-11 05:28:01'),
(110, 128, '[{\"index\":0,\"title\":\"unsupervised learning algorithm hmm\"},{\"index\":16,\"title\":\"hmm based speech\"},{\"index\":17,\"title\":\"markov model hmm allows\"},{\"index\":18,\"title\":\"hidden markov model hmm\"},{\"index\":19,\"title\":\"hidden markov models hmms\"}]', '2025-06-11 05:30:04'),
(111, 129, '[{\"index\":0,\"title\":\"harris detector algorithm points\"},{\"index\":1,\"title\":\"directions harris detector mathematics\"},{\"index\":2,\"title\":\"harris detector mathematics\"},{\"index\":16,\"title\":\"corner detector harris stephens\"},{\"index\":17,\"title\":\"harris corner detector harris\"},{\"index\":18,\"title\":\"edges corner harris detector\"},{\"index\":19,\"title\":\"corner harris detector properties\"}]', '2025-06-11 06:19:29'),
(112, 136, '[{\"index\":0,\"title\":\"volunteers technical\"},{\"index\":1,\"title\":\"collaboration committees engaging volunteers\"},{\"index\":2,\"title\":\"objectives cross committee projects\"},{\"index\":15,\"title\":\"fdfghldfjghlkdfghl;j \"},{\"index\":16,\"title\":\"ieee volunteers\"},{\"index\":17,\"title\":\"marketing ieee volunteers projects\"},{\"index\":18,\"title\":\"projects marketing ieee volunteers\"},{\"index\":19,\"title\":\"ieee volunteers projects\"}]', '2025-06-14 22:13:13'),
(113, 137, '[{\"index\":0,\"title\":\"volunteers technical\"},{\"index\":1,\"title\":\"collaboration committees engaging volunteers\"},{\"index\":16,\"title\":\"ieee volunteers\"},{\"index\":17,\"title\":\"marketing ieee volunteers projects\"},{\"index\":18,\"title\":\"projects marketing ieee volunteers\"},{\"index\":19,\"title\":\"ieee volunteers projects\"}]', '2025-06-14 22:25:39'),
(114, 138, '[{\"index\":14,\"title\":\"image processing used\"},{\"index\":15,\"title\":\"measure similarity signals images\"},{\"index\":16,\"title\":\"similarity signals images 348\"},{\"index\":17,\"title\":\"blue grayscale cross correlation\"},{\"index\":18,\"title\":\"grayscale cross correlation 12\"},{\"index\":19,\"title\":\"grayscale cross correlation\"}]', '2025-06-15 00:50:34'),
(115, 139, '[{\"index\":0,\"title\":\"images image grid matrix\"},{\"index\":1,\"title\":\"operation image processing\"},{\"index\":8,\"title\":\"image processing\"},{\"index\":9,\"title\":\"operation image processing used\"},{\"index\":14,\"title\":\"image processing used\"},{\"index\":16,\"title\":\"similarity signals images 348\"},{\"index\":18,\"title\":\"grayscale cross correlation 12\"},{\"index\":19,\"title\":\"grayscale cross correlation\"}]', '2025-06-15 00:56:32'),
(116, 142, '[{\"index\":0,\"title\":\"Images image grid matrix\"},{\"index\":1,\"title\":\"Operation image processing\"},{\"index\":2,\"title\":\"Image applying mathematical operations\"},{\"index\":3,\"title\":\"Mathematical operations pixel values\"},{\"index\":4,\"title\":\"Image processing used filtering\"},{\"index\":5,\"title\":\"Convolution operation image filter\"},{\"index\":19,\"title\":\"Grayscale cross correlation\"}]', '2025-06-15 05:04:08'),
(117, 143, '[{\"index\":0,\"title\":\"Images image grid matrix\"},{\"index\":1,\"title\":\"Operation image processing\"},{\"index\":2,\"title\":\"Image applying mathematical operations\"},{\"index\":3,\"title\":\"Mathematical operations pixel values\"},{\"index\":4,\"title\":\"Image processing used filtering\"},{\"index\":5,\"title\":\"Convolution operation image filter\"}]', '2025-06-15 05:23:23'),
(118, 144, '[{\"index\":0,\"title\":\"Images image grid matrix\"},{\"index\":1,\"title\":\"Operation image processing\"},{\"index\":18,\"title\":\"Grayscale cross correlation 12\"},{\"index\":19,\"title\":\"Grayscale cross correlation\"}]', '2025-06-15 06:40:48'),
(119, 145, '[{\"index\":16,\"title\":\"Similarity signals images 348\"},{\"index\":17,\"title\":\"Blue grayscale cross correlation\"},{\"index\":18,\"title\":\"Grayscale cross correlation 12\"},{\"index\":19,\"title\":\"Grayscale cross correlation\"}]', '2025-06-15 06:46:38'),
(120, 147, '[{\"index\":0,\"title\":\"Images image grid matrix\"},{\"index\":1,\"title\":\"Operation image processing\"},{\"index\":2,\"title\":\"Image applying mathematical operations\"},{\"index\":3,\"title\":\"Mathematical operations pixel values\"},{\"index\":18,\"title\":\"Grayscale cross correlation 12\"},{\"index\":19,\"title\":\"Grayscale cross correlation\"}]', '2025-06-15 08:21:07'),
(121, 148, '[{\"index\":15,\"title\":\"Class thresholding otsu method\"},{\"index\":16,\"title\":\"Class threshold thresholding otsu\"},{\"index\":17,\"title\":\"Foreground thresholding otsu\"},{\"index\":18,\"title\":\"Object class thresholding otsu\"},{\"index\":19,\"title\":\"Foreground thresholding otsu method\"}]', '2025-06-15 09:20:58'),
(122, 150, '[{\"index\":0,\"title\":\"Class thresholding\"},{\"index\":1,\"title\":\"Object class thresholding\"},{\"index\":19,\"title\":\"Foreground thresholding otsu method\"}]', '2025-06-15 10:34:02'),
(123, 151, '[{\"index\":1,\"title\":\"Object class thresholding\"},{\"index\":3,\"title\":\"Mean class threshold thresholding\"},{\"index\":14,\"title\":\"Foreground thresholding\"},{\"index\":16,\"title\":\"Class threshold thresholding otsu\"},{\"index\":17,\"title\":\"Foreground thresholding otsu\"},{\"index\":18,\"title\":\"Object class thresholding otsu\"},{\"index\":19,\"title\":\"Foreground thresholding otsu method\"}]', '2025-06-15 10:42:46'),
(124, 155, '[{\"index\":0,\"title\":\"Images image grid matrix\"},{\"index\":1,\"title\":\"Operation image processing\"},{\"index\":17,\"title\":\"Blue grayscale cross correlation\"},{\"index\":18,\"title\":\"Grayscale cross correlation 12\"},{\"index\":19,\"title\":\"Grayscale cross correlation\"}]', '2025-06-15 14:50:21'),
(125, 158, '[{\"index\":0,\"title\":\"Images image grid matrix\"},{\"index\":1,\"title\":\"Operation image processing\"},{\"index\":2,\"title\":\"Image applying mathematical operations\"},{\"index\":19,\"title\":\"Grayscale cross correlation\"}]', '2025-06-15 15:15:23'),
(126, 159, '[{\"index\":0,\"title\":\"Images image grid matrix\"},{\"index\":1,\"title\":\"Operation image processing\"},{\"index\":2,\"title\":\"Image applying mathematical operations\"},{\"index\":19,\"title\":\"Grayscale cross correlation\"}]', '2025-06-15 15:18:08'),
(127, 160, '[{\"index\":0,\"title\":\"Images image grid matrix\"},{\"index\":17,\"title\":\"Blue grayscale cross correlation\"},{\"index\":18,\"title\":\"Grayscale cross correlation 12\"},{\"index\":19,\"title\":\"Grayscale cross correlation\"}]', '2025-06-15 15:20:47'),
(128, 161, '[{\"index\":0,\"title\":\"Images image grid matrix\"},{\"index\":1,\"title\":\"Operation image processing\"},{\"index\":2,\"title\":\"Image applying mathematical operations\"}]', '2025-06-15 15:32:56'),
(129, 162, '[{\"index\":0,\"title\":\"Images image grid matrix\"},{\"index\":1,\"title\":\"Operation image processing\"},{\"index\":18,\"title\":\"Grayscale cross correlation 12\"},{\"index\":19,\"title\":\"Grayscale cross correlation\"}]', '2025-06-15 15:45:10'),
(130, 169, '[{\"index\":0,\"title\":\"Images image grid matrix\"},{\"index\":1,\"title\":\"Operation image processing\"},{\"index\":2,\"title\":\"Image applying mathematical operations\"},{\"index\":3,\"title\":\"Mathematical operations pixel values\"},{\"index\":19,\"title\":\"Grayscale cross correlation\"}]', '2025-06-24 07:29:36'),
(132, 170, '[{\"index\":0,\"title\":\"Images image grid matrix\"},{\"index\":1,\"title\":\"Operation image processing\"},{\"index\":2,\"title\":\"Image applying mathematical operations\"},{\"index\":3,\"title\":\"Mathematical operations pixel values\"},{\"index\":4,\"title\":\"Image processing used filtering\"},{\"index\":5,\"title\":\"Convolution operation image filter\"},{\"index\":18,\"title\":\"Grayscale cross correlation 12\"},{\"index\":19,\"title\":\"Grayscale cross correlation\"}]', '2025-06-25 09:23:46');

-- --------------------------------------------------------

--
-- بنية الجدول `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `presentation_id` int(11) NOT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `feedback` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- بنية الجدول `shared_presentations`
--

CREATE TABLE `shared_presentations` (
  `id` int(11) NOT NULL,
  `link_id` varchar(100) NOT NULL,
  `presentation_id` int(11) NOT NULL,
  `views` int(11) DEFAULT 0,
  `expires_at` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- بنية الجدول `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, '', 'user1@example.com', '123456', 'user', '2025-05-18 09:31:23'),
(2, '', 'user2@example.com', '$2y$10$5NzvZjMZxI0M5RnHbQq3Fe9W/v0PIIqEFSpJGuEd7eYVjED49DpkS', 'user', '2025-05-18 09:31:23'),
(3, '', 'user3@example.com', '$2y$10$5NzvZjMZxI0M5RnHbQq3Fe9W/v0PIIqEFSpJGuEd7eYVjED49DpkS', 'user', '2025-05-18 09:31:23'),
(4, '', 'user4@example.com', '$2y$10$5NzvZjMZxI0M5RnHbQq3Fe9W/v0PIIqEFSpJGuEd7eYVjED49DpkS', 'user', '2025-05-18 09:31:23'),
(5, '', 'user5@example.com', '$2y$10$5NzvZjMZxI0M5RnHbQq3Fe9W/v0PIIqEFSpJGuEd7eYVjED49DpkS', 'user', '2025-05-18 09:31:23'),
(6, '', 'user6@example.com', '$2y$10$5NzvZjMZxI0M5RnHbQq3Fe9W/v0PIIqEFSpJGuEd7eYVjED49DpkS', 'user', '2025-05-18 09:31:23'),
(7, '', 'user7@example.com', '$2y$10$5NzvZjMZxI0M5RnHbQq3Fe9W/v0PIIqEFSpJGuEd7eYVjED49DpkS', 'user', '2025-05-18 09:31:23'),
(8, '', 'user8@example.com', '$2y$10$5NzvZjMZxI0M5RnHbQq3Fe9W/v0PIIqEFSpJGuEd7eYVjED49DpkS', 'user', '2025-05-18 09:31:23'),
(9, '', 'user9@example.com', '$2y$10$5NzvZjMZxI0M5RnHbQq3Fe9W/v0PIIqEFSpJGuEd7eYVjED49DpkS', 'user', '2025-05-18 09:31:23'),
(10, '', 'user10@example.com', '$2y$10$5NzvZjMZxI0M5RnHbQq3Fe9W/v0PIIqEFSpJGuEd7eYVjED49DpkS', 'user', '2025-05-18 09:31:23'),
(11, 'Admin', '2@2.2', '$2y$10$Qf0XzmtcFlDrj7H5Xcawleoo4LwpzRfV66G3sIKkKDPu/S5nzHeIC', 'admin', '2025-06-01 23:59:46'),
(12, 'usre', 'user@gmail.com', '$2y$10$Qf0XzmtcFlDrj7H5Xcawleoo4LwpzRfV66G3sIKkKDPu/S5nzHeIC', 'user', '2025-06-02 00:00:27'),
(13, 'Ahmed', 'ahmedmbassiouny5@gmail.com', '$2y$10$Qf0XzmtcFlDrj7H5Xcawleoo4LwpzRfV66G3sIKkKDPu/S5nzHeIC', 'user', '2025-06-03 02:25:31'),
(14, 'test', 'test@gmail.com', '$2y$10$A9Tisx5NnRfgQBp0fSR73etkoEWx6NYREHlIIgSxRO5CDxGpYOlxm', 'user', '2025-06-03 02:30:32'),
(15, 'Ahmed Mohamed Bassiouny', 'Ahmed_20210098@fci.helwan.edu.eg', '$2y$10$DQVIfrhQEaQNJQJib2CmwOTSgGQKk0st2Izr.3dBsn64hT68F47NW', 'user', '2025-06-06 18:05:55'),
(16, 'Ahmed Mohamed Bassiouny', 'ahmedmbassiouni5@gmail.com', '$2y$10$Qf0XzmtcFlDrj7H5Xcawleoo4LwpzRfV66G3sIKkKDP...', 'user', '2025-06-10 07:57:28'),
(17, 'test', 'asd@sdfsd.bgfb', '$2y$10$Qf0XzmtcFlDrj7H5Xcawleoo4LwpzRfV66G3sIKkKDPu/S5nzHeIC', 'user', '2025-06-03 02:30:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `default_pptx_presentations`
--
ALTER TABLE `default_pptx_presentations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `document_id` (`presentation_id`);

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `ga_pptx_presentations`
--
ALTER TABLE `ga_pptx_presentations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `document_id` (`presentation_id`);

--
-- Indexes for table `presentations_content`
--
ALTER TABLE `presentations_content`
  ADD PRIMARY KEY (`id`),
  ADD KEY `document_id` (`document_id`);

--
-- Indexes for table `presentations_titles`
--
ALTER TABLE `presentations_titles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `document_id` (`document_id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `ratings_ibfk_2` (`presentation_id`);

--
-- Indexes for table `shared_presentations`
--
ALTER TABLE `shared_presentations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `link_id` (`link_id`),
  ADD KEY `presentation_id` (`presentation_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `default_pptx_presentations`
--
ALTER TABLE `default_pptx_presentations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- AUTO_INCREMENT for table `ga_pptx_presentations`
--
ALTER TABLE `ga_pptx_presentations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `presentations_content`
--
ALTER TABLE `presentations_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- AUTO_INCREMENT for table `presentations_titles`
--
ALTER TABLE `presentations_titles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shared_presentations`
--
ALTER TABLE `shared_presentations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- قيود الجداول المُلقاة.
--

--
-- قيود الجداول `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `ga_pptx_presentations`
--
ALTER TABLE `ga_pptx_presentations`
  ADD CONSTRAINT `ga_pptx_presentations_ibfk_1` FOREIGN KEY (`presentation_id`) REFERENCES `presentations_content` (`id`);

--
-- قيود الجداول `presentations_titles`
--
ALTER TABLE `presentations_titles`
  ADD CONSTRAINT `presentations_titles_ibfk_1` FOREIGN KEY (`document_id`) REFERENCES `documents` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`presentation_id`) REFERENCES `presentations_content` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `shared_presentations`
--
ALTER TABLE `shared_presentations`
  ADD CONSTRAINT `shared_presentations_ibfk_1` FOREIGN KEY (`presentation_id`) REFERENCES `presentations_content` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `shared_presentations_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
