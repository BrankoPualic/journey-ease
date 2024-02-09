using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Country, CountryDto>();
            CreateMap<CountryDto, Country>();
            CreateMap<Season, SeasonDto>();
            CreateMap<Post, PostDto>();
            CreateMap<Faq, FaqDto>();
        }
    }
}