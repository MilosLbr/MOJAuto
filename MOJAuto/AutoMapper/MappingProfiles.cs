using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DTOs;
using DataModels.Models;

namespace MOJAuto.AutoMapper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // app user
            CreateMap<LoginUserDto, ApplicationUser>();
            CreateMap<RegisterUserDto, ApplicationUser>();
            CreateMap<ApplicationUser, ApplicationUserBasicInfoDto>();

            // cars
            CreateMap<CarCreateDto, Car>();
            CreateMap<Car, CarInfoDto>();
        }
    }
}
