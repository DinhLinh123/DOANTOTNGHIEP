using MailKit.Net.Smtp;
using MailKit.Security;
using ManagerRestaurant.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using System;
using System.IO;
using System.Threading.Tasks;

namespace ManagerRestaurant.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        [HttpGet("send")]
        public string SendMail()
        {
            try
            {
                var _mailSettings = new MailRequest();

                _mailSettings.Mail = "ngocduc121020@gmail.com";
                _mailSettings.DisplayName = "Mukesh Murugan";
                _mailSettings.Password = "Song101220*";
                _mailSettings.Host = "smtp.gmail.com";
                _mailSettings.Port = 587;
                

                var mailRequest = new MailRequestModule();
                mailRequest.ToEmail = "nhanmasitinh@gmai.com";
                mailRequest.Subject = "Mail";
                mailRequest.Body = "Nppo";
                var email = new MimeMessage();
                email.Sender = MailboxAddress.Parse(_mailSettings.Mail);
                email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
                email.Subject = mailRequest.Subject;
                var builder = new BodyBuilder();
                if (mailRequest.Attachments != null)
                {
                    byte[] fileBytes;
                    foreach (var file in mailRequest.Attachments)
                    {
                        if (file.Length > 0)
                        {
                            using (var ms = new MemoryStream())
                            {
                                file.CopyTo(ms);
                                fileBytes = ms.ToArray();
                            }
                            builder.Attachments.Add(file.FileName, fileBytes, ContentType.Parse(file.ContentType));
                        }
                    }
                }
                builder.HtmlBody = mailRequest.Body;
                email.Body = builder.ToMessageBody();
                using var smtp = new SmtpClient();
                smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
                smtp.Authenticate(_mailSettings.Mail, _mailSettings.Password);
                smtp.SendAsync(email);
                smtp.Disconnect(true);

                return "";
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
