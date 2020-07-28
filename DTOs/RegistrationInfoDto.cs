using System;
using System.Collections.Generic;
using System.Text;

namespace DTOs
{
    public class RegistrationInfoDto
    {
        public int Id { get; set; }
        public DateTime DateOfRegistration { get; set; }
        public string TechnicalCheckService { get; set; }
        public double Kilometrage { get; set; }
        public int TotalPrice { get; set; }
        public string AdditionalComment { get; set; }

        public int CarId { get; set; }
        public  CarBasicInfoDto Car { get; set; }
    }
}
