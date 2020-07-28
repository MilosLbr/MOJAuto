using System;
using System.Collections.Generic;
using System.Text;

namespace DataModels.Models
{
    public class FuelUsage
    {
        public int Id { get; set; }
        public DateTime DateFilled { get; set; }
        public int Price { get; set; }
        public long Kilometrage { get; set; }
        public int LitersFilled { get; set; }
        public string GasStationName { get; set; }

    }
}
