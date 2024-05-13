using Onitama.Core.GameAggregate.Contracts;
using Onitama.Core.PlayerAggregate.Contracts;
using Onitama.Core.SchoolAggregate.Contracts;

namespace Onitama.Core.GameAggregate;

/// <inheritdoc cref="IGameEvaluator"/>
internal class GameEvaluator : IGameEvaluator
{
    public int CalculateScore(IGame game, Guid maximizingPlayerId)
    {
        int maximizingPlayerInGame = 0;
        int otherPlayer = 0;
        for (int i = 0; i < game.Players.Length; i++)
        {
            if (!(game.Players[i].Id == maximizingPlayerId))
            {
                otherPlayer = i;
            }
            else
            {
                maximizingPlayerInGame = i;
            }
        }
        return game.Players[maximizingPlayerInGame].School.AllPawns.Length - game.Players[otherPlayer].School.AllPawns.Length;
        
        throw new NotImplementedException();
    }
}