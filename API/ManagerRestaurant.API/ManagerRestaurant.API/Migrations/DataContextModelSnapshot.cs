﻿// <auto-generated />
using System;
using Infratructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace ManagerRestaurant.API.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.17")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Infratructure.Datatables.Ban", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CreatedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CreatedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CreatedOnDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("DatBanId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IdKhuVuc")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("KhuVucId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("KieuDang")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("LastModifiedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("LastModifiedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Left")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LoaiBan")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("SoNguoiToiDa")
                        .HasColumnType("int");

                    b.Property<string>("TenKhuVuc")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Top")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DatBanId");

                    b.HasIndex("KhuVucId");

                    b.ToTable("Ban");
                });

            modelBuilder.Entity("Infratructure.Datatables.ChiTieuTrongNgay", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Anh")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("CreatedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CreatedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CreatedOnDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("GhiChu")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("LastModifiedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("LastModifiedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MatHang")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NameKeToanDuyet")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NameQuanLyDuyet")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ThoiGianKeToanDuyet")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ThoiGianQuanLyDuyet")
                        .HasColumnType("datetime2");

                    b.Property<float>("TongSoTien")
                        .HasColumnType("real");

                    b.Property<string>("TrangThaiHienTai")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("ChiTieuTrongNgay");
                });

            modelBuilder.Entity("Infratructure.Datatables.DatBan", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CreatedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CreatedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CreatedOnDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("GhiChu")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("GioDen")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("IdBan")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("LastModifiedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("LastModifiedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("MaKhachHang")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("SoNguoiLon")
                        .HasColumnType("int");

                    b.Property<int>("SoTreEm")
                        .HasColumnType("int");

                    b.Property<string>("TenKhachHang")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ThoiGian")
                        .HasColumnType("datetime2");

                    b.Property<string>("TrangThai")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("DatBan");
                });

            modelBuilder.Entity("Infratructure.Datatables.DoAn", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CreatedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CreatedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CreatedOnDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("DanhSachMonAn")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DonViTinh")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("GhiChu")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("LastModifiedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("LastModifiedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LinkAnh")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Loai")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("MaTheLoai")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TrangThai")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("DoAn");
                });

            modelBuilder.Entity("Infratructure.Datatables.KhachHang", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CreatedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CreatedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CreatedOnDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("DatBanId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("LastModifiedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("LastModifiedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("PhieuOderId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("SoDienThoai")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DatBanId");

                    b.HasIndex("PhieuOderId");

                    b.ToTable("KhachHang");
                });

            modelBuilder.Entity("Infratructure.Datatables.KhuVuc", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CreatedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CreatedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CreatedOnDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("HtmlObject")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("LastModifiedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("LastModifiedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("KhuVuc");
                });

            modelBuilder.Entity("Infratructure.Datatables.Oder", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CreatedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CreatedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CreatedOnDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("IdMonAn")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("LastModifiedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("LastModifiedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("OderId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("SoBan")
                        .HasColumnType("int");

                    b.Property<int>("SoLuong")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("OderId");

                    b.ToTable("Oder");
                });

            modelBuilder.Entity("Infratructure.Datatables.PhieuNhapVatTu", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CreatedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CreatedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CreatedOnDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Kieu")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("LastModifiedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("LastModifiedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("TongTien")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.ToTable("PhieuNhapVatTu");
                });

            modelBuilder.Entity("Infratructure.Datatables.PhieuOder", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CreatedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CreatedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CreatedOnDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("IdBan")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IdKhachHang")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IdThuNgan")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("LastModifiedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("LastModifiedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SoHopDong")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("ThucThu")
                        .HasColumnType("real");

                    b.Property<float>("TongTien")
                        .HasColumnType("real");

                    b.Property<string>("Vocher")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("PhieuOder");
                });

            modelBuilder.Entity("Infratructure.Datatables.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ChiChu")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ChucVu")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("CreatedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CreatedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CreatedOnDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("DiaChi")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDelete")
                        .HasColumnType("bit");

                    b.Property<Guid?>("LastModifiedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("LastModifiedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MaNV")
                        .HasColumnType("int");

                    b.Property<DateTime>("NgaySinh")
                        .HasColumnType("datetime2");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phai")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("PhieuOderId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Quyen")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SoDienThoai")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("PhieuOderId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("Infratructure.Datatables.YKienDongGop", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CreatedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CreatedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CreatedOnDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("LastModifiedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("LastModifiedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NoiDung")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SoDienThoai")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TenKH")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("YKienDongGop");
                });

            modelBuilder.Entity("ManagerRestaurant.API.Infratructure.Datatables.Quyen", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("CreatedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CreatedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CreatedOnDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("LastModifiedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("LastModifiedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Quyen");
                });

            modelBuilder.Entity("ManagerRestaurant.API.Infratructure.Datatables.UuDai", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Anh")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("CreatedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CreatedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CreatedOnDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("LastModifiedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("LastModifiedByUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NoiDung")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("UuDai");
                });

            modelBuilder.Entity("Infratructure.Datatables.Ban", b =>
                {
                    b.HasOne("Infratructure.Datatables.DatBan", null)
                        .WithMany("Ban")
                        .HasForeignKey("DatBanId");

                    b.HasOne("Infratructure.Datatables.KhuVuc", null)
                        .WithMany("Bans")
                        .HasForeignKey("KhuVucId");
                });

            modelBuilder.Entity("Infratructure.Datatables.KhachHang", b =>
                {
                    b.HasOne("Infratructure.Datatables.DatBan", null)
                        .WithMany("KhachHang")
                        .HasForeignKey("DatBanId");

                    b.HasOne("Infratructure.Datatables.PhieuOder", null)
                        .WithMany("KhachHangs")
                        .HasForeignKey("PhieuOderId");
                });

            modelBuilder.Entity("Infratructure.Datatables.Oder", b =>
                {
                    b.HasOne("Infratructure.Datatables.Oder", null)
                        .WithMany("Oders")
                        .HasForeignKey("OderId");
                });

            modelBuilder.Entity("Infratructure.Datatables.User", b =>
                {
                    b.HasOne("Infratructure.Datatables.PhieuOder", null)
                        .WithMany("Users")
                        .HasForeignKey("PhieuOderId");
                });

            modelBuilder.Entity("Infratructure.Datatables.DatBan", b =>
                {
                    b.Navigation("Ban");

                    b.Navigation("KhachHang");
                });

            modelBuilder.Entity("Infratructure.Datatables.KhuVuc", b =>
                {
                    b.Navigation("Bans");
                });

            modelBuilder.Entity("Infratructure.Datatables.Oder", b =>
                {
                    b.Navigation("Oders");
                });

            modelBuilder.Entity("Infratructure.Datatables.PhieuOder", b =>
                {
                    b.Navigation("KhachHangs");

                    b.Navigation("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
