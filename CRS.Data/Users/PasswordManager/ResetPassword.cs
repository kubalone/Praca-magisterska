using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CRS.Data.Users.PasswordManager
{
    public class ResetPassword
    {
        [Required]
        [StringLength(100, ErrorMessage = "Hasło musi zawierać minimum 4 znaki", MinimumLength = 4)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Potwierdź hasło")]
        [Compare("Password", ErrorMessage = "Podane hasła nie pasują do siebie.")]
        public string ConfirmPassword { get; set; }

        public string Code { get; set; }
        public string userID { get; set; }
    }
}
