using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    public class RegistrationsController : ControllerBase
    {
        private readonly IMOJAutoRepository _carRepo;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;

        public RegistrationsController(IMOJAutoRepository carRepo, IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            _carRepo = carRepo;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var allRegistrations = await _carRepo.GetAll<Registration>();
            var allRegistrationsDto = _mapper.Map<IEnumerable<RegistrationInfoDto>>(allRegistrations);

            return Ok(allRegistrationsDto);
        }

        [HttpGet("getRegistrationsForCurrentUser")]
        public async Task<IActionResult> GetRegsForCurrentUser()
        {
            var currentUser = await _userManager.FindByNameAsync(User.Identity.Name);

            List<Registration> usersRegistrations = new List<Registration>();

            foreach (var car in currentUser.MyCars)
            {
                usersRegistrations.AddRange(car.Registrations);
            }

            var usersRegistrationsDto = _mapper.Map<IEnumerable<RegistrationInfoDto>>(usersRegistrations);

            return Ok(usersRegistrationsDto);
        }

        [HttpGet("getRegistrationsForCar/{carId}")]
        public async Task<IActionResult> GetRegistrationsForCar(int carId)
        {
            if (!User.IsAuthenticated())
            {
                return Unauthorized();
            }
            var carFromDb = await _carRepo.GetById<Car>(carId);
            var registrationsForCar = carFromDb.Registrations;

            var registrationsDto = _mapper.Map<IEnumerable<RegistrationInfoDto>>(registrationsForCar);

            return Ok(registrationsDto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewRegistrationEntry(RegistrationCreateDto registrationCreateDto)
        {
            var registrationToCreate = _mapper.Map<Registration>(registrationCreateDto);

            _carRepo.Add(registrationToCreate);

            if(await _carRepo.SaveAll())
            {
                return Ok("Registracija je upisana!");
            }
            else
            {
                return BadRequest("Greška prilikom upisa podataka o registraciji!");
            }

        }
    }
}
