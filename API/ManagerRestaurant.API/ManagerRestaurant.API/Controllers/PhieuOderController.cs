﻿using System;
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
            var res = new Responsive();
            try
            {
                var data = await _context.PhieuOder.ToListAsync();
                res.Code = 200;
                res.Mess = "Get success";
                var Data = new List<PhieuOderModel>();
                foreach (var item in data)
                {
                    Data.Add(await CoverPhieuOder(item));
                }

                res.Data = Data;
                return res;
            }
            catch (Exception ex)
            {
                res.Code = 500;
                res.Mess = ex.InnerException.Message;
                return res;
            }

        }

        async Task<PhieuOderModel> CoverPhieuOder(PhieuOder item)
        {
            var phieuOder = new PhieuOderModel();

            phieuOder.Id = item.Id;
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

            phieuOder.Ban = await (from s in _context.Ban
                                   where s.Id == item.IdBan
                                   select new BanModel
                                   {
                                       Id = s.Id,
                                       Name = s.Name
                                   }

                              ).FirstOrDefaultAsync();
            var thungantemp = _context.User.Find(item.IdThuNgan);
            phieuOder.ThuNgan = await (from s in _context.User
                                       where s.Id == item.IdThuNgan
                                       select new UserModel
                                       {
                                           Id = s.Id,
                                           MaNV = s.MaNV,
                                           FullName = s.FullName,
                                           UserName = s.UserName
                                       }

                              ).FirstOrDefaultAsync();
            var khachhangtemp = _context.KhachHang.Find(item.IdKhachHang);
            phieuOder.KhachHang = await (from s in _context.KhachHang
                                         where s.Id == item.IdKhachHang
                                         select new KhachHangModel
                                         {
                                             Id = s.Id,
                                             Name = s.Name,
                                             SoDienThoai = s.SoDienThoai
                                         }

                              ).FirstOrDefaultAsync();

            var odertemp = _context.Oder.Where((x) => x.IdPhieuOder == item.Id).ToList();
            var doans = new List<DoAnV2Model>();
            foreach (var element in odertemp)
            {
                var ele = await _context.DoAn.FindAsync(element.IdDoAn);
                doans.Add(new DoAnV2Model
                {
                    Id = ele.Id,
                    Name = ele.Name,
                    MaTheLoai = ele.MaTheLoai,
                    TenTheLoai = _context.TheLoaiDoAn.FindAsync(ele.MaTheLoai).Result.Name,
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
                    SoLuong = element.SoLuong
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
            try
            {
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
            }            try
            {
                var phieuOder = _context.PhieuOder.Find(id);
               if (phieuOder != null)
                {
                    if (item.IdBan == Guid.Empty)
                    {
                        res.Code = 204;
                        res.Mess = "Id bàn không hợp lệ";
                        return res;
                    }
                    else
                    {
                        var ban = await _context.Ban.FindAsync(item.IdBan);
                        ban.TrangThai = item.TrangThaiBan;
                        await _context.SaveChangesAsync();
                    }
                    phieuOder.IdBan = item.IdBan;
                    phieuOder.IdThuNgan = item.IdThuNgan;
                    phieuOder.IdKhachHang = item.IdKhachHang;
                    phieuOder.Vocher = item.Vocher;
                    phieuOder.TongTien = item.TongTien;
                    phieuOder.ThucThu = item.ThucThu;
                    phieuOder.SoTienGiam = item.SoTienGiam;
                    phieuOder.TrangThai = item.TrangThai;
                    phieuOder.LastModifiedByUserId = item.LastModifiedByUserId;data:image/pjpeg;base64,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
                    phieuOder.LastModifiedByUserName = item.LastModifiedByUserName;
                    if (item.TrangThai == 1) { 
                        var ban = await _context.Ban.FindAsync(item.IdBan);
                        ban.TrangThai = 0;
                        phieuOder.ThoiGianThanhToan = DateTime.Now;
                        await _context.SaveChangesAsync();
                    }
                    
                    //delete all order old
                    _context.Oder.RemoveRange(_context.Oder.Where(x => x.IdPhieuOder == phieuOder.Id));

                    if (item.MonAns != null)
                    {
                        foreach (var i in item.MonAns)
                        {
                            _context.Oder.Add(new Oder
                            {
                                Id = Guid.NewGuid(),
                                IdPhieuOder = phieuOder.Id,
                                PhieuOder = phieuOder,
                                IdDoAn = i.Id,
                                DoAn = _context.DoAn.Find(i.Id),
                                SoLuong = i.SoLuong,
                                IdBan = phieuOder.IdBan,
                                CreatedByUserId = i.CreatedByUserId,
                                CreatedByUserName = i.CreatedByUserName,
                                CreatedOnDate = DateTime.Now,
                                LastModifiedByUserId = i.LastModifiedByUserId,
                                LastModifiedByUserName = i.LastModifiedByUserName,
                            });
                        }

                    }
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

                if (item.MonAns != null)
                {
                    foreach (var i in item.MonAns)
                    {
                        _context.Oder.Add(new Oder
                        {
                            Id = Guid.NewGuid(),
                            IdPhieuOder = phieuOder.Id,
                            PhieuOder = phieuOder,
                            IdDoAn = i.Id,
                            DoAn = _context.DoAn.Find(i.Id),
                            SoLuong = i.SoLuong,
                            IdBan = phieuOder.IdBan,
                            CreatedByUserId = i.CreatedByUserId,
                            CreatedByUserName = i.CreatedByUserName,
                            CreatedOnDate = DateTime.Now,
                            LastModifiedByUserId = i.LastModifiedByUserId,
                            LastModifiedByUserName = i.LastModifiedByUserName,
                        });
                    }

                }
                _context.PhieuOder.Add(phieuOder);
                await _context.SaveChangesAsync();

                return new Responsive(200, "Thêm mới thành công", phieuOder);
            }
            catch (Exception ex)
            {
                return new Responsive(500, ex.InnerException.Message, null);
            }
        }

        [HttpGet("findbyidban/{idban}")]
        public async Task<Responsive> GetByIdBan(Guid idban)
        {
            try
            {
                //Lấy thông tin khách hàng theo bàn
                var phieu = await _context.PhieuOder.Where(x => x.IdBan == idban && x.TrangThai == 0).FirstOrDefaultAsync();
                if (phieu != null)
                {
                    var res = new Responsive();
                    res.Code = 200;
                    res.Data = await CoverPhieuOder(phieu);
                    res.Mess = "Get success";
                    return res;
                }
                else
                {
                    var res = new Responsive();
                    res.Data = null;
                    res.Code = 204;
                    res.Mess = "not exist";
                    return res;
                }

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

        //[HttpGet("filter")]
        //public async Task<Responsive> GetFilterPhieuOder([FromQuery] string _filter)
        //{
        //    try
        //    {

        //        var filter = JsonConvert.DeserializeObject<PhieuOderFilter>(_filter);
        //        var query = from s in _context.PhieuOder select s;
        //        if (filter.Id != Guid.Empty)
        //        {
        //            query = query.Where((x) => x.Id == filter.Id);
        //        }
        //        if (filter.TextSearch.Length > 0)
        //        {
        //            query = query.Where((x) => x.Name.Contains(filter.TextSearch));
        //        }

        //        if (filter.PageNumber > 0 && filter.PageSize > 0)
        //        {
        //            query = query.Skip(filter.PageSize * (filter.PageNumber - 1)).Take(filter.PageSize);
        //        }

        //        var data = await query.ToListAsync();

        //        var mes = "";
        //        if (data.Count == 0)
        //        {
        //            mes = "Not data";
        //        }
        //        else
        //        {
        //            mes = "Get success";
        //        }

        //        var res = new Responsive(200, mes, data);
        //        return res;
        //    }
        //    catch (Exception err)
        //    {
        //        var res = new Responsive(500, err.Message, err.ToString());
        //        return res;
        //    }
        //}

        class PhieuOderFilter : BaseFilter
        {
            public Guid? IdBan { get; set; }
        }
    }
}
