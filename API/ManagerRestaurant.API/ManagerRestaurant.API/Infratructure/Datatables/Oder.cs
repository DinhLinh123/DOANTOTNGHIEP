using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infratructure.Datatables
{
    public class Oder
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
        public virtual ICollection<Oder> Oders { get; set; }
    }
}
