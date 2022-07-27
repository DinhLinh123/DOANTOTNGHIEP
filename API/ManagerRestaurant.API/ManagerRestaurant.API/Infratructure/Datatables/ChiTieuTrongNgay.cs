using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infratructure.Datatables
{
    public class ChiTieuTrongNgay
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int SoLuong { get; set; }
        public string LinkSp { get; set; }
        public float TongSoTien { get; set; }
        public string TrangThaiHienTai { get; set; }
        public string GhiChu { get; set; }
        public DateTime ThoiGianKeToanDuyet { get; set; }
        public DateTime ThoiGianQuanLyDuyet { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
    }
}
