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
    public class YKienDongGopController : ControllerBase
    {
        private readonly DataContext _context;

        public YKienDongGopController(DataContext context)
        {
            _context = context;
        }

        // GET: api/YKienDongGop
        [HttpGet]
        public async Task<ActionResult<IEnumerable<YKienDongGop>>> GetYKienDongGop()
        {
            return await _context.YKienDongGop.ToListAsync();
        }

        // GET: api/YKienDongGop/5
        [HttpGet("{id}")]
        public async Task<ActionResult<YKienDongGop>> GetYKienDongGop(Guid id)
        {
            var yKienDongGop = await _context.YKienDongGop.FindAsync(id);

            if (yKienDongGop == null)
            {
                return NotFound();
            }

            return yKienDongGop;
        }

        // PUT: api/YKienDongGop/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutYKienDongGop(Guid id, YKienDongGop yKienDongGop)
        {
            if (id != yKienDongGop.Id)
            {
                return BadRequest();
            }

            _context.Entry(yKienDongGop).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!YKienDongGopExists(id))
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

        // POST: api/YKienDongGop
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<YKienDongGop>> PostYKienDongGop(YKienDongGop yKienDongGop)
        {
            _context.YKienDongGop.Add(yKienDongGop);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetYKienDongGop", new { id = yKienDongGop.Id }, yKienDongGop);
        }

        // DELETE: api/YKienDongGop/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteYKienDongGop(Guid id)
        {
            var yKienDongGop = await _context.YKienDongGop.FindAsync(id);
            if (yKienDongGop == null)
            {
                return NotFound();
            }

            _context.YKienDongGop.Remove(yKienDongGop);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool YKienDongGopExists(Guid id)
        {
            return _context.YKienDongGop.Any(e => e.Id == id);
        }
    }
}
