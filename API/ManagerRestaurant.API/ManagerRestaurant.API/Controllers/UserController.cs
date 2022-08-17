using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Infratructure;
using Infratructure.Datatables;
using ManagerRestaurant.API.Models;
using Newtonsoft.Json;

namespace ManagerRestaurant.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;

        public UserController(DataContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            return await _context.User.ToListAsync();
        }

        // GET: api/User
        [HttpGet("active")]
        public async Task<Responsive> GetUserActive()
        {
            try
            {
                var res = new Responsive();
                var query = _context.User.Where(x => x.IsDelete == false);
                res.Mess = "Get success";
                res.Data = await query.ToListAsync();
                return res;
            }
            catch (Exception ex)
            {
                return new Responsive(500, ex.InnerException.Message, null);
            }
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/User/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<Responsive> PutUser(Guid id, UserUpdateModel item)
        {
            var res = new Responsive();
            if (id != item.Id)
            {
                res.Code = 204;
                res.Mess = "Invalid data";
                return res;
            }
            try
            {
                var user = _context.User.Find(id);
                if (user != null)
                {
                    user.MaNV = item.MaNV;
                    user.FullName = item.FullName;
                    user.Phai = item.Phai;
                    user.ChucVu = item.ChucVu;
                    user.NgaySinh = item.NgaySinh;
                    user.SoDienThoai = item.SoDienThoai;
                    user.DiaChi = item.DiaChi;
                    user.ChiChu = item.ChiChu;
                    user.Quyen = item.Quyen;
                    user.IsDelete = item.IsDelete;
                    user.UserName = item.UserName;
                    user.Password = item.Password;
                    user.LastModifiedByUserId = item.LastModifiedByUserId;
                    user.LastModifiedByUserName = item.LastModifiedByUserName;

                    await _context.SaveChangesAsync();
                    res.Code = 200;
                    res.Mess = "Update success";
                    return res;
                }
                else
                {
                    res.Code = 204;
                    res.Mess = "Item not exist";
                    return res;
                }
            }
            catch (Exception ex)
            {
                res.Code = 500;
                res.Mess = ex.InnerException.Message;
                return res;
            }
        }

        // POST: api/User
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<Responsive> PostUser(UserCreateModel item)
        {

            try
            {
                var user = new User();
                user.Id = Guid.NewGuid();
                user.MaNV = item.MaNV;
                user.FullName = item.FullName;
                user.Phai = item.Phai;
                user.ChucVu = item.ChucVu;
                user.NgaySinh = item.NgaySinh;
                user.SoDienThoai = item.SoDienThoai;
                user.DiaChi = item.DiaChi;
                user.ChiChu = item.ChiChu;
                user.Quyen = item.Quyen;
                user.IsDelete = item.IsDelete;
                user.UserName = item.UserName;
                user.Password = item.Password;
                user.CreatedByUserId = item.CreatedByUserId;
                user.CreatedByUserName = item.CreatedByUserName;
                user.CreatedOnDate = item.CreatedOnDate;

                _context.User.Add(user);
                await _context.SaveChangesAsync();

                return new Responsive(200, "Thêm mới thành công", user);
            }
            catch (Exception ex)
            {
                return new Responsive(500, ex.InnerException.Message, null);
            }

        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // POST: api/DoAn
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpGet("filter")]
        public async Task<Responsive> GetFilterDoAn([FromQuery] string _filter)
        {
            try
            {

                var filter = JsonConvert.DeserializeObject<UserFilter>(_filter);
                var query = from s in _context.User select s;
                if (filter.Id != Guid.Empty)
                {
                    query = query.Where((x) => x.Id == filter.Id);
                }
                if (filter.TextSearch != null && filter.TextSearch.Length > 0)
                {
                    query = query.Where((x) => x.FullName.Contains(filter.TextSearch));
                }
                if (filter.SoDienThoai != null && filter.SoDienThoai.Length > 0)
                {
                    query = query.Where((x) => x.SoDienThoai.Contains(filter.SoDienThoai));
                }
                if (filter.ChucVu != null && filter.ChucVu.Length > 0)
                {
                    query = query.Where((x) => x.ChucVu.Contains(filter.ChucVu));
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
        class UserFilter : BaseFilter
        {
            public string SoDienThoai { get; set; }
            public string ChucVu { get; set; }
        }
    }
}
