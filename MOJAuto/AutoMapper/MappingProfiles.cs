using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DTOs;
using MOJAuto.Models;

namespace MOJAuto.AutoMapper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<LoginUserDto, ApplicationUser>();
            CreateMap<RegisterUserDto, ApplicationUser>();
        }
    }
}
