using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ICountryRepository
    {
        Task<IEnumerable<CountryDto>> GetCountriesAsync();
        Task<Country> GetCountry(int countryId);
        void AddCountry(string countryName);
        void RemoveCountry(Country country);
        void UpdateCountry(Country country);
    }
}