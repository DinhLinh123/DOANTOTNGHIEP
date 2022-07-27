using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infratructure.Datatables
{
    public class DoAn
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid MaTheLoai { get; set; }
        public string LinkAnh { get; set; }
        public string Loai { get; set; }
        public string GhiChu { get; set; }
        public string DonViTinh { get; set; }
        public float SoLuongHienCo { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
    }
}
