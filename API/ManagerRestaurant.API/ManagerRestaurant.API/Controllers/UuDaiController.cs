using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Infratructure;
using ManagerRestaurant.API.Infratructure.Datatables;

namespace ManagerRestaurant.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UuDaiController : ControllerBase
    {
        private readonly DataContext _context;

        public UuDaiController(DataContext context)
        {
            _context = context;
        }

        // GET: api/UuDai
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UuDai>>> GetUuDai()
        {
            return await _context.UuDai.ToListAsync();
        }

        // GET: api/UuDai/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UuDai>> GetUuDai(Guid id)
        {
            var uuDai = await _context.UuDai.FindAsync(id);

            if (uuDai == null)
            {
                return NotFound();
            }

            return uuDai;
        }

        // PUT: api/UuDai/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUuDai(Guid id, UuDai uuDai)
        {
            if (id != uuDai.Id)
            {
                return BadRequest();
            }

            _context.Entry(uuDai).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UuDaiExists(id))
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

        // POST: api/UuDai
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UuDai>> PostUuDai(UuDai uuDai)
        {
            _context.UuDai.Add(uuDai);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUuDai", new { id = uuDai.Id }, uuDai);
        }

        // DELETE: api/UuDai/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUuDai(Guid id)
        {
            var uuDai = await _context.UuDai.FindAsync(id);
            if (uuDai == null)
            {
                return NotFound();
            }

            _context.UuDai.Remove(uuDai);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UuDaiExists(Guid id)
        {
            return _context.UuDai.Any(e => e.Id == id);
        }
    }
}
