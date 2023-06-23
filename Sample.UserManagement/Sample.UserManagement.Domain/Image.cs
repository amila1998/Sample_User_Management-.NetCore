using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sample.UserManagement.Domain
{
    public class Image
    {
        [Key]
        public int ImageId { get; set; }

        [Required]
        [ForeignKey("User")]
        public int UserId { get; set; }

        [Required]
        public string ImagePath { get; set; }
        [Required]
        public int ImagePriority { get; set; }


        public User User { get; set; }
    }
}
