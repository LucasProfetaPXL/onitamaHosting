using System.Drawing;
using System.Text.RegularExpressions;
using Onitama.Core.MoveCardAggregate.Contracts;
using Onitama.Core.SchoolAggregate;
using Onitama.Core.SchoolAggregate.Contracts;
using Onitama.Core.Util;
using Onitama.Core.Util.Contracts;

namespace Onitama.Core.MoveCardAggregate;

/// <inheritdoc cref="IMoveCard"/>
internal class MoveCard : IMoveCard
{
    private MoveCardGridCellType[,] _cellType;
    private Color _color;
    public string Name { get; }

    public MoveCardGridCellType[,] Grid => _cellType;

    public Color StampColor => _color;

    public MoveCard(string name, MoveCardGridCellType[,] grid, Color stampColor)
    {
        Name = name;
        _cellType = grid;
        _color = stampColor;
    }

    //Do not change this method, it makes sure that two MoveCard instances are equal if their names are equal
    public override bool Equals(object obj)
    {
        if (obj is null) return false;
        return obj is IMoveCard other && Equals(other);
    }

    //Do not change this method
    protected bool Equals(IMoveCard other)
    {
        return Name == other.Name;
    }

    //Do not change this method
    public override int GetHashCode()
    {
        return (Name != null ? Name.GetHashCode() : 0);
    }

    public IReadOnlyList<ICoordinate> GetPossibleTargetCoordinates(ICoordinate startCoordinate, Direction playDirection, int matSize)
    {
        List<ICoordinate> coordinates = new List<ICoordinate>();

        _cellType[startCoordinate.Row, startCoordinate.Column] = MoveCardGridCellType.Start;

        for (int row = 0; row < matSize; row++)
        {
            for (int col = 0; col < matSize; col++)
            {
                ICoordinate newcord = new Coordinate(row, col);
                ICoordinate rotatedCord = newcord.RotateTowards(playDirection);

                if (_cellType[rotatedCord.Row,rotatedCord.Column] == MoveCardGridCellType.Target)
                {
                    coordinates.Add(rotatedCord);
                }
            }
        }
        return coordinates;
    }
}