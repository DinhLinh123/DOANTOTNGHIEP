namespace ManagerRestaurant.API.Models
{
    public class MailRequest
    {
        public string MailSettings { get; set; }
        public string Mail { get; set; }
        public string DisplayName { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
    }
}
