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
    public class PhieuNhapVatTuController : ControllerBase
    {
        private readonly DataContext _context;

        public PhieuNhapVatTuController(DataContext context)
        {
            _context = context;
        }

        // GET: api/PhieuNhapVatTus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhieuNhapVatTu>>> GetPhieuNhapVatTu()
        {
            return await _context.PhieuNhapVatTu.ToListAsync();
        }

        // GET: api/PhieuNhapVatTus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PhieuNhapVatTu>> GetPhieuNhapVatTu(Guid id)
        {
            var phieuNhapVatTu = await _context.PhieuNhapVatTu.FindAsync(id);

            if (phieuNhapVatTu == null)
            {
                return NotFound();
            }

            return phieuNhapVatTu;
        }

        // PUT: api/PhieuNhapVatTus/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPhieuNhapVatTu(Guid id, PhieuNhapVatTu phieuNhapVatTu)
        {
            if (id != phieuNhapVatTu.Id)
            {
                return BadRequest();
            }

            _context.Entry(phieuNhapVatTu).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhieuNhapVatTuExists(id))
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

        // POST: api/PhieuNhapVatTus
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PhieuNhapVatTu>> PostPhieuNhapVatTu(PhieuNhapVatTu phieuNhapVatTu)
        {
            _context.PhieuNhapVatTu.Add(phieuNhapVatTu);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPhieuNhapVatTu", new { id = phieuNhapVatTu.Id }, phieuNhapVatTu);
        }

        // DELETE: api/PhieuNhapVatTus/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhieuNhapVatTu(Guid id)
        {
            var phieuNhapVatTu = await _context.PhieuNhapVatTu.FindAsync(id);
            if (phieuNhapVatTu == null)
            {
                return NotFound();
            }

            _context.PhieuNhapVatTu.Remove(phieuNhapVatTu);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PhieuNhapVatTuExists(Guid id)
        {
            return _context.PhieuNhapVatTu.Any(e => e.Id == id);
        }
        [HttpGet("filter")]
        public async Task<Responsive> GetFilterPhieuNhapVT([FromQuery] string _filter)
        {
            try
            {

                var filter = JsonConvert.DeserializeObject<PhieuNhapVatTuFilter>(_filter);
                var query = from s in _context.PhieuNhapVatTu select s;
                if (filter.Id != Guid.Empty)
                {
                    query = query.Where((x) => x.Id == filter.Id);
                }
                if (filter.TextSearch.Length > 0)
                {
                    query = query.Where((x) => x.Name.Contains(filter.TextSearch));
                }

                if (filter.PageNumber > 0 && filter.PageSize > 0)
                {
                    query = query.Skip(filter.PageSize * (filter.PageNumber - 1)).Take(filter.PageSize);
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

        class PhieuNhapVatTuFilter : BaseFilter
        {
        }
    }
}
