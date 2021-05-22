using System;
using System.Collections.Generic;
using System.Text;

namespace DTOs
{
    public class ServiceCreateEditDto
    {
        public int Id { get; set; }
        public DateTime DateOfService { get; set; }
        public long Kilometrage { get; set; }
        public int Price { get; set; }
        public string Title { get; set; }
        public string Comment { get; set; }

        public int CarId { get; set; }
    }
}
