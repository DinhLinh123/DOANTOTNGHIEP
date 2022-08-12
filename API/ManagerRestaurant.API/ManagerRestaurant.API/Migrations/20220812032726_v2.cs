using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ManagerRestaurant.API.Migrations
{
    public partial class v2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ban_DatBan_DatBanId",
                table: "Ban");

            migrationBuilder.DropForeignKey(
                name: "FK_KhachHang_DatBan_DatBanId",
                table: "KhachHang");

            migrationBuilder.DropIndex(
                name: "IX_Ban_DatBanId",
                table: "Ban");

            migrationBuilder.DropColumn(
                name: "SoHopDong",
                table: "PhieuOder");

            migrationBuilder.DropColumn(
                name: "DatBanId",
                table: "Ban");

            migrationBuilder.RenameColumn(
                name: "IdMonAn",
                table: "Oder",
                newName: "IdDoAn");

            migrationBuilder.RenameColumn(
                name: "DatBanId",
                table: "KhachHang",
                newName: "PhieuOderId");

            migrationBuilder.RenameIndex(
                name: "IX_KhachHang_DatBanId",
                table: "KhachHang",
                newName: "IX_KhachHang_PhieuOderId");

            migrationBuilder.AddColumn<Guid>(
                name: "PhieuOderId",
                table: "User",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "BanId",
                table: "PhieuOder",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "IdKeToanDuyet",
                table: "ChiTieuTrongNgay",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "IdQuanLyDuyet",
                table: "ChiTieuTrongNgay",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_User_PhieuOderId",
                table: "User",
                column: "PhieuOderId");

            migrationBuilder.CreateIndex(
                name: "IX_PhieuOder_BanId",
                table: "PhieuOder",
                column: "BanId");

            migrationBuilder.CreateIndex(
                name: "IX_Oder_IdDoAn",
                table: "Oder",
                column: "IdDoAn");

            migrationBuilder.CreateIndex(
                name: "IX_Oder_IdPhieuOder",
                table: "Oder",
                column: "IdPhieuOder");

            migrationBuilder.CreateIndex(
                name: "IX_Ban_IdKhuVuc",
                table: "Ban",
                column: "IdKhuVuc");

            migrationBuilder.AddForeignKey(
                name: "FK_Ban_KhuVuc_IdKhuVuc",
                table: "Ban",
                column: "IdKhuVuc",
                principalTable: "KhuVuc",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_KhachHang_PhieuOder_PhieuOderId",
                table: "KhachHang",
                column: "PhieuOderId",
                principalTable: "PhieuOder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Oder_DoAn_IdDoAn",
                table: "Oder",
                column: "IdDoAn",
                principalTable: "DoAn",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Oder_PhieuOder_IdPhieuOder",
                table: "Oder",
                column: "IdPhieuOder",
                principalTable: "PhieuOder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PhieuOder_Ban_BanId",
                table: "PhieuOder",
                column: "BanId",
                principalTable: "Ban",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_User_PhieuOder_PhieuOderId",
                table: "User",
                column: "PhieuOderId",
                principalTable: "PhieuOder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ban_KhuVuc_IdKhuVuc",
                table: "Ban");

            migrationBuilder.DropForeignKey(
                name: "FK_KhachHang_PhieuOder_PhieuOderId",
                table: "KhachHang");

            migrationBuilder.DropForeignKey(
                name: "FK_Oder_DoAn_IdDoAn",
                table: "Oder");

            migrationBuilder.DropForeignKey(
                name: "FK_Oder_PhieuOder_IdPhieuOder",
                table: "Oder");

            migrationBuilder.DropForeignKey(
                name: "FK_PhieuOder_Ban_BanId",
                table: "PhieuOder");

            migrationBuilder.DropForeignKey(
                name: "FK_User_PhieuOder_PhieuOderId",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_User_PhieuOderId",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_PhieuOder_BanId",
                table: "PhieuOder");

            migrationBuilder.DropIndex(
                name: "IX_Oder_IdDoAn",
                table: "Oder");

            migrationBuilder.DropIndex(
                name: "IX_Oder_IdPhieuOder",
                table: "Oder");

            migrationBuilder.DropIndex(
                name: "IX_Ban_IdKhuVuc",
                table: "Ban");

            migrationBuilder.DropColumn(
                name: "PhieuOderId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "BanId",
                table: "PhieuOder");

            migrationBuilder.DropColumn(
                name: "IdKeToanDuyet",
                table: "ChiTieuTrongNgay");

            migrationBuilder.DropColumn(
                name: "IdQuanLyDuyet",
                table: "ChiTieuTrongNgay");

            migrationBuilder.RenameColumn(
                name: "IdDoAn",
                table: "Oder",
                newName: "IdMonAn");

            migrationBuilder.RenameColumn(
                name: "PhieuOderId",
                table: "KhachHang",
                newName: "DatBanId");

            migrationBuilder.RenameIndex(
                name: "IX_KhachHang_PhieuOderId",
                table: "KhachHang",
                newName: "IX_KhachHang_DatBanId");

            migrationBuilder.AddColumn<string>(
                name: "SoHopDong",
                table: "PhieuOder",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DatBanId",
                table: "Ban",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Ban_DatBanId",
                table: "Ban",
                column: "DatBanId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ban_DatBan_DatBanId",
                table: "Ban",
                column: "DatBanId",
                principalTable: "DatBan",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_KhachHang_DatBan_DatBanId",
                table: "KhachHang",
                column: "DatBanId",
                principalTable: "DatBan",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
