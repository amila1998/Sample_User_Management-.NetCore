using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Sample.UserManagement.Application;
using Sample.UserManagement.Application.DTOs;
using Sample.UserManagement.Domain;
using Sample.UserManagement.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;
using Image = Sample.UserManagement.Domain.Image;

namespace Sample.UserManagement.Infrastructure
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManagementDbContext _dbContext;
        private readonly ILogger<UserRepository> _logger;
        private readonly IConfiguration _configuration;

        public UserRepository(UserManagementDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }


        //public User Register(User user)
        //{
        //    // Check if the email already exists in the database
        //    if (_dbContext.Users.Any(u => u.Email == user.Email))
        //    {
        //        throw new Exception("Email already exists."); // You can throw a specific exception or handle the duplicate email case as per your requirements.
        //    }

        //    // Add the user to the database
        //    _dbContext.Users.Add(user);
        //    _dbContext.SaveChanges();
        //    return user;
        //}

        public void Register(UserDto userDto, List<ImageDto> imagesDto)
        {
            // Check if the email already exists in the database
            if (_dbContext.Users.Any(u => u.Email == userDto.Email))
            {
                throw new Exception("Email already exists."); // You can throw a specific exception or handle the duplicate email case as per your requirements.
            }

            // Map the UserDto to the User entity
            // Map the UserDto to the User entity
            var newUser = new User
            {
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                DateOfBirth = userDto.DateOfBirth,
                Gender = userDto.Gender,
                Email = userDto.Email,
                Password = userDto.Password,
                Remark = userDto.Remark,

            };

            // Map each ImageDto to the Image entity and associate them with the user
            foreach (var imageDto in imagesDto)
            {
                var newImage = new Image
                {
                    ImagePath = imageDto.ImagePath,
                    // Map other image properties as needed
                };

                newUser.Images.Add(newImage);
            }


            // Add the user to the database
            _dbContext.Users.Add(newUser);
            _dbContext.SaveChanges();
        }

        public User GetUserByEmail(string email)
        {
            return _dbContext.Users.FirstOrDefault(u => u.Email == email);
        }

        public User GetUserById(int userId)
        {
            return _dbContext.Users.FirstOrDefault(u => u.UserId == userId);
        }

        public User UpdateUser(User user)
        {
            _dbContext.Entry(user).State = EntityState.Modified;
            _dbContext.SaveChanges();
            return user; 
        }

        public IEnumerable<User> Search(string firstName, string lastName, DateTime? fromDateOfBirth, DateTime? toDateOfBirth, string gender)
        {
            var query = _dbContext.Set<User>().AsQueryable();

            if (!string.IsNullOrEmpty(firstName))
                query = query.Where(u => u.FirstName.Contains(firstName));

            if (!string.IsNullOrEmpty(lastName))
                query = query.Where(u => u.LastName.Contains(lastName));

            if (fromDateOfBirth.HasValue)
                query = query.Where(u => u.DateOfBirth >= fromDateOfBirth.Value);

            if (toDateOfBirth.HasValue)
                query = query.Where(u => u.DateOfBirth <= toDateOfBirth.Value);

            if (!string.IsNullOrEmpty(gender))
                query = query.Where(u => u.Gender == gender);

            return query.ToList();
        }

    
    }

}
