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
        [HttpGet]
        public async Task<Responsive> GetChiTieuTrongNgay()
        {
            Responsive res = new Responsive();
            return res;
        }
    }
}
