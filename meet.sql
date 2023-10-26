-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : jeu. 26 oct. 2023 à 09:36
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `meet`
--

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `authordId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`authordId`, `userId`) VALUES
('820361590826205215', '820361590826205215'),
('856274419995770951', '820361590826205215');

-- --------------------------------------------------------

--
-- Structure de la table `matchDm`
--

CREATE TABLE `matchDm` (
  `userId` varchar(255) DEFAULT NULL,
  `authorId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `matchDm`
--

INSERT INTO `matchDm` (`userId`, `authorId`) VALUES
('820361590826205215', '922779898651746314'),
('820361590826205215', '856274419995770951');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `userId` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `age` varchar(255) DEFAULT NULL,
  `sexe` varchar(255) DEFAULT NULL,
  `orientation` varchar(255) DEFAULT NULL,
  `intention` varchar(255) DEFAULT NULL,
  `biographie` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `demandedispo` varchar(255) NOT NULL DEFAULT '2',
  `envoiedispo` varchar(255) NOT NULL DEFAULT '1',
  `demandeenvoie` varchar(255) NOT NULL DEFAULT '0',
  `Matchs` varchar(255) NOT NULL DEFAULT '0',
  `coeur` varchar(255) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`userId`, `prenom`, `age`, `sexe`, `orientation`, `intention`, `biographie`, `photo`, `demandedispo`, `envoiedispo`, `demandeenvoie`, `Matchs`, `coeur`) VALUES
('820361590826205215', 'Salut', '38', 'Homme', 'Normal', 'Plan Q', 'couocu', 'https://media.discordapp.net/attachments/1121718489829347358/1166720960519483462/7aac999f34d23f7de7c2291410550bab.gif?width=1100&height=607', '-1', '1', '0', '3', '3'),
('1087067444847317002', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2', '1', '0', '0', '0'),
('856274419995770951', 'Lola', '21', 'Femme', 'Hétéro', 'Plan Q', 'J\'ai 2 gros arguments', 'https://tenor.com/view/one-piece-nami-gif-22883203', '1', '1', '0', '3', '0'),
('922779898651746314', 'Rs', '16', 'Homme', 'normal', 'Connaissance', 'beau', 'https://cdn.discordapp.com/attachments/1152989374179463248/1166777210217169050/1626-online-mobile.png?ex=654bb8f4&is=653943f4&hm=fcd7877a4843a595f69b51ba0488ad508512b752885fac535e58b65c7238b4c3&', '1', '1', '0', '0', '0');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
