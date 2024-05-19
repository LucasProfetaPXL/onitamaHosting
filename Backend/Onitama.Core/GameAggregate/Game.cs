﻿using Onitama.Core.GameAggregate.Contracts;
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

    private Guid _winnerPlayerId;
    private string _winnerMethod;
    private bool _gameOver = false;

    public Guid Id => _id;

    public IPlayMat PlayMat => _playMat;

    public IMoveCard ExtraMoveCard => _extraMoveCard;

    public IPlayer[] Players => _players;

    public Guid PlayerToPlayId => _players[_currentplayernr].Id;

    public Guid WinnerPlayerId => _players[_currentplayernr].Id;

    public string WinnerMethod => _winnerMethod;

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
        IPlayer currentPlayer = null;
        bool inPossession = false;
        IPawn currentPawn = null;
        IMoveCard currentcard = null;
        if (PlayerToPlayId != playerId)
        {
            throw new InvalidOperationException("player");
        }


        foreach (var player in _players)
        {
            if (playerId == player.Id)
            {
                currentPlayer = player;
            }
        }
        foreach (var card in currentPlayer.MoveCards)
        {
            if (moveCardName == card.Name)
            {
                inPossession = true;
                currentcard = card;
                break;
            }
        }
        if (inPossession == false)
        {
            throw new ApplicationException("card");
        }

        foreach(var pawn in currentPlayer.School.AllPawns) 
        {
            if (pawn.Id == pawnId)
            {
                currentPawn = pawn;
            }
        }


        return _playMat.GetValidMoves(currentPawn, currentcard, currentPlayer.Direction);

        //IMoveCard currentMoveCard = null;
        //IReadOnlyList<ICoordinate> coordinateList = null;
        //IPawn currentPawn = null;
        List<IMove> moveList = new List<IMove>();



        //foreach (var player in _players)
        //{
        //    if (player.Id == playerId)
        //    {
        //        currentPlayer = player;
        //        currentPawn = currentPlayer.School.GetPawn(currentPlayer.Id);
        //    }
        //}
        //foreach (var moveCard in currentPlayer.MoveCards)
        //{
        //    if (moveCard.Name == moveCardName)
        //    {
        //        currentMoveCard = moveCard;
        //    }
        //}
        //for (int i = 0; i < currentPlayer.School.AllPawns.Length; i++)
        //{
        //    if (currentPlayer.School.AllPawns[i].Id == pawnId)
        //    {
        //        coordinateList = currentMoveCard.GetPossibleTargetCoordinates(currentPlayer.School.AllPawns[i].Position, currentPlayer.Direction, _playMat.Size);
        //    }
        //}
        //for (int i = 0; i < coordinateList.Count; i++)
        //{
        //    moveList.Add(new Move(currentMoveCard, currentPawn, currentPlayer.Direction, coordinateList[i]));
        //}
        return moveList;
        throw new NotImplementedException();
    }

    public IReadOnlyList<IMove> GetAllPossibleMovesFor(Guid playerId)
    {
        IPlayer currentPlayer = null;
        List<IMove> moveList = new List<IMove>();
        IReadOnlyList<IMove> movesForPawn = null;
        foreach (var player in _players) 
        {
            if (player.Id == playerId)
            {
                currentPlayer = player;
            }
        }
        foreach (var moveCard in currentPlayer.MoveCards)
        {
            for (int i = 0; i < currentPlayer.School.AllPawns.Length; i++)
            {
                movesForPawn = GetPossibleMovesForPawn(currentPlayer.Id, currentPlayer.School.AllPawns[i].Id, moveCard.Name);
                for (int j = 0; j < movesForPawn.Count; j++)
                {
                    moveList.Add(movesForPawn[j]);
                }
            }
        }
        return moveList;
        throw new NotImplementedException();
    }

    public void MovePawn(Guid playerId, Guid pawnId, string moveCardName, ICoordinate to)
    {
        if (_gameOver)
        {
            throw new ApplicationException("The game is already over!");
        }

        if (playerId != _players[_currentplayernr].Id)
        {
            throw new ApplicationException("It's not your turn!");
        }

        IPlayer currentPlayer = _players[_currentplayernr];
        IPawn pawn = currentPlayer.School.AllPawns.FirstOrDefault(p => p.Id == pawnId);
        if (pawn == null)
        {
            throw new ApplicationException("Pawn not found!");
        }

        IMoveCard card = currentPlayer.MoveCards.FirstOrDefault(c => c.Name == moveCardName);
        if (card == null)
        {
            throw new ApplicationException("Move card not found!");
        }

        // Log de huidige status en parameters
        Console.WriteLine($"Current player: {currentPlayer.Id}");
        Console.WriteLine($"Pawn ID: {pawnId}");
        Console.WriteLine($"Move card: {moveCardName}");
        Console.WriteLine($"Target coordinate: {to}");

        // Controleer mogelijke doelcoördinaten
        var possibleTargets = card.GetPossibleTargetCoordinates(pawn.Position, currentPlayer.Direction, _playMat.Size);
        Console.WriteLine("Possible targets: " + string.Join(", ", possibleTargets.Select(c => c.ToString())));

        if (!possibleTargets.Contains(to))
        {
            Console.WriteLine("Invalid move: Target coordinate is not in the possible targets.");
            throw new ApplicationException("Invalid move!");
        }

        IMove move = new Move(card, pawn, currentPlayer.Direction, to);
        IPawn capturedPawn = null;
        _playMat.ExecuteMove(move, out capturedPawn);

        if (capturedPawn != null)
        {
            foreach (var opponent in _players.Where(p => p.Id != playerId))
            {
                if (opponent.School.AllPawns.Any(p => p.Id == capturedPawn.Id))
                {
                    _winnerPlayerId = playerId;
                    _winnerMethod = "WinningMoveByWayOfTheStone";
                    EndGame(new GameResult { WinnerPlayerId = _winnerPlayerId, WinningMethod = _winnerMethod });
                    return;
                }
            }
        }

        _currentplayernr = (_currentplayernr + 1) % _players.Length;
    }


    private void EndGame(GameResult result)
    {
        // Logica voor het beëindigen van het spel, zoals het printen van de winnaar,
        // het stoppen van verdere zetten, enz.
        Console.WriteLine($"Player {result.WinnerPlayerId} wins by {result.WinningMethod}!");
        _gameOver = true;  // Spel beëindigen door _gameOver in te stellen
    }

    public class GameResult
    {
        public Guid WinnerPlayerId { get; set; }
        public string WinningMethod { get; set; }
    }




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