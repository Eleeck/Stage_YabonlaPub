-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 12 fév. 2025 à 16:47
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `yabonlapub`
--

-- --------------------------------------------------------

--
-- Structure de la table `admins`
--

CREATE TABLE `admins` (
  `id_admin` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `crée` timestamp NOT NULL DEFAULT current_timestamp(),
  `modifier` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `admins`
--

INSERT INTO `admins` (`id_admin`, `nom`, `prenom`, `password`, `email`, `crée`, `modifier`) VALUES
(17, 'Cecil', 'Don', '$2b$10$RJoPtOhCwWOWYczVCd3nHOtefdpgBEMpctVKoxr0HjOhASjMyeE6q', 'Don.Cecil@example.com', '2025-02-12 15:41:08', '2025-02-12 15:41:08');

--
-- Déclencheurs `admins`
--
DELIMITER $$
CREATE TRIGGER `before_admins_update` BEFORE UPDATE ON `admins` FOR EACH ROW BEGIN
  SET NEW.modifier = CURRENT_TIMESTAMP;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `associations`
--

CREATE TABLE `associations` (
  `id_assoc` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `site_web` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `associations`
--

INSERT INTO `associations` (`id_assoc`, `nom`, `description`, `adresse`, `site_web`) VALUES
(1, 'Protection de l/`enfance', 'Financement de structures pour enfants', '5 Avenue du Capitaine Nancy 54000', 'https://urldesite.fr'),
(2, 'Association B', 'Description B', 'Adresse B', 'https://www.associationb.fr'),
(3, 'Association C', 'Description C', 'Adresse C', 'https://www.associationc.fr'),
(4, 'Association D', 'Description D', 'Adresse D', 'https://www.associationd.fr'),
(5, 'ClimWarriors', 'Environmental activism', '2 rue de G�n�ral Nancy 54000', 'https//urldesite.fr'),
(7, 'GreenPeace', 'Environment protection', NULL, NULL),
(8, 'GreenPeace', 'Environment protection', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `campagnes`
--

CREATE TABLE `campagnes` (
  `id_campagne` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `date_debut` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `campagnes`
--

INSERT INTO `campagnes` (`id_campagne`, `nom`, `description`, `date_debut`, `date_fin`) VALUES
(1, 'Campagne A', 'Description A', '2025-01-01', '2025-06-01'),
(2, 'Campagne B', 'Description B', '2025-02-01', '2025-07-01'),
(3, 'Campagne C', 'Description C', '2025-03-01', '2025-08-01'),
(4, 'Forest Conservation', 'Campaign to save forests', '2025-10-02', '2025-11-03'),
(5, 'Campagne E', 'Description E', '2025-05-01', '2025-10-01'),
(11, 'Save the Oceans', 'Campaign to clean the oceans', '0000-00-00', '2025-01-04'),
(13, 'Save the Forest', 'Sensibiliser � la protection foresti�re', '2025-10-02', '2025-11-03'),
(14, 'Sauver les tortues', 'Sensibiliser � la protection des tortues', '0000-00-00', '2025-01-04');

-- --------------------------------------------------------

--
-- Structure de la table `campagne_active`
--

CREATE TABLE `campagne_active` (
  `id` int(11) NOT NULL,
  `campagne_id` int(11) NOT NULL,
  `publicite_id` int(11) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'inactive'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `campagne_active`
--

INSERT INTO `campagne_active` (`id`, `campagne_id`, `publicite_id`, `status`) VALUES
(6, 1, 1, 'active'),
(7, 2, 2, 'inactive'),
(8, 3, 3, 'active'),
(9, 4, 4, 'inactive'),
(11, 1, 2, 'inactive'),
(12, 3, 4, 'inactive'),
(13, 1, 3, 'inactive'),
(14, 2, 13, 'inactive');

-- --------------------------------------------------------

--
-- Structure de la table `mecenes`
--

CREATE TABLE `mecenes` (
  `id_mecene` int(11) NOT NULL,
  `nom_mecene` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `mecenes`
--

INSERT INTO `mecenes` (`id_mecene`, `nom_mecene`, `email`, `telephone`, `adresse`) VALUES
(1, 'Mecene A', 'mecene.a@example.com', '0102030405', 'Adresse A'),
(2, 'Mecene B', 'mecene.b@example.com', '0102030406', 'Adresse B'),
(3, 'Mecene C', 'mecene.c@example.com', '0102030407', 'Adresse C'),
(6, 'Entreprise X Inc', 'Entrprise@incPatron.com', '0715423010', 'Adresse 5'),
(7, 'Patron Inc.', 'info@patron.com', NULL, NULL),
(8, 'Patron Inc.', 'info@patron.com', NULL, NULL),
(9, 'Mecene Inc', 'info@hotmail.com', '0752304590', 'adresse Z');

-- --------------------------------------------------------

--
-- Structure de la table `publicites`
--

CREATE TABLE `publicites` (
  `id_pub` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `descriptif` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `publicites`
--

INSERT INTO `publicites` (`id_pub`, `titre`, `descriptif`) VALUES
(1, 'Help the Needy', 'Your support makes a difference.'),
(2, 'Publicité B', 'Descriptif B'),
(3, 'Publicité C', 'Descriptif C'),
(4, 'Publicité D', 'Descriptif D'),
(5, 'Publicité E', 'Descriptif E'),
(6, 'Support Our Cause', 'Join us in our mission to make the world better.'),
(9, 'Support Our Cause', 'Join us in our mission to make the world better.'),
(10, 'Support Our Cause', 'Join us in our mission to make the world better.'),
(11, 'Support Our Cause', 'Join us in our mission to make the world better.'),
(13, 'Support Our Cause', 'Join us in our mission to make the world better.'),
(15, 'Support Our Cause', 'Join us in our mission to make the world better.'),
(18, 'Support Our Cause', 'Join us in our mission to make the world better.');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id_admin`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `associations`
--
ALTER TABLE `associations`
  ADD PRIMARY KEY (`id_assoc`);

--
-- Index pour la table `campagnes`
--
ALTER TABLE `campagnes`
  ADD PRIMARY KEY (`id_campagne`);

--
-- Index pour la table `campagne_active`
--
ALTER TABLE `campagne_active`
  ADD PRIMARY KEY (`id`),
  ADD KEY `campagne_id` (`campagne_id`),
  ADD KEY `publicite_id` (`publicite_id`);

--
-- Index pour la table `mecenes`
--
ALTER TABLE `mecenes`
  ADD PRIMARY KEY (`id_mecene`);

--
-- Index pour la table `publicites`
--
ALTER TABLE `publicites`
  ADD PRIMARY KEY (`id_pub`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admins`
--
ALTER TABLE `admins`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `associations`
--
ALTER TABLE `associations`
  MODIFY `id_assoc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `campagnes`
--
ALTER TABLE `campagnes`
  MODIFY `id_campagne` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `campagne_active`
--
ALTER TABLE `campagne_active`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `mecenes`
--
ALTER TABLE `mecenes`
  MODIFY `id_mecene` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `publicites`
--
ALTER TABLE `publicites`
  MODIFY `id_pub` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `campagne_active`
--
ALTER TABLE `campagne_active`
  ADD CONSTRAINT `campagne_active_ibfk_1` FOREIGN KEY (`campagne_id`) REFERENCES `campagnes` (`id_campagne`),
  ADD CONSTRAINT `campagne_active_ibfk_2` FOREIGN KEY (`publicite_id`) REFERENCES `publicites` (`id_pub`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
