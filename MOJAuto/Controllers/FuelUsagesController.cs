using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using AutoMapper;
using DataModels.Models;
using DTOs;
using IdentityServer4.Extensions;
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

        [HttpGet("getFuelUsagesForCar/{carId}")]
        public async Task<IActionResult> GetFuelUsagesForCar(int carId)
        {
            if (!User.IsAuthenticated())
            {
                return Unauthorized();
            }

            var carFromDb = await _carRepo.GetById<Car>(carId);
            var fuelUsagesForCar = carFromDb.FuelUsages;

            var fuelUsagesDto = _mapper.Map<IEnumerable<FuelUsageDto>>(fuelUsagesForCar);

            return Ok(fuelUsagesDto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewFuelUsageEntry(FuelUsageCreateEditDto fuelUsageDto)
        {
            var newFuelUsageEntry = _mapper.Map<FuelUsage>(fuelUsageDto);

            _carRepo.Add(newFuelUsageEntry);

            if (await _carRepo.SaveAll() > 0)
            {
                var relatedCar = await _carRepo.GetById<Car>(fuelUsageDto.CarId);
                newFuelUsageEntry.Car = relatedCar;
                var toRetutn = _mapper.Map<FuelUsageDto>(newFuelUsageEntry);
                return Ok(toRetutn);
            }
            else
            {
                return BadRequest("Dogodila se greška prilikom upisivanja podataka!");
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateFuelUsageEntry(FuelUsageCreateEditDto fuelUsageDto)
        {
            var fuelUsageToUpdate = await _carRepo.GetById<FuelUsage>(fuelUsageDto.Id);

            if (fuelUsageToUpdate == null)
            {
                return BadRequest($"Ne postoji unos o potrošnji goriva sa Id brojem {fuelUsageDto.Id}");
            }

            _mapper.Map<FuelUsageCreateEditDto, FuelUsage>(fuelUsageDto, fuelUsageToUpdate);

            if (await _carRepo.SaveAll() >= 0)
            {
                var fuelUsageToReturn = _mapper.Map<FuelUsageDto>(fuelUsageToUpdate);
                return Ok(fuelUsageToReturn);
            }

            return BadRequest($"Desila se greška prilikom izmene registracije sa Id brojem ${fuelUsageDto.Id}");
        }

        [HttpDelete("{fuelUsageId}")]
        public async Task<IActionResult> DeleteFuelUsageEntry(int fuelUsageId)
        {
            var entryFromDb = await _carRepo.GetById<FuelUsage>(fuelUsageId);

            if(entryFromDb == null)
            {
                return BadRequest($"Nije pronađen unos sa Id brojem {fuelUsageId}");
            }

            _carRepo.Delete<FuelUsage>(entryFromDb);

            if(await _carRepo.SaveAll() > 0)
            {
                var fuelUsageDto = _mapper.Map<FuelUsageDto>(entryFromDb);
                return Ok(fuelUsageDto);
            }
            else
            {
                return BadRequest("Dogodila se greška prilikom brisanja podataka");
            }
        }
    }
}
