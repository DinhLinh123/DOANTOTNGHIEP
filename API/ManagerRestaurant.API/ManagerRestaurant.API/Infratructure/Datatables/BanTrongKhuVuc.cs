using System;
using System.Collections.Generic;

namespace Infratructure.Datatables
{
    public class BanTrongKhuVuc
    {
        public Guid Id { get; set; }
        public Guid IdBan { get; set; }
        public Guid IdKhuVuc { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
        public virtual ICollection<Ban> Ban { get; set; }
        public virtual ICollection<KhuVuc> KhuVuc { get; set; }

    }
}
