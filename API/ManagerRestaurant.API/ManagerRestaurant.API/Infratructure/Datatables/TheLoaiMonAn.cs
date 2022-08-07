using System;

namespace ManagerRestaurant.API.Infratructure.Datatables
{
    public class TheLoaiMonAn
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool isMany { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
    }
}
