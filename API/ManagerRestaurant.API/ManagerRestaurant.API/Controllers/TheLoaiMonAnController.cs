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
    public class TheLoaiMonAnController : ControllerBase
    {
        private readonly DataContext _context;

        public TheLoaiMonAnController(DataContext context)
        {
            _context = context;
        }

        // GET: api/TheLoaiMonAn
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TheLoaiMonAn>>> GetTheLoaiMonAn()
        {
            return await _context.TheLoaiMonAn.ToListAsync();
        }

        // GET: api/TheLoaiMonAn/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TheLoaiMonAn>> GetTheLoaiMonAn(Guid id)
        {
            var theLoaiMonAn = await _context.TheLoaiMonAn.FindAsync(id);

            if (theLoaiMonAn == null)
            {
                return NotFound();
            }

            return theLoaiMonAn;
        }

        // PUT: api/TheLoaiMonAn/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTheLoaiMonAn(Guid id, TheLoaiMonAn theLoaiMonAn)
        {
            if (id != theLoaiMonAn.Id)
            {
                return BadRequest();
            }

            _context.Entry(theLoaiMonAn).State = EntityState.Modified;

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

        // POST: api/TheLoaiMonAn
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TheLoaiMonAn>> PostTheLoaiMonAn(TheLoaiMonAn theLoaiMonAn)
        {
            _context.TheLoaiMonAn.Add(theLoaiMonAn);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTheLoaiMonAn", new { id = theLoaiMonAn.Id }, theLoaiMonAn);
        }

        // DELETE: api/TheLoaiMonAn/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTheLoaiMonAn(Guid id)
        {
            var theLoaiMonAn = await _context.TheLoaiMonAn.FindAsync(id);
            if (theLoaiMonAn == null)
            {
                return NotFound();
            }

            _context.TheLoaiMonAn.Remove(theLoaiMonAn);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TheLoaiMonAnExists(Guid id)
        {
            return _context.TheLoaiMonAn.Any(e => e.Id == id);
        }
    }
}
