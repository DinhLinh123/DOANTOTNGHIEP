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
    public class PhieuOderController : ControllerBase
    {
        private readonly DataContext _context;

        public PhieuOderController(DataContext context)
        {
            _context = context;
        }

        // GET: api/PhieuOder
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhieuOder>>> GetPhieuOder()
        {
            return await _context.PhieuOder.ToListAsync();
        }

        // GET: api/PhieuOder/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PhieuOder>> GetPhieuOder(Guid id)
        {
            var phieuOder = await _context.PhieuOder.FindAsync(id);

            if (phieuOder == null)
            {
                return NotFound();
            }

            return phieuOder;
        }

        // PUT: api/PhieuOder/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPhieuOder(Guid id, PhieuOder phieuOder)
        {
            if (id != phieuOder.Id)
            {
                return BadRequest();
            }

            _context.Entry(phieuOder).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhieuOderExists(id))
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

        // POST: api/PhieuOder
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PhieuOder>> PostPhieuOder(PhieuOder phieuOder)
        {
            _context.PhieuOder.Add(phieuOder);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPhieuOder", new { id = phieuOder.Id }, phieuOder);
        }

        // DELETE: api/PhieuOder/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhieuOder(Guid id)
        {
            var phieuOder = await _context.PhieuOder.FindAsync(id);
            if (phieuOder == null)
            {
                return NotFound();
            }

            _context.PhieuOder.Remove(phieuOder);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PhieuOderExists(Guid id)
        {
            return _context.PhieuOder.Any(e => e.Id == id);
        }
    }
}
