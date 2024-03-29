using API.Data;
using API.Entities;
using API.Extensions;
using API.Middleware;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Load environment variables from .env file
DotNetEnv.Env.Load();

// Replace placeholder values in configuration with environment variables
ReplacePlaceHoldersWithEnv(builder.Configuration.GetSection("CloudinarySettings"));

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();

app.UseCors(builder => builder
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()
    .WithOrigins("https://localhost:4200"));

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var services =  scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    var roleManager = services.GetRequiredService<RoleManager<AppRole>>();

    await context.Database.MigrateAsync();
    await Seed.SeedCountries(context);
    await Seed.SeedSeasons(context);
    await Seed.SeedUsers(userManager, roleManager);
    await Seed.SeedBlog(context);
    await Seed.SeedFaqs(context);
    await Seed.SeedBlogComments(context);
}
catch(Exception ex)
{
    var logger = services.GetService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

void ReplacePlaceHoldersWithEnv(IConfigurationSection section)
{
    foreach(var child in section.GetChildren())
    {
        var value = System.Environment.GetEnvironmentVariable(child.Key);
        if(!string.IsNullOrEmpty(value))
        {
            section[child.Key] = value;
        }
    }
}

app.Run();
