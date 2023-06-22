using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sample.UserManagement.Application.DTOs
{
    public class UserRegistrationDto
    {
        public UserDto User { get; set; }
        public List<ImageDto> Images { get; set; }
    }
}
