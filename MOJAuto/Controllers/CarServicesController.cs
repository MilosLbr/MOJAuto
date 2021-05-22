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
        public async Task<IActionResult> CreateNewCarServiceEntry(ServiceDto serviceDto)
        {
            var newServiceEntry = _mapper.Map<Services>(serviceDto);

            _carRepo.Add(newServiceEntry);

            if (await _carRepo.SaveAll() > 0)
            {
                var savedService = _mapper.Map<ServiceDto>(newServiceEntry);
                return Ok(savedService);
            }
            else
            {
                return BadRequest("Greška prilikom upisa servisa!");
            }
        }
    }
}
