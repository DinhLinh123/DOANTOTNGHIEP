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
    public class OderController : ControllerBase
    {
        private readonly DataContext _context;

        public OderController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Oder
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Oder>>> GetOder()
        {
            return await _context.Oder.ToListAsync();
        }

        // GET: api/Oder/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Oder>> GetOder(Guid id)
        {
            var oder = await _context.Oder.FindAsync(id);

            if (oder == null)
            {
                return NotFound();
            }

            return oder;
        }

        // PUT: api/Oder/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOder(Guid id, Oder oder)
        {
            if (id != oder.Id)
            {
                return BadRequest();
            }

            _context.Entry(oder).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OderExists(id))
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

        // POST: api/Oder
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Oder>> PostOder(Oder oder)
        {
            _context.Oder.Add(oder);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOder", new { id = oder.Id }, oder);
        }

        // DELETE: api/Oder/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOder(Guid id)
        {
            var oder = await _context.Oder.FindAsync(id);
            if (oder == null)
            {
                return NotFound();
            }

            _context.Oder.Remove(oder);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OderExists(Guid id)
        {
            return _context.Oder.Any(e => e.Id == id);
        }
    }
}
