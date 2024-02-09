using API.DTOs;

namespace API.Interfaces
{
    public interface IFaqRepository
    {
        Task<IEnumerable<FaqDto>> GetFaqsAsync();
    }
}