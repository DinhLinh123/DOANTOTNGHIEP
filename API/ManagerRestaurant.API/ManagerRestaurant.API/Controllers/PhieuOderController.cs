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
        public async Task<Responsive> GetPhieuOder()
        {
            var data = await _context.PhieuOder.ToListAsync();
            var res = new Responsive();
            res.Code = 204;
            res.Mess = "Invalid data";
            var Data = new List<PhieuOderModel>();
            foreach (var item in data)
            {
                Data.Add(CoverPhieuOder(item));
            }
            res.Data = Data;
            return res;
        }

        PhieuOderModel CoverPhieuOder(PhieuOder item)
        {
            var phieuOder = new PhieuOderModel();

            phieuOder.Id = item.Id;
            phieuOder.SoHopDong = item.SoHopDong;
            phieuOder.TongTien = item.TongTien;
            phieuOder.ThucThu = item.ThucThu;
            phieuOder.Vocher = item.Vocher;
            phieuOder.SoTienGiam = item.SoTienGiam;
            phieuOder.TrangThai = item.TrangThai;
            phieuOder.ThoiGianThanhToan = item.ThoiGianThanhToan;
            phieuOder.CreatedByUserId = item.CreatedByUserId;
            phieuOder.CreatedByUserName = item.CreatedByUserName;
            phieuOder.CreatedOnDate = item.CreatedOnDate;
            phieuOder.LastModifiedByUserId = item.LastModifiedByUserId;
            phieuOder.LastModifiedByUserName = item.LastModifiedByUserName;

            var bantempt = _context.Ban.Find(item.IdBan);
            phieuOder.Ban = new BanModel
            {
                Id = bantempt.Id,
                Name = bantempt.Name,
                SoNguoiToiDa = bantempt.SoNguoiToiDa,
                LoaiBan = bantempt.LoaiBan,
                Top = bantempt.Top,
                Left = bantempt.Left,
                TrangThai = bantempt.TrangThai,
                KieuDang = bantempt.KieuDang,
                IdKhuVuc = bantempt.IdKhuVuc,
                TenKhuVuc = bantempt.TenKhuVuc,
                CreatedByUserId = bantempt.CreatedByUserId,
                CreatedByUserName = bantempt.CreatedByUserName,
                CreatedOnDate = bantempt.CreatedOnDate,
                LastModifiedByUserId = bantempt.LastModifiedByUserId,
                LastModifiedByUserName = bantempt.LastModifiedByUserName
            };
            var thungantemp = _context.User.Find(item.IdThuNgan);
            phieuOder.ThuNgan = new UserModel
            {
                Id = thungantemp.Id,
                MaNV = thungantemp.MaNV,
                FullName = thungantemp.FullName,
                Phai = thungantemp.Phai,
                ChucVu = thungantemp.ChucVu,
                NgaySinh = thungantemp.NgaySinh,
                SoDienThoai = thungantemp.SoDienThoai,
                DiaChi = thungantemp.DiaChi,
                ChiChu = thungantemp.ChiChu,
                Quyen = "",
                IsDelete = thungantemp.IsDelete,
                UserName = thungantemp.UserName,
                Password = "",
                CreatedByUserId = thungantemp.CreatedByUserId,
                CreatedByUserName = thungantemp.CreatedByUserName,
                CreatedOnDate = thungantemp.CreatedOnDate,
                LastModifiedByUserId = thungantemp.LastModifiedByUserId,
                LastModifiedByUserName = thungantemp.LastModifiedByUserName
            };
            var khachhangtemp = _context.KhachHang.Find(item.IdKhachHang);
            phieuOder.KhachHang = new KhachHangModel
            {
                Id = khachhangtemp.Id,
                Name = khachhangtemp.Name,
                SoDienThoai = khachhangtemp.SoDienThoai,
                CreatedByUserId = khachhangtemp.CreatedByUserId,
                CreatedByUserName = khachhangtemp.CreatedByUserName,
                CreatedOnDate = khachhangtemp.CreatedOnDate,
                LastModifiedByUserId = khachhangtemp.LastModifiedByUserId,
                LastModifiedByUserName = khachhangtemp.LastModifiedByUserName
            };

            var odertemp = _context.Oder.Where((x) => x.IdPhieuOder == item.Id).ToList();
            var doans = new List<DoAnModel>();
            foreach (var element in odertemp)
            {
                var ele = _context.DoAn.Find(element.IdMonAn);
                doans.Add(new DoAnModel
                {
                    Id = ele.Id,
                    Name = ele.Name,
                    MaTheLoai = ele.MaTheLoai,
                    TenTheLoai = ele.TheLoaiDoAn.Name,
                    LinkAnh = ele.LinkAnh,
                    GhiChu = ele.GhiChu,
                    DanhSachMonAn = ele.DanhSachMonAn,
                    DonViTinh = ele.DonViTinh,
                    DonGia = ele.DonGia,
                    TrangThai = ele.TrangThai,
                    CreatedByUserId = ele.CreatedByUserId,
                    CreatedByUserName = ele.CreatedByUserName,
                    CreatedOnDate = ele.CreatedOnDate,
                    LastModifiedByUserId = ele.LastModifiedByUserId,
                });
            }
            phieuOder.DoAns = doans;
            return phieuOder;
        }
        // GET: api/PhieuOder/5
        [HttpGet("{id}")]
        public async Task<Responsive> GetPhieuOder(Guid id)
        {
            var res = new Responsive();
            var phieuOder = await _context.PhieuOder.FindAsync(id);
            if (phieuOder == null)
            {
                
                res.Code = 204;
                res.Mess = "not found";
                return res;
            }
            else
            {
                res.Data = CoverPhieuOder(phieuOder);
            }
            return res;
        }

        // PUT: api/PhieuOder/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<Responsive> PutPhieuOder(Guid id, PhieuOderUpdateModel item)
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
                var phieuOder = _context.PhieuOder.Find(id);
                if (phieuOder != null)
                {
                    phieuOder.IdBan = item.IdBan;
                    phieuOder.SoHopDong = item.SoHopDong;
                    phieuOder.IdThuNgan = item.IdThuNgan;
                    phieuOder.IdKhachHang = item.IdKhachHang;
                    phieuOder.Vocher = item.Vocher;
                    phieuOder.TongTien = item.TongTien;
                    phieuOder.ThucThu = item.ThucThu;
                    phieuOder.SoTienGiam = item.SoTienGiam;
                    phieuOder.TrangThai = item.TrangThai;
                    if (item.TrangThai == 3) { phieuOder.ThoiGianThanhToan = DateTime.Now; }
                    phieuOder.LastModifiedByUserId = item.LastModifiedByUserId;
                    phieuOder.LastModifiedByUserName = item.LastModifiedByUserName;

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

        // POST: api/PhieuOder
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<Responsive> PostPhieuOder(PhieuOderCreateModel item)
        {
            try
            {
                //conver
                var phieuOder = new PhieuOder();
                phieuOder.Id = Guid.NewGuid();
                phieuOder.IdBan = item.IdBan;
                phieuOder.SoHopDong = item.SoHopDong;
                phieuOder.IdThuNgan = item.IdThuNgan;
                phieuOder.IdKhachHang = item.IdKhachHang;
                phieuOder.Vocher = item.Vocher;
                phieuOder.TongTien = item.TongTien;
                phieuOder.ThucThu = item.ThucThu;
                phieuOder.SoTienGiam = item.SoTienGiam;
                phieuOder.TrangThai = 0;
                phieuOder.CreatedByUserId = item.CreatedByUserId;
                phieuOder.CreatedByUserName = item.CreatedByUserName;
                phieuOder.CreatedOnDate = DateTime.Now;

                _context.PhieuOder.Add(phieuOder);
                await _context.SaveChangesAsync();

                return new Responsive(200, "Thêm mới thành công", phieuOder);
            }
            catch (Exception ex)
            {
                return new Responsive(500, ex.InnerException.Message, null);
            }
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
