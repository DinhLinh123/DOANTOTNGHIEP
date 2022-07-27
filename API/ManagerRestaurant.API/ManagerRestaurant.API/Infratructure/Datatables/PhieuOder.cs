using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infratructure.Datatables
{
    public class PhieuOder
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
        public virtual ICollection<KhachHang> KhachHangs { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
