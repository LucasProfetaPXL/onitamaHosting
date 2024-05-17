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
    private IMoveCard _moveCard;
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

        // Vind de speler die aan de beurt is
        IPlayer currentPlayer = _players[_currentplayernr];

        // Vind de pion die verplaatst wordt
        IPawn pawn = null;
        foreach (var p in currentPlayer.School.AllPawns)
        {
            if (p.Id == pawnId)
            {
                pawn = p;
                break;
            }
        }

        if (pawn == null)
        {
            throw new ApplicationException("Pawn not found!");
        }

        // Vind de bijbehorende move card
        IMoveCard card = null;
        foreach (var c in currentPlayer.MoveCards)
        {
            if (c.Name == moveCardName)
            {
                card = c;
                break;
            }
        }

        if (card == null)
        {
            throw new ApplicationException("Move card not found!");
        }

        // Maak een nieuwe Move
        IMove move = new Move(card);

        // Voer de zet uit
        IPawn capturedPawn;
        _playMat.ExecuteMove(move, out capturedPawn);

        // Controleer of de master-pion van de tegenstander is veroverd
        foreach (var opponent in _players.Where(p => p.Id != playerId))
        {
            if (opponent.School.Master.Id == capturedPawn?.Id)
            {
                // Tegenstander’s master-pion is veroverd
                _winnerPlayerId = playerId;
                _winnerMethod = "WinningMoveByWayOfTheStone";

                // Spel beëindigen
                EndGame(new GameResult { WinnerPlayerId = _winnerPlayerId, WinningMethod = _winnerMethod });
                return;
            }
        }

        // Wissel van speler
        _currentplayernr = (_currentplayernr + 1) % _players.Length;
    }

    private void EndGame(GameResult result)
    {
        // Logica voor het beëindigen van het spel, zoals het printen van de winnaar,
        // het stoppen van verdere zetten, enz.
        Console.WriteLine($"Player {result.WinnerPlayerId} wins by {result.WinningMethod}!");
        //_gameOver = true;
    }

    public class GameResult
    {
        public Guid WinnerPlayerId { get; set; }
        public string WinningMethod { get; set; }
    }

    // Properties for storing the winner
    private Guid _winnerPlayerId;
    private string _winnerMethod;




    //var position = new MoveCardGridCellType[to.Column, to.Row];
    //var moveCard = new MoveCard(moveCardName, position, Color.Red);

    //Construct an IMove object based on the provided parameters
    //IMove move = new Move(pawnId, to, moveCard);

    //Call ExecuteMove on the play mat with the constructed IMove object
    //_playMat.ExecuteMove(move, out _);


    public void SkipMovementAndExchangeCard(Guid playerId, string moveCardName)
    {
        if (!(_players[_currentplayernr].Id == playerId))
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