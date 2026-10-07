-- 1. TAO DATABASE CHO TOPIC SERVICE
USE master;
GO

IF DB_ID('quanlydoan_topic_db') IS NULL
BEGIN
    CREATE DATABASE quanlydoan_topic_db;
END
GO

USE quanlydoan_topic_db;
GO

-- 2. XOA BANG CU NEU DA TON TAI
IF OBJECT_ID('dbo.dangky', 'U') IS NOT NULL DROP TABLE dbo.dangky;
IF OBJECT_ID('dbo.detai', 'U') IS NOT NULL DROP TABLE dbo.detai;
GO

-- 3. TAO BANG DE TAI
CREATE TABLE dbo.detai
(
    madetai INT IDENTITY(1,1) PRIMARY KEY,
    tendetai NVARCHAR(200) NOT NULL,
    mota NVARCHAR(MAX) NULL,
    giangvien NVARCHAR(100) NOT NULL,
    soluongtoida INT NOT NULL,
    soluongdadangky INT NOT NULL DEFAULT 0,

    CONSTRAINT CK_detai_soluongtoida CHECK (soluongtoida > 0),
    CONSTRAINT CK_detai_soluongdadangky CHECK (soluongdadangky >= 0),
    CONSTRAINT CK_detai_soluongdangky_hople CHECK (soluongdadangky <= soluongtoida)
);
GO

-- 4. TAO BANG DANG KY (Lưu trữ masv độc lập, không dùng FK sang bảng sinhvien)
CREATE TABLE dbo.dangky
(
    id INT IDENTITY(1,1) PRIMARY KEY,
    madetai INT NOT NULL,
    masv VARCHAR(20) NOT NULL,
    ngay_dangky DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

    CONSTRAINT FK_dangky_detai
        FOREIGN KEY (madetai)
        REFERENCES dbo.detai(madetai)
        ON DELETE CASCADE,

    CONSTRAINT UQ_dangky_detai_sinhvien
        UNIQUE (madetai, masv)
);
GO

-- 5. THEM DU LIEU MAU
INSERT INTO dbo.detai (tendetai, mota, giangvien, soluongtoida, soluongdadangky)
VALUES
(N'Xây dựng hệ thống quản lý đồ án theo SOA', N'Xây dựng hệ thống đề tài và đăng ký đồ án.', N'Nguyễn Văn A', 3, 2),
(N'Xây dựng website bán hàng RESTful API', N'Xây dựng website bán hàng sử dụng NestJS.', N'Trần Văn B', 4, 1),
(N'Ứng dụng trí tuệ nhân tạo trong điểm danh', N'Nghiên cứu ứng dụng AI.', N'Lê Văn C', 2, 0);
GO

INSERT INTO dbo.dangky (madetai, masv)
VALUES
(1, 'SV001'),
(1, 'SV003'),
(2, 'SV004');
GO

-- 6. KIEM TRA DU LIEU VUA TAO
SELECT * FROM dbo.detai;
SELECT * FROM dbo.dangky;
GO