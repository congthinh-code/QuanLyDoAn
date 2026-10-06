-- =====================================================
-- QUAN LY DO AN - USER SERVICE
-- DATABASE: quanlydoan
-- SQL SERVER
-- =====================================================

USE master;
GO

-- =====================================================
-- 1. TAO DATABASE NEU CHUA CO
-- =====================================================

IF DB_ID('quanlydoan') IS NULL
BEGIN
    CREATE DATABASE quanlydoan;
END
GO

-- =====================================================
-- 2. SU DUNG DATABASE
-- =====================================================

USE quanlydoan;
GO

-- =====================================================
-- 3. XOA BANG CU NEU TON TAI
-- =====================================================

IF OBJECT_ID('dbo.sinhvien', 'U') IS NOT NULL
BEGIN
    DROP TABLE dbo.sinhvien;
END
GO

-- =====================================================
-- 4. TAO BANG SINHVIEN
-- trangthai:
-- 1 = Du dieu kien lam do an
-- 0 = Bi khoa / Chua du dieu kien
-- =====================================================

CREATE TABLE dbo.sinhvien
(
    masv VARCHAR(20) PRIMARY KEY,
    hoten NVARCHAR(100) NOT NULL,
    lop VARCHAR(50) NOT NULL,
    khoa NVARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    trangthai BIT NOT NULL DEFAULT 1
);
GO

-- =====================================================
-- 5. THEM DU LIEU MAU
-- =====================================================

INSERT INTO dbo.sinhvien
(
    masv,
    hoten,
    lop,
    khoa,
    email,
    trangthai
)
VALUES
('SV001', N'Nguyễn Văn An',   'CNTT01', N'Công nghệ thông tin', 'sv001@gmail.com', 1),
('SV002', N'Trần Thị Bình',   'CNTT01', N'Công nghệ thông tin', 'sv002@gmail.com', 0),
('SV003', N'Lê Nhật Minh',    'CNTT02', N'Công nghệ thông tin', 'sv003@gmail.com', 1),
('SV004', N'Võ Thiên Ân',     'CNTT03', N'Công nghệ thông tin', 'sv004@gmail.com', 1),
('SV005', N'Trần Hải Đăng',   'CNTT01', N'Công nghệ thông tin', 'sv005@gmail.com', 0),
('SV006', N'Nguyễn Gia Huy',  'CNTT02', N'Công nghệ thông tin', 'sv006@gmail.com', 1),
('SV007', N'Phan Hoàng Long', 'CNTT04', N'Công nghệ thông tin', 'sv007@gmail.com', 1),
('SV008', N'Đặng Khánh Vy',   'CNTT03', N'Công nghệ thông tin', 'sv008@gmail.com', 0),
('SV009', N'Hồ Bảo Ngọc',     'CNTT01', N'Công nghệ thông tin', 'sv009@gmail.com', 1),
('SV010', N'Bùi Quốc Thiên',  'CNTT04', N'Công nghệ thông tin', 'sv010@gmail.com', 1),
('SV011', N'Dương Tuệ Lâm',   'CNTT02', N'Công nghệ thông tin', 'sv011@gmail.com', 0),
('SV012', N'Cao Minh Triết',  'CNTT03', N'Công nghệ thông tin', 'sv012@gmail.com', 1);
GO

-- =====================================================
-- 6. KIEM TRA DU LIEU
-- =====================================================

SELECT
    masv,
    hoten,
    lop,
    khoa,
    email,
    trangthai
FROM dbo.sinhvien
ORDER BY masv;
GO