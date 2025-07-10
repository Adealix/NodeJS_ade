-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 07, 2025 at 10:05 AM
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
-- Database: `2ndyear_3rdsem`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `address` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `zipcode` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT 'storage/images/logo1.png',
  `user_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `title`, `last_name`, `first_name`, `address`, `city`, `zipcode`, `phone`, `image_path`, `user_id`) VALUES
(1, 'Mr Token', 'Test1', 'Account1', 'address nagana ba', 'tag', '1234', '86545645545', 'storage/images/IMG_7580 - Copy (2)-1751735079187-962576423-1751776639950-756970914.jpg', 1),
(2, '', 'Test2', 'Account2', '', '', '', '', 'storage/images/gamebackground-1751781911542-493661699.jpg', 2),
(3, '', 'Test3', 'Account3', '', '', '', NULL, NULL, 3),
(4, 'Mr', 'Test10', 'Acc10', 'ket ano', 'san', '1231', '123123123', NULL, 4),
(5, '', 'Test Picture', 'Nagana ba default', '', '', '', NULL, 'storage/images/logo1.png', 5),
(6, 'Mrs', 'Test12', 'Acc12', 'Ket saan', 'Taguig City', '1633', '0293482423', 'storage/images/logo1.png', 6),
(7, 'Mr', 'Test13', 'Acc13', 'palit profile', '', '', '', 'storage/images/IMG_7505-1751725979921-239671846-1751851379045-247986388.jpg', 7),
(8, 'Mr.', 'Maranan', 'Adealix Jairon', 'Block 29, Lot 31, Damayan Area, Central Signa', 'Taguig City', '1633', '09157782493', 'storage/images/IMG_6310-1751857913458-493583959.jpg', 8);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `item_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(50) NOT NULL,
  `category` varchar(100) NOT NULL,
  `cost_price` decimal(9,2) DEFAULT NULL,
  `sell_price` decimal(9,2) DEFAULT NULL,
  `show_item` enum('yes','no') NOT NULL DEFAULT 'yes'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`item_id`, `name`, `description`, `category`, `cost_price`, `sell_price`, `show_item`) VALUES
(1, 'Sample Item 2 edit', 'A test item to check image edit', 'Test Image edited na kaya?', 1.00, 2.00, 'yes'),
(3, 'Sample Item 4 edit image', 'A test item to check image', 'Test Image', 1999.99, 9999.00, 'no'),
(4, 'Sample Item 4', 'A test item to check image', 'Test Image', 1999.99, 9999.00, 'yes'),
(5, 'Sample Item 5', 'A test item to check image', 'Test Image', 1999.99, 9999.00, 'yes'),
(6, 'Sample Item 6', 'A test item to check image', 'Test Image', 1999.99, 9999.00, 'yes'),
(7, 'Sample Item 7', 'A test item to check image', 'Test Image', 1999.99, 9999.00, 'yes'),
(10, 'create item 1', 'kahit ano to', 'first item', 111.00, 222.00, 'yes'),
(11, 'edit item', 'ewan, sana gumana kase kung inde iiyaq aq', 'category is required', 123.00, 234.00, 'yes'),
(15, 'item default pic', 'malalaman natin', 'nagana kaya?', 15.00, 20.00, 'yes'),
(16, 'nakakatuwa magcode', 'maraming pics', 'hehe', 10.00, 20.00, 'yes'),
(17, 'last create marami images', 'asdasd', 'sadas', 123.00, 234.00, 'yes'),
(19, 'Its like in the Mirror', 'kahit ano na to', 'create item?', 1023.00, 2056.00, 'yes'),
(20, 'Item to be updated na-update na siya guys', 'dedelete to tsaka libre? edit muna pala', 'ewan edit', 200.00, 201.00, 'yes');

-- --------------------------------------------------------

--
-- Table structure for table `items_images`
--

CREATE TABLE `items_images` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `items_images`
--

