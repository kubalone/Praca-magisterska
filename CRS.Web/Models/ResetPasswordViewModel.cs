using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CRS.Web.Models
{
    public class ResetPasswordViewModel
    {
        [Required]
        [StringLength(100, ErrorMessage = "Hasło musi zawierać minimum 4 znaki", MinimumLength = 4)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Potwierdź hasło")]
        [Compare("Password", ErrorMessage = "Podane hasła nie pasują do siebie.")]
        public string ConfirmPassword { get; set; }

        public string Token { get; set; }
        public string UserID { get; set; }
    }
}
