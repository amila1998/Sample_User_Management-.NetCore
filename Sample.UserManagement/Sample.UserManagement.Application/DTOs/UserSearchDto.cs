namespace Sample.UserManagement.Application.DTOs
{
    public class UserSearchDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? FromDateOfBirth { get; set; }
        public DateTime? ToDateOfBirth { get; set; }
        public string Gender { get; set; }
    }
}
