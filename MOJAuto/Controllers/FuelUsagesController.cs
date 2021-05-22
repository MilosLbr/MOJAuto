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

        [HttpGet("getAllFuelUsages")]
        public async Task<IActionResult> GetAll()
        {
            var allFuelUsages = await _carRepo.GetAll<FuelUsage>();
            var allFuelUsagesDto = _mapper.Map<IEnumerable<FuelUsageDto>>(allFuelUsages);

            return Ok(allFuelUsagesDto);
        }

        [HttpGet("getFuelUsagesForUser")]
        public async Task<IActionResult> GetFuelUsagesForUser()
        {
            var currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            var usersCars = currentUser.MyCars;
            var usersFuelUsageEntries = new List<FuelUsageDto>();

            foreach (var car in usersCars)
            {
                var listOfFuelUsageEntriesForCar = _mapper.Map<ICollection<FuelUsageDto>>(car.FuelUsages);

                usersFuelUsageEntries.AddRange(listOfFuelUsageEntriesForCar);
            }

            return Ok(usersFuelUsageEntries);
        }


        [HttpPost]
        public async Task<IActionResult> CreateNewFuelUsageEntry(FuelUsageDto fuelUsageDto)
        {
            var newEntry = _mapper.Map<FuelUsage>(fuelUsageDto);

            _carRepo.Add(newEntry);


            if(await _carRepo.SaveAll() > 0)
            {
                return Ok("Uspešno zabeleženo!");
            }
            else
            {
                return BadRequest("Dogodila se greška prilikom upisivanja podataka!");
            }
        }
    }
}
