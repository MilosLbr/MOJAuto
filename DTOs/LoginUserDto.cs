﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DTOs
{
    public class LoginUserDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; }
    }
}
