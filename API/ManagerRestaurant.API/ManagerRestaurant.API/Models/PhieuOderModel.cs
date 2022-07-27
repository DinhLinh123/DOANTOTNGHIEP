using System;
using System.Collections.Generic;

namespace ManagerRestaurant.API.Models
{
    public class PhieuOderModel
    {
        public Guid Id { get; set; }
        public Guid IdBan { get; set; }
        public string SoHopDong { get; set; }
        public Guid IdThuNgan { get; set; }
        public Guid IdKhachHang { get; set; }
        public float TongTien { get; set; }
        public float ThucThu { get; set; }
        public string Vocher { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
        public virtual ICollection<KhachHangModel> KhachHangs { get; set; }
        public virtual ICollection<UserModel> Users { get; set; }
    }

    public class PhieuOderCreateModel
    {
        public Guid Id { get; set; }
        public Guid IdBan { get; set; }
        public string SoHopDong { get; set; }
        public Guid IdThuNgan { get; set; }
        public Guid IdKhachHang { get; set; }
        public float TongTien { get; set; }
        public float ThucThu { get; set; }
        public string Vocher { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
        public virtual ICollection<KhachHangModel> KhachHangs { get; set; }
        public virtual ICollection<UserModel> Users { get; set; }
    }

    public class PhieuOderUpdateModel
    {
        public Guid Id { get; set; }
        public Guid IdBan { get; set; }
        public string SoHopDong { get; set; }
        public Guid IdThuNgan { get; set; }
        public Guid IdKhachHang { get; set; }
        public float TongTien { get; set; }
        public float ThucThu { get; set; }
        public string Vocher { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
        public virtual ICollection<KhachHangModel> KhachHangs { get; set; }
        public virtual ICollection<UserModel> Users { get; set; }
    }
}
