using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Infratructure;
using ManagerRestaurant.API.Infratructure.Datatables;
using ManagerRestaurant.API.Models;
using Newtonsoft.Json;

namespace ManagerRestaurant.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BarsController : ControllerBase
    {
        private readonly DataContext _context;

        public BarsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Bars
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bar>>> GetBar()
        {
            return await _context.Bar.ToListAsync();
        }

        // GET: api/Bars/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bar>> GetBar(Guid id)
        {
            var bar = await _context.Bar.FindAsync(id);

            if (bar == null)
            {
                return NotFound();
            }

            return bar;
        }

        // PUT: api/Bars/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBar(Guid id, Bar bar)
        {
            if (id != bar.Id)
            {
                return BadRequest();
            }

            _context.Entry(bar).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BarExists(id))
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

        // POST: api/Bars
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Bar>> PostBar(Bar bar)
        {
            _context.Bar.Add(bar);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBar", new { id = bar.Id }, bar);
        }

        // DELETE: api/Bars/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBar(Guid id)
        {
            var bar = await _context.Bar.FindAsync(id);
            if (bar == null)
            {
                return NotFound();
            }

            _context.Bar.Remove(bar);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BarExists(Guid id)
        {
            return _context.Bar.Any(e => e.Id == id);
        }
        [HttpGet("filter")]
        public async Task<Responsive> GetFilterBar([FromQuery] string _filter)
        {
            try
            {

                var filter = JsonConvert.DeserializeObject<BarFilter>(_filter);
                var query = from s in _context.Bar select s;
                if (filter.Id != Guid.Empty)
                {
                    query = query.Where((x) => x.Id == filter.Id);
                }
                if (filter.TextSearch != null && filter.TextSearch.Length > 0)
                {
                    query = query.Where((x) => x.TenMatHang.Contains(filter.TextSearch));
                }
                if (filter.PageNumber > 0 && filter.PageSize > 0)
                {
                    query = query.Skip(filter.PageSize * (filter.PageNumber - 1)).Take(filter.PageSize);
                }

                var data = await query.ToListAsync();

                var mes = "";
                if (data.Count == 0)
                {
                    mes = "Not data";
                }
                else
                {
                    mes = "Get success";
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

        class BarFilter : BaseFilter
        { 
        }
    }
}
