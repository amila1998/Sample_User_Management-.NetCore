using Sample.UserManagement.Application.DTOs;
using Sample.UserManagement.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sample.UserManagement.Application
{
    public interface IUserService
    {
        //User Register(UserDto user);
        public void Register(UserDto user, List<ImageDto> image);
        User GetUserByEmail(string email);
        User GetUserById(int userId);
        User UpdateUser(User user);
        IEnumerable<User> Search(string firstName, string lastName, DateTime? fromDateOfBirth, DateTime? toDateOfBirth, string gender);
    }
}
