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
    public class TheLoaiMonAnController : ControllerBase
    {
        private readonly DataContext _context;

        public TheLoaiMonAnController(DataContext context)
        {
            _context = context;
        }

        // GET: api/TheLoaiDoAn
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TheLoaiDoAn>>> GetTheLoaiMonAn()
        {
            return await _context.TheLoaiDoAn.ToListAsync();
        }

        // GET: api/TheLoaiDoAn/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TheLoaiDoAn>> GetTheLoaiMonAn(Guid id)
        {
            var TheLoaiDoAn = await _context.TheLoaiDoAn.FindAsync(id);

            if (TheLoaiDoAn == null)
            {
                return NotFound();
            }

            return TheLoaiDoAn;
        }

        // PUT: api/TheLoaiDoAn/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTheLoaiMonAn(Guid id, TheLoaiDoAn TheLoaiDoAn)
        {
            if (id != TheLoaiDoAn.Id)
            {
                return BadRequest();
            }

            _context.Entry(TheLoaiDoAn).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TheLoaiMonAnExists(id))
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

        // POST: api/TheLoaiDoAn
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TheLoaiDoAn>> PostTheLoaiMonAn(TheLoaiDoAn TheLoaiDoAn)
        {
            _context.TheLoaiDoAn.Add(TheLoaiDoAn);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTheLoaiMonAn", new { id = TheLoaiDoAn.Id }, TheLoaiDoAn);
        }

        // DELETE: api/TheLoaiDoAn/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTheLoaiMonAn(Guid id)
        {
            var TheLoaiDoAn = await _context.TheLoaiDoAn.FindAsync(id);
            if (TheLoaiDoAn == null)
            {
                return NotFound();
            }

            _context.TheLoaiDoAn.Remove(TheLoaiDoAn);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TheLoaiMonAnExists(Guid id)
        {
            return _context.TheLoaiDoAn.Any(e => e.Id == id);
        }
    }
}
