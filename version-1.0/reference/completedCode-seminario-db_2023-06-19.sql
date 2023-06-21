-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 19-06-2023 a las 21:03:50
-- Versión del servidor: 8.0.18
-- Versión de PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `seminario`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `addGroup` (IN `Username` VARCHAR(50), IN `passwordd` VARCHAR(50), IN `name` VARCHAR(50), IN `isActive` BOOLEAN)  BEGIN
    INSERT INTO `group` (`username`, `password`)
    VALUES (Username, passwordd);
     SET @GROUPID = LAST_INSERT_ID();
     
      CALL addGroupData(name,isActive);
      SET @GROUPDATAID = LAST_INSERT_ID();
      
      CALL addGroupHasGroupdata(@GROUPID,@GROUPDATAID);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addGroupData` (IN `name` VARCHAR(50), IN `isActive` BOOLEAN)  BEGIN
	INSERT INTO `groupdata` (`name`, `isActive`)
    VALUES (name, isActive);
    
    SET @GROUPDATAID = LAST_INSERT_ID();
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addGroupHasGroupdata` (IN `GROUPID` INT, IN `GROUPDATAID` INT)  BEGIN

	INSERT INTO `group_has_groupdata` (`Group_id`, `groupData_id`)
    VALUES (GROUPID, GROUPDATAID);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addUser` (IN `Username` VARCHAR(50), IN `passwordd` VARCHAR(50), IN `namee` VARCHAR(50), IN `surname` VARCHAR(50), IN `dni` VARCHAR(50), IN `telephone` VARCHAR(50), IN `gender` VARCHAR(50), IN `address` VARCHAR(50), IN `mail` VARCHAR(50), IN `role` VARCHAR(50))  BEGIN
    INSERT INTO `user` (`username`, `password`)
    VALUES (Username, passwordd);
    SET @USERID = LAST_INSERT_ID();
    CALL addUserData(namee,surname,                         			dni,telephone,gender,address,mail,role);
    SET @USERDATAID = LAST_INSERT_ID();
    
    CALL addUserHasUserdata(@USERID,@USERDATAID);
    
    CALL addUSerHasGroup(@USERID,3);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addUserData` (IN `namee` VARCHAR(50), IN `surname` VARCHAR(50), IN `dni` VARCHAR(50), IN `telephone` VARCHAR(50), IN `gender` VARCHAR(50), IN `address` VARCHAR(50), IN `mail` VARCHAR(50), IN `role` VARCHAR(50))  BEGIN
    INSERT INTO `userdata` (`namee`, `surname`, `dni`, `telephone`, `gender`, `address`, `mail`, `role`)
    VALUES (namee, surname, dni, telephone,gender,address, mail,role);
    
    SET @USERDATAID = LAST_INSERT_ID();
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addUSerHasGroup` (IN `userID` INT, IN `groupID` INT)  BEGIN
	INSERT INTO `user_has_group` (`user_id`, `Group_id`)
    VALUES (userID, groupID);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addUserHasUserdata` (IN `user_id` VARCHAR(50), IN `userData_id` VARCHAR(50))  BEGIN
	INSERT INTO `user_has_userdata` (`user_id`, `userData_id`)
    VALUES (user_id, userData_id);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteGroup` (IN `groupID` VARCHAR(50))  BEGIN
    DELETE FROM `group` WHERE id = groupID;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteUser` (IN `userID` VARCHAR(50))  BEGIN
	DELETE FROM `user` WHERE id = userID;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectAllData` (IN `table_name` VARCHAR(50))  BEGIN
    SET @query = CONCAT('SELECT * FROM ', table_name);
    PREPARE stmt FROM @query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectGroupData` (IN `groupID` VARCHAR(50))  BEGIN
	SELECT * FROM `group` WHERE id = groupID;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectUserData` (IN `userID` VARCHAR(50))  BEGIN
	set @userData = CONCAT('SELECT * FROM user WHERE id =',userID);
	prepare stmt FROM @userData;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `access`
--

CREATE TABLE `access` (
  `id` int(11) NOT NULL,
  `managmentLevel` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `access_has_resource`
--

CREATE TABLE `access_has_resource` (
  `access_id` int(11) NOT NULL,
  `resource_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `group`
--

