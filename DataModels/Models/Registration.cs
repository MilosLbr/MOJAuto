﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DataModels.Models
{
    public class Registration
    {
        public int Id { get; set; }
        public DateTime DateOfRegistration { get; set; }
        public string TechnicalCheckService { get; set; }
        public long Kilometrage { get; set; }
        public int TotalPrice { get; set; }
        public string AdditionalComment { get; set; }

        public int CarId { get; set; }
        public virtual Car Car { get; set; }

    }
}
