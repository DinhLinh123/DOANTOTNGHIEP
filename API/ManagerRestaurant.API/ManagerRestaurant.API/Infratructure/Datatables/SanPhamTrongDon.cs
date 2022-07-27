using Infratructure.Datatables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infratructure
{
    public class SanPhamTrongDon
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
        public virtual ICollection<PhieuNhapVatTu> PhieuNhapVatTus { get; set; }
    }
}
