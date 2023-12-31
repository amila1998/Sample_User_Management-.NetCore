﻿using Sample.UserManagement.Domain;

namespace Sample.UserManagement.Application.DTOs
{
    public class UserDto
    {
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Remark { get; set; }
    }
}
