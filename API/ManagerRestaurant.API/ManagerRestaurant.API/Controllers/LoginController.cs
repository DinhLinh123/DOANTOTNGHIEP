﻿using Infratructure;
using ManagerRestaurant.API.Infratructure.Datatables;
using ManagerRestaurant.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ManagerRestaurant.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly DataContext _context;

        public LoginController(DataContext context)
        {
            _context = context;
        }
        //// GET: api/<LoginController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET api/<LoginController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/<LoginController>
        [HttpPost("/Login")]
        public async Task<Responsive> Post(UserLoginModel userLogin )
        {
            try
            {
                var mes = "";
                var query = from s in _context.User where (s.UserName.Equals(userLogin.UserName) && (s.Password.Equals(userLogin.Password))) select s;
                var data = query.FirstOrDefault();
                if (data != null)
                {
                    mes = "Login Success";
                    //save status login
                    HttpContext.Session.SetString(userLogin.UserName, userLogin.Password);
                }
                else
                {
                    mes = "Login fail";
                }
                 
                return new Responsive(200, mes, data); ;
            }
            catch (Exception ex)
            {
                return new Responsive(200, ex.InnerException.Message, null);
            }
        }

        // POST api/<LoginController>
        [HttpPost("/Logout")]
        public async Task<Responsive> PostLogout(UserLoginModel userLogin)
        {
            try
            {
                var res = new Responsive();
                var query =  from s in _context.User where (s.UserName.Equals(userLogin.UserName)) select s;
                var data = query.FirstOrDefault();
                if (data != null && HttpContext.Session.GetString(userLogin.UserName)!= null)
                {
                    res.Mess = "Logout Success";
                    res.Code = 200;
                    //save status login
                    HttpContext.Session.Remove(userLogin.UserName);
                }
                else
                {
                    res.Mess = "User not exist";
                    res.Code = 204;
                }

                return res;
            }
            catch (Exception ex)
            {
                return new Responsive(200, ex.InnerException.Message, null);
            }
        }

        // POST api/<LoginController>
        [HttpGet("/GetSatusLogin")]
        public async Task<Responsive> PostGetSatusLogin(string username)
        {
            try
            {
                var res = new Responsive();
                if (HttpContext.Session.GetString(username) != null)
                {
                    var query = from s in _context.User where s.UserName.Equals(username) select s;
                    var data = query.FirstOrDefault();
                    if (data != null)
                    {
                        res.Mess = "Is login";
                        res.Data = data;
                        res.Code = 200;
                    }
                    else
                    {
                        res.Mess = "User not exsit";
                        res.Data = null;
                        res.Code = 204;
                        HttpContext.Session.Remove(username);
                    }
                }
                else
                {
                    res.Mess = "User not login";
                    res.Data = null;
                    res.Code = 204;
                }

                return res;
            }
            catch (Exception ex)
            {
                return new Responsive(500, ex.InnerException.Message, null);
            }
        }

        //// PUT api/<LoginController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<LoginController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
