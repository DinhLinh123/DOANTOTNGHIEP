﻿using Infratructure;
using Infratructure.Datatables;
using ManagerRestaurant.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagerRestaurant.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BanController : ControllerBase
    {
        private readonly DataContext _context;

        public BanController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Ban
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ban>>> GetBan()
        {
            return await _context.Ban.ToListAsync();
        }

        // GET: api/Ban/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ban>> GetBan(Guid id)
        {
            var ban = await _context.Ban.FindAsync(id);

            if (ban == null)
            {
                return NotFound();
            }

            return ban;
        }

        // PUT: api/Ban/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<Responsive> PutBan(Guid id, BanUpdateModule item)
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
                var ban = _context.Ban.Find(id);
                if (ban != null)
                {
                    ban.Name = item.Name;
                    ban.SoNguoiToiDa = item.SoNguoiToiDa;
                    ban.LoaiBan = item.LoaiBan;
                    ban.Top = item.Top;
                    ban.Left = item.Left;
                    ban.KieuDang = item.KieuDang;
                    ban.IdKhuVuc = item.IdKhuVuc;
                    ban.TenKhuVuc = item.TenKhuVuc;
                    ban.LastModifiedByUserId = item.LastModifiedByUserId;
                    ban.LastModifiedByUserName = item.LastModifiedByUserName;

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

        // POST: api/Ban
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<Responsive> PostBan(BanCreateModel item)
        {
            try
            {
                var ban = new Ban();
                ban.Id = Guid.NewGuid();
                ban.Name = item.Name;
                ban.SoNguoiToiDa = item.SoNguoiToiDa;
                ban.LoaiBan = item.LoaiBan;
                ban.Top = item.Top;
                ban.Left = item.Left;
                ban.KieuDang = item.KieuDang;
                ban.IdKhuVuc = item.IdKhuVuc;
                ban.TenKhuVuc = item.TenKhuVuc;
                ban.CreatedByUserId = item.CreatedByUserId;
                ban.CreatedByUserName = item.CreatedByUserName;
                ban.CreatedOnDate = item.CreatedOnDate;
                _context.Ban.Add(ban);
                await _context.SaveChangesAsync();

                return new Responsive(200, "Thêm mới thành công", ban);
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

                var filter = JsonConvert.DeserializeObject<BanFilter>(_filter);
                var query = from s in _context.DoAn select s;
                if (filter.Id != Guid.Empty)
                {
                    query = query.Where((x) => x.Id == filter.Id);
                }
                if (filter.TextSearch.Length > 0)
                {
                    query = query.Where((x) => x.Name.Contains(filter.TextSearch));
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


        // DELETE: api/Ban/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBan(Guid id)
        {
            var ban = await _context.Ban.FindAsync(id);
            if (ban == null)
            {
                return NotFound();
            }

            _context.Ban.Remove(ban);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BanExists(Guid id)
        {
            return _context.Ban.Any(e => e.Id == id);
        }
    }
    class BanFilter : BaseFilter
    {
        public Guid MaTheLoai { get; set; }
    }
}
