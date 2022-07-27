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
    public class DatBanController : ControllerBase
    {
        private readonly DataContext _context;

        public DatBanController(DataContext context)
        {
            _context = context;
        }

        // GET: api/DatBan
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DatBan>>> GetDatBan()
        {
            return await _context.DatBan.ToListAsync();
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
        public async Task<ActionResult<DatBan>> PostDatBan(DatBan datBan)
        {
            _context.DatBan.Add(datBan);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDatBan", new { id = datBan.Id }, datBan);
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
    }
}
