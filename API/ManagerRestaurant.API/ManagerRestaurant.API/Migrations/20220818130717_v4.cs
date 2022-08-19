using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ManagerRestaurant.API.Migrations
{
    public partial class v4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "TheLoai",
                table: "UuDai",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "IdNhomQuyen",
                table: "Quyen",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<int>(
                name: "Level",
                table: "Quyen",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "PhieuNhapVatTu",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayHoaDon",
                table: "ChiTieuTrongNgay",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdNhomQuyen",
                table: "Quyen");

            migrationBuilder.DropColumn(
                name: "Level",
                table: "Quyen");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "PhieuNhapVatTu");

            migrationBuilder.DropColumn(
                name: "NgayHoaDon",
                table: "ChiTieuTrongNgay");

            migrationBuilder.AlterColumn<string>(
                name: "TheLoai",
                table: "UuDai",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
