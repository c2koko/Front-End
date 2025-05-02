using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace YourNamespace.Services
{
    public class UserService
    {
        private readonly YourDbContext _context;

        public UserService(YourDbContext context)
        {
            _context = context;
        }

        public async Task<string> LoginUserAsync(UserLoginDto userDto)
        {
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userDto.Email);

            if (user == null)
            {
                throw new UnauthorizedAccessException();
            }

            bool isAuthenticated = false;

            // First check if it's a plain text password
            if (user.PasswordHash == userDto.Password)
            {
                isAuthenticated = true;
                // Update to hashed password for future logins
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password);
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
            }
            else
            {
                try
                {
                    // Only try BCrypt verification if the stored hash looks like a BCrypt hash
                    if (user.PasswordHash.StartsWith("$2")) 
                    {
                        isAuthenticated = BCrypt.Net.BCrypt.Verify(userDto.Password, user.PasswordHash);
                    }
                }
                catch
                {
                    // If BCrypt verification fails, the hash might be invalid
                    isAuthenticated = false;
                }
            }

            if (!isAuthenticated)
            {
                throw new UnauthorizedAccessException();
            }

            return await GenerateToken(user);
        }

        private async Task<string> GenerateToken(User user)
        {
            // Implementation of GenerateToken method
            throw new NotImplementedException();
        }
    }
} 