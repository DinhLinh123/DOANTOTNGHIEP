using Infratructure;
using ManagerRestaurant.API.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ManagerRestaurant.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaoCaoThongKeController : ControllerBase
    {
        private readonly DataContext _context;

        public BaoCaoThongKeController(DataContext context)
        {
            _context = context;
        }

        // GET: api/ChiTieuTrongNgay
        [HttpGet("thuchi/{filter}")]
        public async Task<Responsive> GetThongKeThuChi(string filter)
        {
            Responsive res = new Responsive();
            return res;
        }
        // GET: api/ChiTieuTrongNgay
        [HttpGet("monan/{filter}")]
        public async Task<Responsive> GetThongKeMonAn(string filter)
        {
            Responsive res = new Responsive();
            return res;
        }
        // GET: api/ChiTieuTrongNgay
        [HttpGet("nhapxuat/{filter}")]
        public async Task<Responsive> GetThongKeNhapXuat(string filter)
        {
            Responsive res = new Responsive();
            return res;
        }
        // GET: api/ChiTieuTrongNgay
        [HttpGet("hangden/{filter}")]
        public async Task<Responsive> GetHangDaDen(string filter)
        {
            Responsive res = new Responsive();
            return res;
        }

        public class FilterThongKe
        {
            public DateTime TimeStart { get; set; }
            public DateTime TimeEnd { get; set; }
            public bool? isMonth { get; set; }
            public int? PageSize { get; set; } = 10;
        }
    }
}
