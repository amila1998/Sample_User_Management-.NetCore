using Sample.UserManagement.Application.DTOs;
using Sample.UserManagement.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sample.UserManagement.Application
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        //Constructor Dependency Injection
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public void Register(UserDto user, List<ImageDto> image)
        {
            //Encrypt the password
            user.Password = EncryptPassword(user.Password);

            _userRepository.Register(user,image);
        }

        private static string EncryptPassword(string password)
        {
            // Generate a salt for the password hash
            string salt = BCrypt.Net.BCrypt.GenerateSalt();

            // Hash the password using the salt and bcrypt algorithm
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password, salt);

            return hashedPassword;
        }

        public User GetUserByEmail(string email)
        {
            return _userRepository.GetUserByEmail(email);
        }

        public User GetUserById(int userId)
        {
            return _userRepository.GetUserById(userId);
        }

        public User UpdateUser(User user)
        {
            return _userRepository.UpdateUser(user);
        }
        public IEnumerable<User> Search(string firstName, string lastName, DateTime? fromDateOfBirth, DateTime? toDateOfBirth, string gender)
        {
            // Perform the search operation by calling the corresponding method on the UserRepository
            return _userRepository.Search(firstName, lastName, fromDateOfBirth, toDateOfBirth, gender);
        }
    }
}
