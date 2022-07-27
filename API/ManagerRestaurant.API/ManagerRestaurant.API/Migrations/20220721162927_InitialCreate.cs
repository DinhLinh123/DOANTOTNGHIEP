using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ManagerRestaurant.API.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ChiTieuTrongNgay",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    LinkSp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TongSoTien = table.Column<float>(type: "real", nullable: false),
                    TrangThaiHienTai = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GhiChu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ThoiGianKeToanDuyet = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ThoiGianQuanLyDuyet = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOnDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChiTieuTrongNgay", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DatBan",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdBan = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MaKhachHang = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenKhachHang = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GioDen = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ThoiGian = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SoNguoiLon = table.Column<int>(type: "int", nullable: false),
                    SoTreEm = table.Column<int>(type: "int", nullable: false),
                    GhiChu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOnDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DatBan", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Oder",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdMonAn = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    SoBan = table.Column<int>(type: "int", nullable: false),
                    CreatedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOnDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OderId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Oder", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Oder_Oder_OderId",
                        column: x => x.OderId,
                        principalTable: "Oder",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PhieuOder",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdBan = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SoHopDong = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdThuNgan = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdKhachHang = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TongTien = table.Column<float>(type: "real", nullable: false),
                    ThucThu = table.Column<float>(type: "real", nullable: false),
                    Vocher = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOnDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhieuOder", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SanPhamTrongDon",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DonGia = table.Column<float>(type: "real", nullable: false),
                    IdPhieu = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOnDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SanPhamTrongDon", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SanPhamTrongPhieu",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdPhieu = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    IdDoAn = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOnDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SanPhamTrongPhieu", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "YKienDongGop",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenKH = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SoDienThoai = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NoiDung = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOnDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_YKienDongGop", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ban",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SoNguoiToiDa = table.Column<int>(type: "int", nullable: false),
                    LoaiBan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KieuDang = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOnDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DatBanId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ban", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ban_DatBan_DatBanId",
                        column: x => x.DatBanId,
                        principalTable: "DatBan",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "KhachHang",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SoDienThoai = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOnDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DatBanId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PhieuOderId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KhachHang", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KhachHang_DatBan_DatBanId",
                        column: x => x.DatBanId,
                        principalTable: "DatBan",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_KhachHang_PhieuOder_PhieuOderId",
                        column: x => x.PhieuOderId,
                        principalTable: "PhieuOder",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgaySinh = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DiaChi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SoDienThoai = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Phai = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Quyen = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOnDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhieuOderId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                    table.ForeignKey(
                        name: "FK_User_PhieuOder_PhieuOderId",
                        column: x => x.PhieuOderId,
                        principalTable: "PhieuOder",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DoAn",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TheLoai = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LinkAnh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Loai = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GhiChu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DonViTinh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SoLuongHienCo = table.Column<float>(type: "real", nullable: false),
                    CreatedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOnDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SanPhamTrongPhieuId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DoAn", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DoAn_SanPhamTrongPhieu_SanPhamTrongPhieuId",
                        column: x => x.SanPhamTrongPhieuId,
                        principalTable: "SanPhamTrongPhieu",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PhieuNhapVatTu",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Kieu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TongTien = table.Column<float>(type: "real", nullable: false),
                    CreatedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOnDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SanPhamTrongDonId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    SanPhamTrongPhieuId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhieuNhapVatTu", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PhieuNhapVatTu_SanPhamTrongDon_SanPhamTrongDonId",
                        column: x => x.SanPhamTrongDonId,
                        principalTable: "SanPhamTrongDon",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PhieuNhapVatTu_SanPhamTrongPhieu_SanPhamTrongPhieuId",
                        column: x => x.SanPhamTrongPhieuId,
                        principalTable: "SanPhamTrongPhieu",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ban_DatBanId",
                table: "Ban",
                column: "DatBanId");

            migrationBuilder.CreateIndex(
                name: "IX_DoAn_SanPhamTrongPhieuId",
                table: "DoAn",
                column: "SanPhamTrongPhieuId");

            migrationBuilder.CreateIndex(
                name: "IX_KhachHang_DatBanId",
                table: "KhachHang",
                column: "DatBanId");

            migrationBuilder.CreateIndex(
                name: "IX_KhachHang_PhieuOderId",
                table: "KhachHang",
                column: "PhieuOderId");

            migrationBuilder.CreateIndex(
                name: "IX_Oder_OderId",
                table: "Oder",
                column: "OderId");

            migrationBuilder.CreateIndex(
                name: "IX_PhieuNhapVatTu_SanPhamTrongDonId",
                table: "PhieuNhapVatTu",
                column: "SanPhamTrongDonId");

            migrationBuilder.CreateIndex(
                name: "IX_PhieuNhapVatTu_SanPhamTrongPhieuId",
                table: "PhieuNhapVatTu",
                column: "SanPhamTrongPhieuId");

            migrationBuilder.CreateIndex(
                name: "IX_User_PhieuOderId",
                table: "User",
                column: "PhieuOderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ban");

            migrationBuilder.DropTable(
                name: "ChiTieuTrongNgay");

            migrationBuilder.DropTable(
                name: "DoAn");

            migrationBuilder.DropTable(
                name: "KhachHang");

            migrationBuilder.DropTable(
                name: "Oder");

            migrationBuilder.DropTable(
                name: "PhieuNhapVatTu");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "YKienDongGop");

            migrationBuilder.DropTable(
                name: "DatBan");

            migrationBuilder.DropTable(
                name: "SanPhamTrongDon");

            migrationBuilder.DropTable(
                name: "SanPhamTrongPhieu");

            migrationBuilder.DropTable(
                name: "PhieuOder");
        }
    }
}
