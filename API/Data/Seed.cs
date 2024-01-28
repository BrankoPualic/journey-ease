using System.Text.Json;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if(await userManager.Users.AnyAsync()) return;

            string userData = await File.ReadAllTextAsync("Data/Seeds/UserSeedData.json");

            List<AppUser> users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            var roles = new List<AppRole>
            {
                new() {Name = "Member"},
                new() {Name = "Moderator"},
                new() {Name = "Admin"},
            };

            foreach(var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach(var user in users)
            {
                user.UserName = user.UserName.ToLower();
                user.RegisterDate = user.RegisterDate.ToUniversalTime();

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");
                
            }

            AppUser admin = new()
            {
                Id = 9,
                UserName = "admin",
                Email = "adminBO@gmail.com"
            };
            
            try{

            var result = await userManager.CreateAsync(admin, "Pa$$w0rd");
            if(result.Succeeded){
            await userManager.AddToRoleAsync(admin, "Admin");

            } else{
                Console.WriteLine($"{result.Errors}");
            }
            } catch(Exception ex){Console.WriteLine($"{ex}");}
            
        }
        public static async Task SeedCountries(DataContext context)
        {
            if(await context.Countries.AnyAsync()) return;

            string countryData = await File.ReadAllTextAsync("Data/Seeds/CountrySeedData.json");

            List<Country> countries = JsonSerializer.Deserialize<List<Country>>(countryData);

            foreach(Country country in countries)
            {
                context.Countries.Add(country);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedSeasons(DataContext context)
        {
            if(await context.Seasons.AnyAsync()) return;

            string seasonData = await File.ReadAllTextAsync("Data/Seeds/SeasonSeedData.json");

            List<Season> seasons = JsonSerializer.Deserialize<List<Season>>(seasonData);

            foreach(Season season in seasons)
            {
                context.Seasons.Add(season);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedBlog(DataContext context)
        {
            if(await context.Blog.AnyAsync()) return;

            string blogData = await File.ReadAllTextAsync("Data/Seeds/PostSeedData.json");

            List<Post> blog = JsonSerializer.Deserialize<List<Post>>(blogData);

            foreach (Post post in blog)
            {
                post.PostDate = post.PostDate.ToUniversalTime();
                context.Blog.Add(post);
            }

            await context.SaveChangesAsync();
        }
        
        public static async Task SeedBlogComments(DataContext context)
        {
            if(await context.BlogComments.AnyAsync()) return;

            string blogCommentsData = await File.ReadAllTextAsync("Data/Seeds/PostCommentSeedData.json");

            List<PostComment> blogComments = JsonSerializer.Deserialize<List<PostComment>>(blogCommentsData);

            foreach(PostComment comment in blogComments)
            {
                comment.CommentDate = comment.CommentDate.ToUniversalTime();
                context.BlogComments.Add(comment);
            }

            await context.SaveChangesAsync();
        }
    }
}