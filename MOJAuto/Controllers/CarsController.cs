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
    public class CarsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMOJAutoRepository _carRepo;
        private readonly UserManager<ApplicationUser> _userManager;

        public CarsController(IMapper mapper, IMOJAutoRepository carRepo, UserManager<ApplicationUser> userManager)
        {
            _mapper = mapper;
            _carRepo = carRepo;
            _userManager = userManager;
        }

        [HttpGet("getAllCars")]
        public async Task<IActionResult> GetAllCars()
        {
            var allCars = await _carRepo.GetAll<Car>();
            var allCarsDto = _mapper.Map<IEnumerable<CarInfoDto>>(allCars);

            return Ok(allCarsDto);
        }

        [HttpGet("getCarsForUser")]
        public async Task<IActionResult> GetCarsForUser()
        {
            var currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            var usersCars = _mapper.Map<IEnumerable<CarInfoDto>>(currentUser.MyCars);

            return Ok(usersCars);
        }

        [HttpPost("addCar")]
        public async Task<IActionResult> AddCar(CarCreateDto carCreateDto)
        {
            var currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            var carToCreate = _mapper.Map<Car>(carCreateDto);

            currentUser.MyCars.Add(carToCreate);

            if(await _carRepo.SaveAll()){
                return Ok("Created!");
            }
            else
            {
                return BadRequest("Error happened while adding new Car!");
            }
        }
    }
}
