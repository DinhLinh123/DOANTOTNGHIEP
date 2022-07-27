using System;
using System.Collections.Generic;

namespace ManagerRestaurant.API.Models
{
    public class SanPhamTrongDonModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public float DonGia { get; set; }
        public Guid IdPhieu { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
        public virtual ICollection<PhieuNhapVatTuModel> PhieuNhapVatTus { get; set; }
    }
    public class SanPhamTrongDonCreateModel
    {    public Guid Id { get; set; }
        public string Name { get; set; }
        public float DonGia { get; set; }
        public Guid IdPhieu { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
        public virtual ICollection<PhieuNhapVatTuModel> PhieuNhapVatTus { get; set; }
    }
    public class SanPhamTrongDonUpdateModel
    {    public Guid Id { get; set; }
        public string Name { get; set; }
        public float DonGia { get; set; }
        public Guid IdPhieu { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
        public virtual ICollection<PhieuNhapVatTuModel> PhieuNhapVatTus { get; set; }
    }
}
