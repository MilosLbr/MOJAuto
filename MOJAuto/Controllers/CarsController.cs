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
        public async Task<IActionResult> AddCar(CarCreateEditDto carCreateDto)
        {
            if (!User.IsAuthenticated())
            {
                return Unauthorized();
            }

            var currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            var carToCreate = _mapper.Map<Car>(carCreateDto);

            currentUser.MyCars.Add(carToCreate);

            if(await _carRepo.SaveAll() > 0){
                var toReturn = _mapper.Map<CarInfoDto>(carToCreate);
                return Ok(toReturn);
            }
            else
            {
                return BadRequest("Dogodila se greška prilikom upisivanja novog automobila!");
            }
        }
        
        [HttpPut("editCar")]
        public async Task<IActionResult> EditCar(CarCreateEditDto carCreateEditDto)
        {
            if (!User.IsAuthenticated())
            {
                return Unauthorized();
            }

            var currentUser = await _userManager.FindByNameAsync(User.Identity.Name);            
            var carFromDb = currentUser.MyCars.FirstOrDefault(c => c.Id == carCreateEditDto.Id);
            carCreateEditDto.ApplicationUserId = currentUser.Id;

            if (carFromDb == null)
            {
                return BadRequest($"Nije pronađen automobil sa ID brojem {carCreateEditDto.Id}");
            }

            _mapper.Map<CarCreateEditDto, Car>(carCreateEditDto, carFromDb);

            if(await _carRepo.SaveAll() >= 0)
            {
                var toReturn = _mapper.Map<CarInfoDto>(carFromDb);
                return Ok(toReturn);
            }
            else
            {
                return BadRequest($"Desila se greška prilikom izmene automobila {carCreateEditDto.Id}");
            }
        }

        [HttpDelete("deleteCar/{carId}")]
        public async Task<IActionResult> DeleteCar(int carId)
        {
            var carFromDb = await _carRepo.GetById<Car>(carId);

            if (carFromDb == null)
            {
                return BadRequest($"Nije pronađen automobil sa ID brojem {carId}");
            }

            _carRepo.Delete<Car>(carFromDb);

            if(await _carRepo.SaveAll() > 0)
            {
                var toReturn = _mapper.Map<CarInfoDto>(carFromDb);
                return Ok(toReturn);
            }
            else
            {
                return BadRequest($"Greška prilikom brisanja automobila sa ID brojem {carId}");
            }
        }
    }
}
