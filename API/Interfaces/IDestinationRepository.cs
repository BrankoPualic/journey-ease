using API.DTOs;

namespace API.Interfaces
{
    public interface IDestinationRepository
    {
        Task<IEnumerable<SeasonDto>> GetSeasonsAsync();
    }
}