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
    public class CarServicesController : ControllerBase
    {
        private readonly IMOJAutoRepository _carRepo;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public CarServicesController(IMOJAutoRepository carRepo, IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            _carRepo = carRepo;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet("GetServicesForCar/{carId}")]
        public async Task<IActionResult> GetCarServices(int carId)
        {
            var carFromDb = await _carRepo.GetById<Car>(carId);
            var carServices = _mapper.Map<IEnumerable<ServiceDto>>(carFromDb.Services);


            return Ok(carServices);
        }

        [HttpGet("GetUsersServices")]
        public async Task<IActionResult> GetUsersServices()
        {
            var currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            var usersCars = currentUser.MyCars;
            var usersCarServices = new List<ServiceDto>();

            foreach (var car in usersCars)
            {
                var listOfServicesForCar = _mapper.Map<IEnumerable<ServiceDto>>(car.Services);
                usersCarServices.AddRange(listOfServicesForCar);
            }

            return Ok(usersCarServices);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewCarServiceEntry(ServiceCreateEditDto serviceDto)
        {
            var newServiceEntry = _mapper.Map<Services>(serviceDto);

            _carRepo.Add(newServiceEntry);

            if (await _carRepo.SaveAll() > 0)
            {
                var relatedCar = await _carRepo.GetById<Car>(serviceDto.CarId);
                newServiceEntry.Car = relatedCar;
                var savedService = _mapper.Map<ServiceDto>(newServiceEntry);
                return Ok(savedService);
            }
            else
            {
                return BadRequest("Greška prilikom upisa servisa!");
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCarServiceEntry(ServiceCreateEditDto serviceDto)
        {
            var dbService = await _carRepo.GetById<Services>(serviceDto.Id);

            var updated = _mapper.Map(serviceDto, dbService);

            if(await _carRepo.SaveAll() > 0)
            {
                var serviceToReturn = _mapper.Map<ServiceDto>(updated);

                return Ok(serviceToReturn);
            }

            return BadRequest($"Desila se greška prilikom izmene servisa sa Id brojem ${serviceDto.Id}");
        }

        [HttpDelete("{serviceId}")]
        public async Task<IActionResult> DeleteCarServiceEntry(int serviceId)
        {
            var carServiceFromDb = await _carRepo.GetById<Services>(serviceId);

            if(carServiceFromDb == null)
            {
                return BadRequest($"Nije pronadjen unos sa Id brojem { serviceId}");
            }

            _carRepo.Delete(carServiceFromDb);

            if (await _carRepo.SaveAll() > 0)
            {
                var serviceInfo = _mapper.Map<ServiceDto>(carServiceFromDb);
                return Ok(serviceInfo);
            }

            return BadRequest($"Desila se greška prilikom brisanja servisa sa Id brojem {carServiceFromDb.Id}");
        }
    }
}
