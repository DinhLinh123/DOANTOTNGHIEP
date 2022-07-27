using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Infratructure;

namespace ManagerRestaurant.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SanPhamTrongDonController : ControllerBase
    {
        private readonly DataContext _context;

        public SanPhamTrongDonController(DataContext context)
        {
            _context = context;
        }

        // GET: api/SanPhamTrongDon
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SanPhamTrongDon>>> GetSanPhamTrongDon()
        {
            return await _context.SanPhamTrongDon.ToListAsync();
        }

        // GET: api/SanPhamTrongDon/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SanPhamTrongDon>> GetSanPhamTrongDon(Guid id)
        {
            var sanPhamTrongDon = await _context.SanPhamTrongDon.FindAsync(id);

            if (sanPhamTrongDon == null)
            {
                return NotFound();
            }

            return sanPhamTrongDon;
        }

        // PUT: api/SanPhamTrongDon/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSanPhamTrongDon(Guid id, SanPhamTrongDon sanPhamTrongDon)
        {
            if (id != sanPhamTrongDon.Id)
            {
                return BadRequest();
            }

            _context.Entry(sanPhamTrongDon).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SanPhamTrongDonExists(id))
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

        // POST: api/SanPhamTrongDon
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SanPhamTrongDon>> PostSanPhamTrongDon(SanPhamTrongDon sanPhamTrongDon)
        {
            _context.SanPhamTrongDon.Add(sanPhamTrongDon);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSanPhamTrongDon", new { id = sanPhamTrongDon.Id }, sanPhamTrongDon);
        }

        // DELETE: api/SanPhamTrongDon/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSanPhamTrongDon(Guid id)
        {
            var sanPhamTrongDon = await _context.SanPhamTrongDon.FindAsync(id);
            if (sanPhamTrongDon == null)
            {
                return NotFound();
            }

            _context.SanPhamTrongDon.Remove(sanPhamTrongDon);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SanPhamTrongDonExists(Guid id)
        {
            return _context.SanPhamTrongDon.Any(e => e.Id == id);
        }
    }
}
