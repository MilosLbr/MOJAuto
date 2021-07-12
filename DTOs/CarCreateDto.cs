using System;
using System.Collections.Generic;
using System.Text;

namespace DTOs
{
    public class CarCreateEditDto
    {
        public int Id { get; set; }
        public string Model { get; set; }
        public double Kilometrage { get; set; }
        public int ManufactureYear { get; set; }
        public int EngineCubicCapacity { get; set; }
        public int EnginePowerKW { get; set; }
        public string ApplicationUserId { get; set; }

    }
}