INSERT INTO `items_images` (`id`, `item_id`, `image_path`, `created_at`, `updated_at`) VALUES
(2, 4, 'storage/images/logo1.png', NULL, NULL),
(3, 5, 'storage/images/logo1.png', NULL, NULL),
(4, 5, 'storage/images/IMG_7505.JPG', NULL, NULL),
(5, 6, 'storage/images/logo1.png', NULL, NULL),
(6, 7, 'storage/images/logo1.png', NULL, NULL),
(7, 7, 'storage/images/IMG_7505.JPG', NULL, NULL),
(9, 10, 'storage/images/gamebackground-1751723079959-462677064.jpg', NULL, NULL),
(16, 1, 'storage/images/gamebackground-1751725050780-634017877.jpg', NULL, NULL),
(17, 3, 'storage/images/gamebackground-1751725979921-703596433.jpg', NULL, NULL),
(18, 3, 'storage/images/IMG_7505-1751725979921-239671846.jpg', NULL, NULL),
(19, 3, 'storage/images/logo1-1751725979987-682026405.png', NULL, NULL),
(26, 11, 'storage/images/gamebackground-1751735078966-851823612.jpg', NULL, NULL),
(27, 11, 'storage/images/IMG_7505 - Copy-1751735078967-418225874.jpg', NULL, NULL),
(28, 11, 'storage/images/IMG_7580 - Copy (2)-1751735079187-962576423.jpg', NULL, NULL),
(29, 11, 'storage/images/IMG_7628-1751735079599-79274361.jpg', NULL, NULL),
(30, 11, 'storage/images/IMG_20250201_155931-1751735079706-491388038.jpg', NULL, NULL),
(31, 11, 'storage/images/logo1-1751735079747-294365780.png', NULL, NULL),
(32, 15, 'storage/images/logo1.png', NULL, NULL),
(33, 16, 'storage/images/logo1-1751735388847-97551327.png', NULL, NULL),
(34, 17, 'storage/images/gamebackground-1751735421916-963388758.jpg', NULL, NULL),
(35, 17, 'storage/images/IMG_7505 - Copy-1751735078967-418225874-1751735421916-870049738.jpg', NULL, NULL),
(36, 17, 'storage/images/IMG_7580 - Copy (2)-1751735079187-962576423-1751735422025-628502075.jpg', NULL, NULL),
(37, 17, 'storage/images/IMG_7628-1751735062416-357246868-1751735422107-362434046.jpg', NULL, NULL),
(38, 17, 'storage/images/logo1-1751735422168-307425105.png', NULL, NULL),
(41, 19, 'storage/images/logo1.png', NULL, NULL),
(45, 20, 'storage/images/IMG_7505-1750923289159-721967857-1751726830633-113384513-1751803192906-658146369.jpg', NULL, NULL),
(46, 20, 'storage/images/IMG_7628-1751735079599-79274361-1751803193022-869041386.jpg', NULL, NULL),
(47, 20, 'storage/images/logo1-1751722802697-995403047-1751803193062-304659633.png', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(28, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(29, '2025_07_02_133819_create_customer_table', 1),
(30, '2025_07_02_133819_create_failed_jobs_table', 1),
(31, '2025_07_02_133819_create_items_images_table', 1),
(32, '2025_07_02_133819_create_items_table', 1),
(33, '2025_07_02_133819_create_order_receipts_table', 1),
(34, '2025_07_02_133819_create_orderline_table', 1),
(35, '2025_07_02_133819_create_orders_table', 1),
(36, '2025_07_02_133819_create_password_reset_tokens_table', 1),
(37, '2025_07_02_133819_create_stock_table', 1),
(38, '2025_07_02_133819_create_users_table', 1),
(39, '2025_07_02_133822_add_foreign_keys_to_customer_table', 1),
(40, '2025_07_02_133822_add_foreign_keys_to_items_images_table', 1),
(41, '2025_07_02_133822_add_foreign_keys_to_order_receipts_table', 1),
(42, '2025_07_02_133822_add_foreign_keys_to_orderline_table', 1),
(43, '2025_07_02_133822_add_foreign_keys_to_orders_table', 1),
(44, '2025_07_02_133822_add_foreign_keys_to_stock_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orderline`
--

CREATE TABLE `orderline` (
  `item_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orderline`
--

INSERT INTO `orderline` (`item_id`, `order_id`, `quantity`) VALUES
(1, 3, 1),
(4, 6, 1),
(10, 6, 5),
(11, 6, 1),
(15, 6, 2);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `date_ordered` date DEFAULT NULL,
  `date_delivery` date DEFAULT NULL,
  `status` enum('processing','delivered','canceled') NOT NULL DEFAULT 'processing',
  `updated_at` timestamp NULL DEFAULT NULL,
  `customer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `date_ordered`, `date_delivery`, `status`, `updated_at`, `customer_id`) VALUES
(3, '2025-07-06', '2025-07-07', 'delivered', '2025-07-07 02:16:23', 1),
(6, '2025-07-07', '2025-07-07', 'delivered', '2025-07-07 03:12:58', 8);

-- --------------------------------------------------------

--
-- Table structure for table `order_receipts`
--

CREATE TABLE `order_receipts` (
  `receipt_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `sent_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`item_id`, `quantity`) VALUES
(1, 0),
(3, 5),
(4, 1),
(5, 5),
(6, 5),
(7, 5),
(10, 118),
(11, 344),
(15, 1),
(16, 30),
(17, 345),
(19, 15),
(20, 4);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `api_token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `email_verified_at`, `password`, `remember_token`, `status`, `role`, `created_at`, `updated_at`, `deleted_at`, `api_token`) VALUES
(1, 'test1@gmail.com', NULL, '$2b$10$FivaZFzcgk/KTgorsMokr.4DzEn2IiL2SMktBFW4F81x6gRiFl6L.', NULL, 'active', 'admin', NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUxODU3OTYxfQ.vOEaiWaoQT9njN5wzBHxs6B6honMD0QGfzEOjk2h8-g'),
(2, 'test2@gmail.com', NULL, '$2b$10$8jf.V7IL4qHQ9mXO4Jopnu4Uq55Aefwcd3Pe13f/phIiV7G63PfVa', NULL, 'active', 'admin', NULL, NULL, NULL, NULL),
(3, 'test3@gmail.com', NULL, '$2b$10$2ahCagK1e1isnMQUoBfGqubZrLmK21hfxnbdxAe3OqteuQX1YXTAu', NULL, 'inactive', 'user', NULL, NULL, NULL, NULL),
(4, 'test10@gmail.com', NULL, '$2b$10$LFHYR60zNcxoTEC6fqI2ye0aUs.eieHXVoE4vgrZRSTQ7GohpKkdu', NULL, 'active', 'user', NULL, NULL, NULL, NULL),
(5, 'test11@gmail.com', NULL, '$2b$10$CK1QUjbLqtf5/Ds/MpyZSu8BR680bOPfKFNyU93vU3u8RcBUFS6YS', NULL, 'active', 'user', NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTE3ODEzNTB9.L0n90Sfcr8cAm_Lo-kLbnbsAjOaYZMbfrG4QMgh7pHI'),
(6, 'test12@gmail.com', NULL, '$2b$10$8gcRXnh/capAmjo/FL4VJeeiDOiahJbBU48QC2lT84v9.nSdK4D.G', NULL, 'active', 'user', NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTE3ODE1MjZ9.NygLiyU88C45R45NiGtXdJ-khkV1K2_FbqaTwiJ2xA4'),
(7, 'test13@gmail.com', NULL, '$2b$10$r17BJUDK5buWe2CvcaZrHuo4Mm1JQVvP6cRuv8f.FNofdjpMmGh.e', NULL, 'active', 'user', NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6InVzZXIiLCJpYXQiOjE3NTE4NTEzNTZ9.47YqEiNIMBQcvNNjhZb23W_EqpVPj6Ugnd06R5iDWmE'),
(8, 'adealixmaranan1234@gmail.com', NULL, '$2b$10$cp28TldbLj/dWIIULv0ZAudNlL170ExOCg/vwNc8zYOPozZeAxsMy', NULL, 'active', 'user', NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `items_images`
--
ALTER TABLE `items_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderline`
--
ALTER TABLE `orderline`
  ADD PRIMARY KEY (`item_id`,`order_id`),
  ADD KEY `idx_orderline_order` (`order_id`),
  ADD KEY `fk_items_has_orders_items1_idx` (`item_id`),
  ADD KEY `fk_items_has_orders_orders1_idx` (`order_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `idx_orders_customer` (`customer_id`),
  ADD KEY `fk_orders_customers_idx` (`customer_id`);

--
-- Indexes for table `order_receipts`
--
ALTER TABLE `order_receipts`
  ADD PRIMARY KEY (`receipt_id`),
  ADD KEY `idx_order_receipts_order` (`order_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `items_images`
--
ALTER TABLE `items_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `order_receipts`
--
ALTER TABLE `order_receipts`
  MODIFY `receipt_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `fk_customer_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `items_images`
--
ALTER TABLE `items_images`
  ADD CONSTRAINT `fk_items_images_item` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orderline`
--
ALTER TABLE `orderline`
  ADD CONSTRAINT `fk_orderline_item` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_orderline_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON UPDATE CASCADE;

--
-- Constraints for table `order_receipts`
--
ALTER TABLE `order_receipts`
  ADD CONSTRAINT `fk_order_receipts_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `stock_item_id_foreign` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
