using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Infratructure;
using Infratructure.Datatables;
using Newtonsoft.Json;
using ManagerRestaurant.API.Models;

namespace ManagerRestaurant.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoAnController : ControllerBase
    {
        private readonly DataContext _context;

        public DoAnController(DataContext context)
        {
            _context = context;
        }

        // GET: api/DoAn
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DoAn>>> GetDoAn()
        {
            return await _context.DoAn.ToListAsync();
        }

        // GET: api/DoAn/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DoAn>> GetDoAn(Guid id)
        {
            var doAn = await _context.DoAn.FindAsync(id);

            if (doAn == null)
            {
                return NotFound();
            }

            return doAn;
        }

        // PUT: api/DoAn/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDoAn(Guid id, DoAn doAn)
        {
            if (id != doAn.Id)
            {
                return BadRequest();
            }

            _context.Entry(doAn).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DoAnExists(id))
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

        // POST: api/DoAn
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DoAn>> PostDoAn(DoAn doAn)
        {
            _context.DoAn.Add(doAn);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDoAn", new { id = doAn.Id }, doAn);
        }

        // POST: api/DoAn
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpGet("/filter")]
        public async Task<Responsive> GetFilterDoAn([FromQuery] string _filter)
        {
            try
            {

                DoAnFilter filter = JsonConvert.DeserializeObject<DoAnFilter>(_filter);
                var query = from s in _context.DoAn select s;
                if (filter.Id != Guid.Empty)
                {
                    query = query.Where((x) => x.Id == filter.Id);
                }
                if (filter.TextSearch.Length > 0)
                {
                    query = query.Where((x) => x.Name.Contains(filter.TextSearch));
                }
                if (filter.MaTheLoai != Guid.Empty)
                {
                    query = query.Where((x) => x.MaTheLoai == filter.MaTheLoai);
                }
                if (filter.PageNumber > 0)
                {
                    query = query.Take(filter.PageNumber);
                }
                if (filter.PageSize > 0)
                {
                    query = query.Skip(filter.PageSize);
                }

                var data = await query.ToListAsync();
                
                var mes = "";
                if (data.Count ==0)
                {
                    mes = "Not data";
                }
                else
                {
                    mes = "get success";
                }

                var res = new Responsive(200, mes, data);
                return res;
            }
            catch (Exception err)
            {
                var res = new Responsive(500, err.Message, err.ToString());
                return res;
            }
        }

        // DELETE: api/DoAn/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoAn(Guid id)
        {
            var doAn = await _context.DoAn.FindAsync(id);
            if (doAn == null)
            {
                return NotFound();
            }

            _context.DoAn.Remove(doAn);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DoAnExists(Guid id)
        {
            return _context.DoAn.Any(e => e.Id == id);
        }
    }

    class DoAnFilter:BaseFilter
    {
        public Guid MaTheLoai { get; set; }
    }
}
