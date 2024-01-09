using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
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
    }
}