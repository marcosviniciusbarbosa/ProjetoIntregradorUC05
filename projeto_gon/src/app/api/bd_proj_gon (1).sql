-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 30/01/2024 às 02:49
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bd_proj_gon`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cep` varchar(9) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `genero` varchar(50) NOT NULL,
  `data_nascimento` date NOT NULL,
  `cpf` varchar(15) NOT NULL,
  `foto` int(50) NOT NULL,
  `status` int(1) NOT NULL,
  `logradouro` char(100) NOT NULL,
  `numero` int(255) NOT NULL,
  `complemento` char(100) NOT NULL,
  `bairro` text NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `uf` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `nome`, `cep`, `telefone`, `genero`, `data_nascimento`, `cpf`, `foto`, `status`, `logradouro`, `numero`, `complemento`, `bairro`, `cidade`, `uf`) VALUES
(1, 'MARCOS VINICIUS BARBOSA 02', '12071-839', '(12)98196-6901', 'M', '1996-12-23', '44682975811', 0, 1, 'Rua João Gonçalves dos Santos', 14, 'casa', 'Conjunto Habitacional Humberto Passarelli', 'Taubaté', 'SP'),
(4, 'MARCOS VINICIUS BARBOSA 01', '12071-839', '(12)98196-6901', 'M', '1996-12-23', '44682975812', 0, 1, 'Rua João Gonçalves dos Santos', 14, 'casa', 'Conjunto Habitacional Humberto Passarelli', 'Taubaté', 'SP'),
(5, 'MARCOS VINICIUS BARBOSA 02', '12071839', '1121651681', 'M', '0000-00-00', '51516515621', 0, 0, 'Rua João Gonçalves dos Santos', 14, 'casa', 'Conjunto Habitacional Humberto Passarelli', 'Taubaté', 'SP'),
(6, 'MARCOS VINICIUS BARBOSA 07', '', '1111111111', 'M', '0000-00-00', '15165165165', 0, 1, '', 0, '', '', '', ''),
(7, 'MARCOS VINICIUS BARBOSA 06', '', '1651651891', 'M', '0000-00-00', '15616161651', 0, 1, '', 0, '', '', '', ''),
(8, 'MARCOS VINICIUS BARBOSA 05', '', '1651651891', 'M', '0000-00-00', '15616161651', 0, 0, '', 0, '', '', '', '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `colaboradores`
--

CREATE TABLE `colaboradores` (
  `id_colaborador` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cpf_cnpj` varchar(18) NOT NULL,
  `tipo` int(1) NOT NULL,
  `telefone` varchar(15) NOT NULL,
  `cep` varchar(9) NOT NULL,
  `logradouro` varchar(100) NOT NULL,
  `numero` int(255) NOT NULL,
  `bairro` varchar(50) NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `complemento` text NOT NULL,
  `data_nascimento` varchar(10) NOT NULL,
  `foto` varchar(50) NOT NULL,
  `uf` varchar(2) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `colaboradores`
--

INSERT INTO `colaboradores` (`id_colaborador`, `nome`, `cpf_cnpj`, `tipo`, `telefone`, `cep`, `logradouro`, `numero`, `bairro`, `cidade`, `complemento`, `data_nascimento`, `foto`, `uf`, `status`) VALUES
(1, 'MARCOS VINICIUS', '44682975800', 1, '12991471718', '', '', 0, '', '', '', '', '', '', 1),
(2, 'Carlos', '2233333344441', 0, '12991471918', '', '', 0, '', '', '', '', '', '', 0),
(3, 'João', '12345678900', 0, '1200675142', '12053000', 'Rua Voluntário Benedito Sérgio', 52, 'Parque São Cristóvão', 'Taubaté', '', '2002-02-01', '', 'SP', 0);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Índices de tabela `colaboradores`
--
ALTER TABLE `colaboradores`
  ADD PRIMARY KEY (`id_colaborador`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `colaboradores`
--
ALTER TABLE `colaboradores`
  MODIFY `id_colaborador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
