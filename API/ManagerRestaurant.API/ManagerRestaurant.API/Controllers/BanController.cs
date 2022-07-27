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
        public async Task<IActionResult> PutBan(Guid id, Ban ban)
        {
            if (id != ban.Id)
            {
                return BadRequest();
            }

            _context.Entry(ban).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BanExists(id))
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

        // POST: api/Ban
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Ban>> PostBan(Ban ban)
        {
            _context.Ban.Add(ban);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBan", new { id = ban.Id }, ban);
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
}
