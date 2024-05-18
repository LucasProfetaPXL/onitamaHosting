using Onitama.Core.GameAggregate.Contracts;
using Onitama.Core.MoveCardAggregate;
using Onitama.Core.MoveCardAggregate.Contracts;
using Onitama.Core.PlayerAggregate;
using Onitama.Core.PlayerAggregate.Contracts;
using Onitama.Core.PlayMatAggregate;
using Onitama.Core.PlayMatAggregate.Contracts;
using Onitama.Core.SchoolAggregate;
using Onitama.Core.SchoolAggregate.Contracts;
using Onitama.Core.Util;
using Onitama.Core.Util.Contracts;
using System.Drawing;

namespace Onitama.Core.GameAggregate;

/// <inheritdoc cref="IGame"/>
internal class Game : IGame
{
    private Guid _id;
    private IPlayMat _playMat;
    private IPlayer[] _players;
    private IMoveCard _extraMoveCard;
    private int _currentplayernr;

    public Guid Id => _id;

    public IPlayMat PlayMat => _playMat;

    public IMoveCard ExtraMoveCard => _extraMoveCard;

    public IPlayer[] Players => _players;

    public Guid PlayerToPlayId => _players[_currentplayernr].Id;

    public Guid WinnerPlayerId => _players[_currentplayernr].Id;

    public string WinnerMethod => throw new NotImplementedException();

    /// <summary>
    /// Creates a new game and determines the player to play first.
    /// </summary>
    /// <param name="id">The unique identifier of the game</param>
    /// <param name="playMat">
    /// The play mat
    /// (with the schools of the player already positioned on it)
    /// </param>
    /// <param name="players">
    /// The 2 players that will play the game
    /// (with 2 move cards each)
    /// </param>
    /// <param name="extraMoveCard">
    /// The fifth card used to exchange cards after the first move
    /// </param>
    public Game(Guid id, IPlayMat playMat, IPlayer[] players, IMoveCard extraMoveCard)
    {
        _id = id;
        _playMat = playMat;
        _players = players;
        _extraMoveCard = extraMoveCard;
        _currentplayernr = 0; // owner
    }

    /// <summary>
    /// Creates a game that is a copy of another game.
    /// </summary>
    /// <remarks>
    /// This is an EXTRA. Not needed to implement the minimal requirements.
    /// To make the mini-max algorithm for an AI game play strategy work, this constructor should be implemented.
    /// </remarks>
    public Game(IGame otherGame)
    {
        _id = otherGame.Id;
        _playMat = otherGame.PlayMat;
        _players = otherGame.Players;
        _extraMoveCard = otherGame.ExtraMoveCard;
        //throw new NotImplementedException("TODO: copy the properties of the other game");
        //Attention: the players should be copied, not just referenced
    }

    public IReadOnlyList<IMove> GetPossibleMovesForPawn(Guid playerId, Guid pawnId, string moveCardName)
    {
        Direction playDirection = Direction.North;
        Color playercolor = Color.AliceBlue;      

        IMoveCard moveCard;
        IMoveCardRepository moveCardRepository;
        //IMoveCard card;
        // startcoordinate
        // playdirection
        //matsize
        for (int i = 0; i < _players.Length; i++)
        {
            if (_players[i].Id == playerId)
            {
                playDirection = _players[i].Direction;
                playercolor = _players[i].Color;
            }
        }

        //for (int i = 0; i < moveCardRepository.LoadSet(MoveCardSet.Original, _players[].Color); i++)
        //{
        //    if (moveCardRepository[i].Name == moveCardName)
        //    {

        //    }
        //}
        //moveCard = new MoveCard(moveCardName, moveCard., playercolor);
        
        
        //_playMat.GetValidMoves(pawnId, moveCard , playDirection);

        //MoveCard.GetPossibleTargetCoordinates();
        throw new NotImplementedException();
    }

    public IReadOnlyList<IMove> GetAllPossibleMovesFor(Guid playerId)
    {
        throw new NotImplementedException();
    }

    public void MovePawn(Guid playerId, Guid pawnId, string moveCardName, ICoordinate to)
    {

        if (playerId != _players[_currentplayernr].Id)
        {
            throw new ApplicationException("It's not your turn!");
        }

        _currentplayernr = (_currentplayernr + 1) % _players.Count();
        throw new NotImplementedException();

        IPlayer opponent = _players.FirstOrDefault(player => player.Id != playerId);
        if (opponent != null && opponent.School.Master.Id == pawnId)
        {
            //_winnerPlayerId = playerId;
            //_winnerMethod = "WinningMoveByWayOfTheStone";
        }

    }

    public void SkipMovementAndExchangeCard(Guid playerId, string moveCardName)
    {    
        if (!(PlayerToPlayId == playerId))
        {
            throw new ApplicationException("turn");
        }
        if (GetAllPossibleMovesFor(playerId).Count() == 0)
        {
            throw new ApplicationException("valid move");
        }
        for (int i = 0; i < _players.Length; i++)
        {
            if (_players[i].Id == playerId)
            {
                for (int j = 0; j < _players[i].MoveCards.Count; j++)
                {
                    if (_players[i].MoveCards[j].Name == moveCardName)
                    {
                        _players[i].MoveCards.RemoveAt(j);
                        _players[i].MoveCards.Insert(j,_extraMoveCard);
                        return;
                    }
                }
            }
        }
    }

    public IPlayer GetNextOpponent(Guid playerId) //extra
    {
        throw new NotImplementedException();
    }
}