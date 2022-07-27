using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infratructure.Datatables
{
    public class Ban
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
}
