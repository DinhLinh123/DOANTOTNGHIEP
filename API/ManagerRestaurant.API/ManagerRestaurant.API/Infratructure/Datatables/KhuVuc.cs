﻿using System;

namespace Infratructure.Datatables
{
    public class KhuVuc
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string HtmlObject { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
        public string LastModifiedByUserName { get; set; }
    }
}
