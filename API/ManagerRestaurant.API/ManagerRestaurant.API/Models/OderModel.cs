using System;
using System.Collections.Generic;

namespace ManagerRestaurant.API.Models
{
    public class OderModule
    {
        public Guid Id { get; set; }
        public Guid IdMonAn { get; set; }
        public int SoLuong { get; set; }
        public int SoBan { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
        public virtual ICollection<OderModule> Oders { get; set; }
    }
    public class OderCreateModule
    { public Guid Id { get; set; }
        public Guid IdMonAn { get; set; }
        public int SoLuong { get; set; }
        public int SoBan { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
        public virtual ICollection<OderModule> Oders { get; set; }
    }
    public class OderUpdateModule
    { public Guid Id { get; set; }
        public Guid IdMonAn { get; set; }
        public int SoLuong { get; set; }
        public int SoBan { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
        public virtual ICollection<OderModule> Oders { get; set; }
    }
}
