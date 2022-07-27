namespace ManagerRestaurant.API.Infratructure.Datatables
{
    public class Responsive
    {
        public Responsive(int code, string mess, object data)
        {
            this.Code = code; this.Mess = mess; this.Data = data;
        }
        public int Code { get; set; }
        public string Mess { get; set; }
        public object Data { get; set; }
    }
}
