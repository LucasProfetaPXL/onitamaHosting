using AutoMapper;
using Onitama.Core.GameAggregate.Contracts;

namespace Onitama.Api.Models.Output;

public class GameModel
{
    public Guid Id { get; set; }
    public PlayMatModel PlayMat { get; set; }

    public MoveCardModel ExtraMoveCard { get; set; }
    public PlayerModel[] Players { get; set; }

    public Guid PlayerToPlayId { get; set; }

    public Guid WinnerPlayerId { get; set; }

    public string WinnerMethod { get; set; }

    private class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<IGame, GameModel>();
            //CreateMap<IGame, GameModel>()
            //       .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            //       .ForMember(dest => dest.PlayMat, opt => opt.MapFrom(src => src.PlayMat))
            //       .ForMember(dest => dest.ExtraMoveCard, opt => opt.MapFrom(src => src.ExtraMoveCard))
            //       .ForMember(dest => dest.Players, opt => opt.MapFrom(src => src.Players.ToArray()))
            //       .ForMember(dest => dest.PlayerToPlayId, opt => opt.MapFrom(src => src.PlayerToPlayId))
            //       .ForMember(dest => dest.WinnerPlayerId, opt => opt.MapFrom(src => src.WinnerPlayerId))
            //       .ForMember(dest => dest.WinnerMethod, opt => opt.MapFrom(src => src.WinnerMethod));

        }
    }
}