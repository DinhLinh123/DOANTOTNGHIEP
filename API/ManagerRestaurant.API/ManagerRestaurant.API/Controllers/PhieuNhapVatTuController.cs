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
    }
}