CREATE TABLE `group` (
  `id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `group`
--

INSERT INTO `group` (`id`, `username`, `password`) VALUES
(2, 'teachers', '423424'),
(3, 'guests', '77787'),
(8, 'students', 'educar_2018');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `groupdata`
--

CREATE TABLE `groupdata` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `isActive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `groupdata`
--

INSERT INTO `groupdata` (`id`, `name`, `isActive`) VALUES
(1, 'guests', 1),
(2, 'students', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `group_has_access`
--

CREATE TABLE `group_has_access` (
  `Group_id` int(11) NOT NULL,
  `access_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `group_has_groupdata`
--

CREATE TABLE `group_has_groupdata` (
  `Group_id` int(11) NOT NULL,
  `groupData_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `group_has_groupdata`
--

INSERT INTO `group_has_groupdata` (`Group_id`, `groupData_id`) VALUES
(8, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resource`
--

CREATE TABLE `resource` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `data` varchar(45) NOT NULL,
  `isActive` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `username`, `password`) VALUES
(1, 'omar', '123456'),
(2, 'Valentina', '098765'),
(3, 'paco', '432442'),
(4, 'jazmin', '939211'),
(6, 'pedrito', '45464564'),
(7, 'miguelito', '00998877'),
(9, 'fulano', '887766'),
(11, 'santi', '432432432'),
(12, 'manuu', '4545454'),
(13, 'juanchi', '4545454'),
(17, 'Roman', '10101010'),
(18, 'Maxi', '10101010');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `userdata`
--

CREATE TABLE `userdata` (
  `id` int(11) NOT NULL,
  `namee` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `surname` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `dni` varchar(45) NOT NULL,
  `telephone` varchar(45) NOT NULL,
  `gender` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `mail` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `userdata`
--

INSERT INTO `userdata` (`id`, `namee`, `surname`, `dni`, `telephone`, `gender`, `address`, `mail`, `role`) VALUES
(1, 'omar', 'lopez', 'dni', 'telephone', 'gender', 'address', 'mail', 'role'),
(2, 'miguel', 'ramirez', '2132132', '1', '2', '3', '4', '2'),
(3, 'ezequiel', 'López', '432432432', '65465466', 'Masculino', 'Beruti 8490', 'eze@gmail.com', 'estudiante'),
(4, 'ezequiel', 'López', '432432432', '65465466', 'Masculino', 'Beruti 8490', 'eze@gmail.com', 'estudiante'),
(5, 'ezequiel', 'López', '432432432', '65465466', 'Masculino', 'Beruti 8490', 'eze@gmail.com', 'estudiante'),
(6, 'maria', 'perez', '3213213', '3214124', 'femenino', 'Beruti 8490', 'mari@gmail.com', 'estudiante'),
(7, 'manuel', 'juarez', '3213213', '3214124', 'Masculio', 'Beruti 8490', 'manu@gmail.com', 'estudiante'),
(8, 'manuel', 'juarez', '3213213', '3214124', 'Masculio', 'Beruti 8490', 'manu@gmail.com', 'estudiante'),
(9, 'juan', 'dominguez', '5435435', '3213213', 'Masculio', 'Beruti 8490', 'junachi@gmail.com', 'estudiante'),
(10, 'juan', 'dominguez', '5435435', '3213213', 'Masculio', 'Beruti 8490', 'junachi@gmail.com', 'estudiante'),
(13, 'Roman', 'Riquelme', '101010011', '10129192', 'Masculio', 'San jose 8760', 'Roman@gmail.com', 'estudiante'),
(14, 'Maximiliano', 'Rodriguez', '7676767', '46456546', 'Masculino', 'San benito 9010', 'Maxi@gmail.com', 'estudiante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_has_group`
--

CREATE TABLE `user_has_group` (
  `user_id` int(11) NOT NULL,
  `Group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `user_has_group`
--

INSERT INTO `user_has_group` (`user_id`, `Group_id`) VALUES
(17, 3),
(18, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_has_userdata`
--

CREATE TABLE `user_has_userdata` (
  `user_id` int(11) NOT NULL,
  `userData_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `user_has_userdata`
--

INSERT INTO `user_has_userdata` (`user_id`, `userData_id`) VALUES
(1, 1),
(18, 14);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `access`
--
ALTER TABLE `access`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `access_has_resource`
--
ALTER TABLE `access_has_resource`
  ADD PRIMARY KEY (`access_id`,`resource_id`),
  ADD KEY `fk_access_has_resource_resource1_idx` (`resource_id`),
  ADD KEY `fk_access_has_resource_access1_idx` (`access_id`);

--
-- Indices de la tabla `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indices de la tabla `groupdata`
--
ALTER TABLE `groupdata`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indices de la tabla `group_has_access`
--
ALTER TABLE `group_has_access`
  ADD PRIMARY KEY (`Group_id`,`access_id`),
  ADD KEY `fk_Group_has_access_access1_idx` (`access_id`),
  ADD KEY `fk_Group_has_access_Group1_idx` (`Group_id`);

--
-- Indices de la tabla `group_has_groupdata`
--
ALTER TABLE `group_has_groupdata`
  ADD PRIMARY KEY (`Group_id`,`groupData_id`),
  ADD UNIQUE KEY `Group_id_UNIQUE` (`Group_id`),
  ADD UNIQUE KEY `groupData_id_UNIQUE` (`groupData_id`),
  ADD KEY `fk_Group_has_groupData_groupData1_idx` (`groupData_id`),
  ADD KEY `fk_Group_has_groupData_Group1_idx` (`Group_id`);

--
-- Indices de la tabla `resource`
--
ALTER TABLE `resource`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indices de la tabla `userdata`
--
ALTER TABLE `userdata`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indices de la tabla `user_has_group`
--
ALTER TABLE `user_has_group`
  ADD PRIMARY KEY (`user_id`,`Group_id`),
  ADD KEY `fk_user_has_Group_Group1_idx` (`Group_id`),
  ADD KEY `fk_user_has_Group_user1_idx` (`user_id`);

--
-- Indices de la tabla `user_has_userdata`
--
ALTER TABLE `user_has_userdata`
  ADD PRIMARY KEY (`user_id`,`userData_id`),
  ADD UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  ADD UNIQUE KEY `userData_id_UNIQUE` (`userData_id`),
  ADD KEY `fk_user_has_userData_userData1_idx` (`userData_id`),
  ADD KEY `fk_user_has_userData_user_idx` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `access`
--
ALTER TABLE `access`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `group`
--
ALTER TABLE `group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `groupdata`
--
ALTER TABLE `groupdata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `resource`
--
ALTER TABLE `resource`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `userdata`
--
ALTER TABLE `userdata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `access_has_resource`
--
ALTER TABLE `access_has_resource`
  ADD CONSTRAINT `fk_access_has_resource_access1` FOREIGN KEY (`access_id`) REFERENCES `access` (`id`),
  ADD CONSTRAINT `fk_access_has_resource_resource1` FOREIGN KEY (`resource_id`) REFERENCES `resource` (`id`);

--
-- Filtros para la tabla `group_has_access`
--
ALTER TABLE `group_has_access`
  ADD CONSTRAINT `fk_Group_has_access_Group1` FOREIGN KEY (`Group_id`) REFERENCES `group` (`id`),
  ADD CONSTRAINT `fk_Group_has_access_access1` FOREIGN KEY (`access_id`) REFERENCES `access` (`id`);

--
-- Filtros para la tabla `group_has_groupdata`
--
ALTER TABLE `group_has_groupdata`
  ADD CONSTRAINT `fk_Group_has_groupData_Group1` FOREIGN KEY (`Group_id`) REFERENCES `group` (`id`),
  ADD CONSTRAINT `fk_Group_has_groupData_groupData1` FOREIGN KEY (`groupData_id`) REFERENCES `groupdata` (`id`);

--
-- Filtros para la tabla `user_has_group`
--
ALTER TABLE `user_has_group`
  ADD CONSTRAINT `fk_user_has_Group_Group1` FOREIGN KEY (`Group_id`) REFERENCES `group` (`id`),
  ADD CONSTRAINT `fk_user_has_Group_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `user_has_userdata`
--
ALTER TABLE `user_has_userdata`
  ADD CONSTRAINT `fk_user_has_userData_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `fk_user_has_userData_userData1` FOREIGN KEY (`userData_id`) REFERENCES `userdata` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
