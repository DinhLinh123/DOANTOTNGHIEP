using System;
using System.Collections.Generic;

namespace ManagerRestaurant.API.Models
{
    public class DatBanModel
    {
        public Guid Id { get; set; }
        public Guid IdBan { get; set; }
        public Guid MaKhachHang { get; set; }
        public string TenKhachHang { get; set; }
        public DateTime GioDen { get; set; }
        public string ThoiGian { get; set; }
        public int SoNguoiLon { get; set; }
        public int SoTreEm { get; set; }
        public string GhiChu { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
        public virtual ICollection<BanModel> Ban { get; set; }
        public virtual ICollection<KhachHangModel> KhachHang { get; set; } 
    }
    public class DatBanCreateModel
    {
        public Guid Id { get; set; }
        public Guid IdBan { get; set; }
        public Guid MaKhachHang { get; set; }
        public string TenKhachHang { get; set; }
        public DateTime GioDen { get; set; }
        public string ThoiGian { get; set; }
        public int SoNguoiLon { get; set; }
        public int SoTreEm { get; set; }
        public string GhiChu { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
        public virtual ICollection<BanModel> Ban { get; set; }
        public virtual ICollection<KhachHangModel> KhachHang { get; set; }
        
    }
    public class DatBanUpdateModel
    {
        public Guid Id { get; set; }
        public Guid IdBan { get; set; }
        public Guid MaKhachHang { get; set; }
        public string TenKhachHang { get; set; }
        public DateTime GioDen { get; set; }
        public string ThoiGian { get; set; }
        public int SoNguoiLon { get; set; }
        public int SoTreEm { get; set; }
        public string GhiChu { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
        public virtual ICollection<BanModel> Ban { get; set; }
        public virtual ICollection<KhachHangModel> KhachHang { get; set; }
    }
}
