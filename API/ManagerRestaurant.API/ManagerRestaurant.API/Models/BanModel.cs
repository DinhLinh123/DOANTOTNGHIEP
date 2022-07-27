using System;

namespace ManagerRestaurant.API.Models
{
    public class BanModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int SoNguoiToiDa { get; set; }
        public string LoaiBan { get; set; }
        public string KieuDang { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
    }
    public class BanCreateModel
    { 
        public string Name { get; set; }
        public int SoNguoiToiDa { get; set; }
        public string LoaiBan { get; set; }
        public string KieuDang { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; } 
    }
    public class BanUpdateModule
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int SoNguoiToiDa { get; set; }
        public string LoaiBan { get; set; }
        public string KieuDang { get; set; }  
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
    }
    public class QueryFilter
    {
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
        public string TextSearch { get; set; }
    }

}
