using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Infratructure;
using Infratructure.Datatables;
using Newtonsoft.Json;
using ManagerRestaurant.API.Models;

namespace ManagerRestaurant.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoAnController : ControllerBase
    {
        private readonly DataContext _context;

        public DoAnController(DataContext context)
        {
            _context = context;
        }

        // GET: api/DoAn
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DoAn>>> GetDoAn()
        {
            return await _context.DoAn.ToListAsync();
        }

        // GET: api/DoAn/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DoAn>> GetDoAn(Guid id)
        {
            var doAn = await _context.DoAn.FindAsync(id);

            if (doAn == null)
            {
                return NotFound();
            }

            return doAn;
        }

        // PUT: api/DoAn/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<Responsive> PutDoAn(Guid id, DoAnUpdateModel item)
        {
            var res = new Responsive();
            if (id != item.Id)
            {
                res.Code = 204;
                res.Mess = "Invalid data";
                return res;
            }
            try
            {
                var doAn = _context.DoAn.Find(id);
                if (doAn != null)
                {
                    doAn.Name = item.Name;
                    doAn.MaTheLoai = item.MaTheLoai;
                    doAn.LinkAnh = item.LinkAnh;
                    doAn.Loai = item.Loai;
                    doAn.GhiChu = item.GhiChu;
                    doAn.DanhSachMonAn = item.DanhSachMonAn;
                    doAn.DonViTinh = item.DonViTinh;
                    doAn.TrangThai = item.TrangThai;
                    doAn.CreatedByUserId = item.CreatedByUserId;
                    doAn.CreatedByUserName = item.CreatedByUserName;
                    doAn.CreatedOnDate = item.CreatedOnDate;

                    await _context.SaveChangesAsync();
                    res.Code = 200;
                    res.Mess = "Update success";
                    return res;
                }
                else
                {
                    res.Code = 204;
                    res.Mess = "Item not exist";
                    return res;
                }
            }
            catch (Exception ex)
            {
                res.Code = 500;
                res.Mess = ex.InnerException.Message;
                return res;
            }
        }

        // POST: api/DoAn
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<Responsive> PostDoAn(DoAnCreateModel item)
        {
            try
            {
                //conver
                var doAn = new DoAn();
                doAn.Id = Guid.NewGuid();  
                doAn.Name = item.Name;
                doAn.MaTheLoai = item.MaTheLoai;
                doAn.LinkAnh = item.LinkAnh;
                doAn.MaTheLoai = item.MaTheLoai;
                doAn.Loai = item.Loai;
                doAn.GhiChu = item.GhiChu;
                doAn.DanhSachMonAn = item.DanhSachMonAn;
                doAn.DonViTinh = item.DonViTinh;
                doAn.DonGia = item.DonGia;
                doAn.TrangThai = item.TrangThai;
                doAn.CreatedByUserId = item.CreatedByUserId;
                doAn.CreatedByUserName = item.CreatedByUserName;
                doAn.CreatedOnDate = item.CreatedOnDate;

                _context.DoAn.Add(doAn);
                await _context.SaveChangesAsync();

                return new Responsive(200, "Thêm mới thành công", doAn);
            }
            catch (Exception ex)
            {
                return new Responsive(500, ex.InnerException.Message, null);
            }
        }

        // POST: api/DoAn
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpGet("filter")]
        public async Task<Responsive> GetFilterDoAn([FromQuery] string _filter)
        {
            try
            {

                var filter = JsonConvert.DeserializeObject<DoAnFilter>(_filter);
                var query = from s in _context.DoAn select s;
                if (filter.Id != Guid.Empty)
                {
                    query = query.Where((x) => x.Id == filter.Id);
                }
                if (filter.TextSearch.Length > 0)
                {
                    query = query.Where((x) => x.Name.Contains(filter.TextSearch));
                }
                if (filter.MaTheLoai != Guid.Empty)
                {
                    query = query.Where((x) => x.MaTheLoai == filter.MaTheLoai);
                }
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
                    mes = "Get success";
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

        // DELETE: api/DoAn/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoAn(Guid id)
        {
            var doAn = await _context.DoAn.FindAsync(id);
            if (doAn == null)
            {
                return NotFound();
            }

            _context.DoAn.Remove(doAn);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }

    class DoAnFilter : BaseFilter
    {
        public Guid MaTheLoai { get; set; }
    }
}
