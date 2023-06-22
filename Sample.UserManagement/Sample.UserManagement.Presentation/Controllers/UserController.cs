using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sample.UserManagement.Application;
using Sample.UserManagement.Application.DTOs;
using Sample.UserManagement.Domain;
using System.Security.Claims;

namespace Sample.UserManagement.Presentation.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
        private readonly IAuthenticationService _authenticationService;

        public UserController(IUserService service, IAuthenticationService authenticationService)
        {
            _service = service;
            _authenticationService = authenticationService;
        }

        [HttpPost("register")]
        public ActionResult RegisterUser([FromBody] UserRegistrationDto registrationDto)
        {
            try
            {
                UserDto userDto = registrationDto.User;
                List<ImageDto> imagesDto = registrationDto.Images;

                _service.Register(userDto, imagesDto);
                return Ok("Successfully Registered !!!");
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }            
        }

        [HttpPost("login")]
        public ActionResult LoginUser(string email, string password)
        {
            try
            {
                var token = _authenticationService.Authenticate(email, password);
                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPut("update")]
        public IActionResult Update(User req)
        {
            try
            {
                var userId = GetUserIdFromToken();
                var user = _service.GetUserById(userId);

                if (user == null)
                {
                    return NotFound(new { Error = "User not found" });
                }
                var updatedUser = _service.UpdateUser(user);
                return Ok(updatedUser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("search")]
        public IActionResult SearchUsers([FromQuery] UserSearchDto searchDto)
        {
            // Perform the search operation using the UserService
            var users = _service.Search(searchDto.FirstName, searchDto.LastName, searchDto.FromDateOfBirth, searchDto.ToDateOfBirth, searchDto.Gender);

            // Return the list of users as a response
            return Ok(users);
        }

        private int GetUserIdFromToken()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userIdClaim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                throw new Exception("Invalid user ID in token");
            }

            return userId;
        }
    }
}
