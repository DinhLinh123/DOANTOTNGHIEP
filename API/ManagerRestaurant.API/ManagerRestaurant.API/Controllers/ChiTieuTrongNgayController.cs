using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Infratructure;
using Infratructure.Datatables;

namespace ManagerRestaurant.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChiTieuTrongNgayController : ControllerBase
    {
        private readonly DataContext _context;

        public ChiTieuTrongNgayController(DataContext context)
        {
            _context = context;
        }

        // GET: api/ChiTieuTrongNgay
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChiTieuTrongNgay>>> GetChiTieuTrongNgay()
        {
            return await _context.ChiTieuTrongNgay.ToListAsync();
        }

        // GET: api/ChiTieuTrongNgay/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChiTieuTrongNgay>> GetChiTieuTrongNgay(Guid id)
        {
            var chiTieuTrongNgay = await _context.ChiTieuTrongNgay.FindAsync(id);

            if (chiTieuTrongNgay == null)
            {
                return NotFound();
            }

            return chiTieuTrongNgay;
        }

        // PUT: api/ChiTieuTrongNgay/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChiTieuTrongNgay(Guid id, ChiTieuTrongNgay chiTieuTrongNgay)
        {
            if (id != chiTieuTrongNgay.Id)
            {
                return BadRequest();
            }

            _context.Entry(chiTieuTrongNgay).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChiTieuTrongNgayExists(id))
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

        // POST: api/ChiTieuTrongNgay
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ChiTieuTrongNgay>> PostChiTieuTrongNgay(ChiTieuTrongNgay chiTieuTrongNgay)
        {
            _context.ChiTieuTrongNgay.Add(chiTieuTrongNgay);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChiTieuTrongNgay", new { id = chiTieuTrongNgay.Id }, chiTieuTrongNgay);
        }

        // DELETE: api/ChiTieuTrongNgay/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChiTieuTrongNgay(Guid id)
        {
            var chiTieuTrongNgay = await _context.ChiTieuTrongNgay.FindAsync(id);
            if (chiTieuTrongNgay == null)
            {
                return NotFound();
            }

            _context.ChiTieuTrongNgay.Remove(chiTieuTrongNgay);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ChiTieuTrongNgayExists(Guid id)
        {
            return _context.ChiTieuTrongNgay.Any(e => e.Id == id);
        }
    }
}
