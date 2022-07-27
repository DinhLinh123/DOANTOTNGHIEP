using System;

namespace ManagerRestaurant.API.Models
{
    public class PhieuNhapVatTuModel
    {
        public Guid Id { get; set; }
        public string Kieu { get; set; }
        public float TongTien { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
    }
    public class PhieuNhapVatTuCreateModel
    {public Guid Id { get; set; }
        public string Kieu { get; set; }
        public float TongTien { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
    }
    public class PhieuNhapVatTuUpdateModel
    {public Guid Id { get; set; }
        public string Kieu { get; set; }
        public float TongTien { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
    }
}
