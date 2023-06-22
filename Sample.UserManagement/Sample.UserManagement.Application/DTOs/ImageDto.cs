using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sample.UserManagement.Application.DTOs
{
    public class ImageDto
    {
        public int ImageId { get; set; }

        public string ImagePath { get; set; }
    }
}
