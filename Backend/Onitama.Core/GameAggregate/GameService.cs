using Onitama.Core.GameAggregate.Contracts;
using Onitama.Core.PlayerAggregate;
using Onitama.Core.PlayerAggregate.Contracts;
using Onitama.Core.SchoolAggregate;
using Onitama.Core.SchoolAggregate.Contracts;
using Onitama.Core.Util;
using Onitama.Core.Util.Contracts;

namespace Onitama.Core.GameAggregate;

internal class GameService : IGameService
{
    private readonly IGameRepository _gameRepository;
    public GameService(IGameRepository gameRepository)
    {
        _gameRepository = gameRepository;

    }

    public IGame GetGame(Guid gameId)
    {
        return _gameRepository.GetById(gameId);
        //throw new NotImplementedException("TODO: use the constructor-injected repository to retrieve a game");
    }

    public IReadOnlyList<IMove> GetPossibleMovesForPawn(Guid gameId, Guid playerId, Guid pawnId, string moveCardName)
    {
        var game = _gameRepository.GetById(gameId);
        if(game == null)
        {
            throw new ArgumentException("game id not found");
        }
        var possibleMoves = game.GetAllPossibleMovesFor(pawnId);
        return possibleMoves;
        

        //throw new NotImplementedException(
        //    "TODO: use the constructor-injected repository to retrieve the game and get the possible moves of that game");
    }

    public void MovePawn(Guid gameId, Guid playerId, Guid pawnId, string moveCardName, ICoordinate to)
    {
        //implemented in game.cs
        for (int i = 0; i < _gameRepository.GetById(gameId).GetPossibleMovesForPawn(playerId, pawnId, moveCardName).Count; i++)
        {
            if (_gameRepository.GetById(gameId).GetPossibleMovesForPawn(playerId, pawnId, moveCardName)[i] == to)
            {
                for (int j = 0; j < _gameRepository.GetById(gameId).Players.Length; j++)
                {
                    if (_gameRepository.GetById(gameId).Players[j].Id == playerId)
                    {
                        _gameRepository.GetById(gameId).Players[j].School.GetPawn(pawnId).Position = to;
                    }
                }
                break;
            }
        }

        //throw new NotImplementedException(
            //"TODO: use the constructor-injected repository to retrieve the game and get move a pawn of that game");
    }

    public void SkipMovementAndExchangeCard(Guid gameId, Guid playerId, string moveCardName)
    {
        // implemented in Game.cs
        throw new NotImplementedException(
            "TODO: use the constructor-injected repository to retrieve the game and skip a movement for that game");
    }
}