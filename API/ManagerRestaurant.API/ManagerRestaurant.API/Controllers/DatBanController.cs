using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Infratructure;
using Infratructure.Datatables;
using ManagerRestaurant.API.Models;
using Newtonsoft.Json;

namespace ManagerRestaurant.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DatBanController : ControllerBase
    {
        private readonly DataContext _context;

        public DatBanController(DataContext context)
        {
            _context = context;
        }

        // GET: api/DatBan
        [HttpGet]
        public async Task<Responsive> GetDatBan()
        {
            Responsive res = new Responsive();
            try
            {
                List<DatBanModel> data = new List<DatBanModel>();
                var d = await _context.DatBan.ToListAsync();
                foreach (var item in d)
                {
                    data.Add(new DatBanModel
                    {
                        Id = item.Id,
                        IdBan = item.IdBan.Value,
                        KhachHang = await (from s in _context.KhachHang
                                          where s.Id == item.MaKhachHang
                                          select new KhachHangModel
                                          {
                                              Id = s.Id,
                                              Name = s.Name,
                                              SoDienThoai = s.SoDienThoai
                                          }).FirstOrDefaultAsync(),
                        GioDen = item.GioDen.Value,
                        ThoiGian = item.ThoiGian,
                        SoNguoiLon = item.SoNguoiLon,
                        SoTreEm = item.SoTreEm,
                        GhiChu = item.GhiChu,
                        TrangThai = item.TrangThai,
                        CreatedByUserId = item.CreatedByUserId,
                        CreatedByUserName = item.CreatedByUserName,
                        CreatedOnDate = item.CreatedOnDate,
                        LastModifiedByUserId = item.LastModifiedByUserId,
                        LastModifiedByUserName = item.LastModifiedByUserName,

                    });
                }
                res.Mess = "Get sussces";
                res.Data = data;
                res.Code = 200;
                return res;
            }
            catch (Exception ex)
            {
                res.Mess = ex.InnerException.Message;
                res.Data = null;
                res.Code = 500;
                return res;
            }

        }

        // GET: api/DatBan/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DatBan>> GetDatBan(Guid id)
        {
            var datBan = await _context.DatBan.FindAsync(id);

            if (datBan == null)
            {
                return NotFound();
            }

            return datBan;
        }

        // PUT: api/DatBan/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDatBan(Guid id, DatBan datBan)
        {
            if (id != datBan.Id)
            {
                return BadRequest();
            }

            _context.Entry(datBan).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DatBanExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DatBan
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<Responsive> PostDatBan(DatBanCreateModel item)
        {
            try
            {
                var idKH = Guid.Empty;
                var data = (from s in _context.KhachHang where s.SoDienThoai == item.SoDienThoai select s).FirstOrDefault();
                if (data == null)
                {
                    //Update khách hàng
                    var khachhang = new KhachHang();
                    khachhang.Id = Guid.NewGuid();
                    khachhang.Name = item.TenKhachHang;
                    khachhang.SoDienThoai = item.SoDienThoai;
                    khachhang.CreatedByUserId = Guid.Empty;
                    khachhang.CreatedByUserName = "";
                    khachhang.CreatedOnDate = DateTime.Now;
                    idKH = khachhang.Id;
                    //create new khach hang
                    _context.KhachHang.Add(khachhang);
                }
                //Tạo mới trường dữ liệu

                DatBan datBan = new DatBan();
                datBan.Id = Guid.NewGuid();
                datBan.IdBan = Guid.Empty;
                datBan.MaKhachHang = idKH != Guid.Empty ? idKH : item.MaKhachHang;
                datBan.TenKhachHang = item.TenKhachHang;

                datBan.GioDen = item.GioDen;
                datBan.ThoiGian = item.ThoiGian;
                datBan.SoNguoiLon = item.SoNguoiLon;
                datBan.SoTreEm = item.SoTreEm;
                datBan.GhiChu = item.GhiChu;
                datBan.TrangThai = "Chờ Xếp";
                datBan.CreatedByUserId = idKH;
                datBan.CreatedByUserName = item.TenKhachHang;
                datBan.CreatedOnDate = DateTime.Now;
                datBan.LastModifiedByUserId = Guid.Empty;
                datBan.LastModifiedByUserName = "";
                _context.DatBan.Add(datBan);

                var status = await _context.SaveChangesAsync();
                return new Responsive(200, "Create success", datBan);

            }
            catch (Exception ex)
            {
                return new Responsive(500, ex.InnerException.Message, null);
            }
        }

        // DELETE: api/DatBan/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDatBan(Guid id)
        {
            var datBan = await _context.DatBan.FindAsync(id);
            if (datBan == null)
            {
                return NotFound();
            }

            _context.DatBan.Remove(datBan);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DatBanExists(Guid id)
        {
            return _context.DatBan.Any(e => e.Id == id);
        }

        // POST: api/DoAn
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpGet("filter")]
        public async Task<Responsive> GetFilterDoAn([FromQuery] string _filter)
        {
            try
            {

                DatBanFilter filter = JsonConvert.DeserializeObject<DatBanFilter>(_filter);
                var query = from s in _context.DatBan select s;
                if (filter.Id != Guid.Empty)
                {
                    query = query.Where((x) => x.Id == filter.Id);
                }
                if (filter.TextSearch.Length > 0)
                {
                    query = query.Where((x) => x.TenKhachHang.Contains(filter.TextSearch));
                }
                //if (filter.MaTheLoai != Guid.Empty)
                //{
                //    query = query.Where((x) => x.MaTheLoai == filter.MaTheLoai);
                //}
                if (filter.PageNumber > 0)
                {
                    query = query.Take(filter.PageNumber);
                }
                if (filter.PageSize > 0)
                {
                    query = query.Skip(filter.PageSize);
                }

                var data = await query.ToListAsync();

                var mes = "";
                if (data.Count == 0)
                {
                    mes = "Not data";
                }
                else
                {
                    mes = "get success";
                }

                var res = new Responsive(200, mes, data);
                return res;
            }
            catch (Exception err)
            {
                var res = new Responsive(500, err.Message, err.ToString());
                return res;
            }
        }
    }

    class DatBanFilter : BaseFilter
    {

    }
}
