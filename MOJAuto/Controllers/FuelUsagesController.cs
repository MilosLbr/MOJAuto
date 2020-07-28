using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataModels.Models;
using DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MOJAuto.Repository;

namespace MOJAuto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FuelUsagesController : ControllerBase
    {
        private readonly IMOJAutoRepository _carRepo;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public FuelUsagesController(IMOJAutoRepository carRepo, IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            _carRepo = carRepo;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var allFuelUsages = await _carRepo.GetAll<FuelUsage>();
            var allFuelUsagesDto = _mapper.Map<IEnumerable<FuelUsageDto>>(allFuelUsages);

            return Ok(allFuelUsagesDto);
        }
    }
}
