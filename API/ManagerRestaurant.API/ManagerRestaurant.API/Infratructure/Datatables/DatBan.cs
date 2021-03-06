using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infratructure.Datatables
{
    public class DatBan
    {
        public Guid Id { get; set; }
        public Guid? IdBan { get; set; }
        public Guid? MaKhachHang { get; set; }
        public string TenKhachHang { get; set; }
        public DateTime? GioDen { get; set; }
        public DateTime ThoiGian { get; set; }
        public int SoNguoiLon { get; set; } = 0;
        public int SoTreEm { get; set; } = 0;
        public string GhiChu { get; set; }
        public string TrangThai { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string? CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
        public virtual ICollection<Ban> Ban { get; set; }
        public virtual ICollection<KhachHang> KhachHang { get; set; }
    }
   }
