using Onitama.Core.GameAggregate;
using Onitama.Core.GameAggregate.Contracts;
using Onitama.Core.MoveCardAggregate.Contracts;
using Onitama.Core.PlayerAggregate;
using Onitama.Core.PlayMatAggregate.Contracts;
using Onitama.Core.SchoolAggregate;
using Onitama.Core.SchoolAggregate.Contracts;
using System.Data.Common;
using Onitama.Core.Util;
using Onitama.Core.Util.Contracts;
using Onitama.Core.PlayerAggregate.Contracts;
using System.Drawing;

namespace Onitama.Core.PlayMatAggregate;

/// <inheritdoc cref="IPlayMat"/>
internal class PlayMat : IPlayMat
{
    private IPawn[,] _grid;
    private int _size;

    public PlayMat(IPlayer[] copiedPlayers)
    {
        _size = 5;
        _grid = new IPawn[_size, _size];
        foreach (var player in copiedPlayers)
        {
            PositionSchoolOfPlayer(player);
        }
    }
    /// <summary>
    /// Creates a play mat that is a copy of another play mat
    /// </summary>
    /// <param name="otherPlayMat">The play mat to copy</param>
    /// <param name="copiedPlayers">
    /// Copies of the players (with their school)
    /// that should be used to position pawn on the copy of the <paramref name="otherPlayMat"/>.</param>
    /// <remarks>
    /// This is an EXTRA. Not needed to implement the minimal requirements.
    /// To make the mini-max algorithm for an AI game play strategy work, this constructor should be implemented.
    /// </remarks>
    public PlayMat(IPlayMat otherPlayMat, IPlayer[] copiedPlayers) : this(copiedPlayers)
    {
        for (int row = 0; row < _size; row++)
        {
            for (int col = 0; col < _size; col++)
            {
                _grid[row, col] = otherPlayMat.Grid[row, col];
            }
        }
        foreach (var player in copiedPlayers)
        {
            PositionSchoolOfPlayer(player);
        }
        //throw new NotImplementedException("TODO: copy properties of other playmat");
    }

    public IPawn[,] Grid => _grid;

    public int Size => _size; //TODO make variable from 5

    public void ExecuteMove(IMove move, out IPawn capturedPawn)
    {   
        throw new NotImplementedException();
    }

    public IReadOnlyList<IMove> GetValidMoves(IPawn pawn, IMoveCard card, Direction playerDirection)
    {
        IReadOnlyList<ICoordinate> coordinateList = card.GetPossibleTargetCoordinates(pawn.Position, playerDirection, Size);
        List<IMove> moveList = new List<IMove>();
        for (int i = 0; i < coordinateList.Count; i++)
        {
            moveList.Add(new Move(card, pawn, playerDirection, coordinateList[i]));
        }
        return moveList;
        throw new NotImplementedException();
    }

    public void PositionSchoolOfPlayer(IPlayer player)
    {
        int row = player.Direction == Direction.North ? 0 : _size - 1;
        ISchool school = player.School;
        var pawns = school.AllPawns;
        IPawn masterPawn;
        IPawn student;
        for (int i = 0; i < pawns.Length; i++)
        {
            int column = i;
            if (column == 2)
            {
                masterPawn = pawns[i];
                ICoordinate masterPosition = new Coordinate(row, column);
                _grid[masterPosition.Row, masterPosition.Column] = masterPawn;
            }
            else
            {
                student = pawns[i];
                ICoordinate studentPosition = new Coordinate(row, column);
                _grid[studentPosition.Row, studentPosition.Column] = student;
            }
            pawns[i].Position = new Coordinate(row, column);
            //_grid[row, column] = pawns[i];
        }
    }
}