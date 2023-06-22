using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sample.UserManagement.Application
{
    public interface ITokenGenerator
    {
        string GenerateToken(int userId);
    }
}
