using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly DataContext _context;

        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, IMapper mapper, DataContext context)
        {
            _context = context;
            _tokenService = tokenService;
            _userManager = userManager;
            _mapper = mapper;  
        }

        [HttpPost("signup")]
        public async Task<ActionResult<UserDto>> Signup(SignupDto signupDto)
        {
            if(await UserExist(signupDto.Email)) return BadRequest(new { message = "Account with this email already exists."});

            if(signupDto.Password != signupDto.ConfirmPassword) return BadRequest(new { message = "Password and confirmation password do not match."});

            var user = _mapper.Map<AppUser>(signupDto);

            user.UserName = $"{user.FirstName.ToLower()}{user.LastName.ToLower()}{user.Id}";

            user.Id = await _context.Users.MaxAsync(u => u.Id) + 1;

            var result = await _userManager.CreateAsync(user, signupDto.Password);

            if(!result.Succeeded) return BadRequest(new { message = result.Errors });

            var roleResults = await _userManager.AddToRoleAsync(user, "Member");

            if(!roleResults.Succeeded) return BadRequest(new { message = result.Errors });

            return new UserDto
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = await _tokenService.CreateToken(user)
            };
        }

        [HttpPost("signin")]
        public async Task<ActionResult<UserDto>> Signin(SigninDto signinDto)
        {
            AppUser user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == signinDto.Email);

            if(user == null) return Unauthorized(new { message = "Invalid email"});

            var result = await _userManager.CheckPasswordAsync(user, signinDto.Password);

            if(!result) return Unauthorized(new { message = "Invalid password"});

            return new UserDto
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserImage = user.UserImage,
                Token = await _tokenService.CreateToken(user)
            };
        }
        
        public async Task<bool> UserExist(string email)
        {
            return await _userManager.Users.AnyAsync(u => u.Email == email);
        }
    }
}