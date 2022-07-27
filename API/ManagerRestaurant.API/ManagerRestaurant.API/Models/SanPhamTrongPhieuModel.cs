using System;
using System.Collections.Generic;

namespace ManagerRestaurant.API.Models
{
    public class SanPhamTrongPhieuModel
    {
        public Guid Id { get; set; }
        public Guid IdPhieu { get; set; }
        public string Name { get; set; }
        public int SoLuong { get; set; }
        public Guid IdDoAn { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
        public virtual ICollection<DoAnModel> DoAns { get; set; }
        public virtual ICollection<PhieuNhapVatTuModel> PhieuNhapVatTus { get; set; }
    }
    public class SanPhamTrongPhieuCreateModel
    { public Guid Id { get; set; }
        public Guid IdPhieu { get; set; }
        public string Name { get; set; }
        public int SoLuong { get; set; }
        public Guid IdDoAn { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
        public virtual ICollection<DoAnModel> DoAns { get; set; }
        public virtual ICollection<PhieuNhapVatTuModel> PhieuNhapVatTus { get; set; }
    }
    public class SanPhamTrongPhieuUpdateModel
    { public Guid Id { get; set; }
        public Guid IdPhieu { get; set; }
        public string Name { get; set; }
        public int SoLuong { get; set; }
        public Guid IdDoAn { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
        public virtual ICollection<DoAnModel> DoAns { get; set; }
        public virtual ICollection<PhieuNhapVatTuModel> PhieuNhapVatTus { get; set; }
    }
}
