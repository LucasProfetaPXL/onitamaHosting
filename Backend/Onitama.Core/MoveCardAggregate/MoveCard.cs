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
    public string Name { get; }

    public MoveCardGridCellType[,] Grid  { get; }

    public Color StampColor { get; }

    public MoveCard(string name, MoveCardGridCellType[,] grid, Color stampColor)
    {
        Name = name;
        Grid = grid;
        StampColor = stampColor;
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
        //int targetX;
        //int targetY;

        //startCoordinate.RotateTowards(playDirection);

        ICoordinate playStartCoordinate = playDirection.GetStartCoordinate(matSize);

        //for (int row = 0; row < Grid.GetLength(0); row++)
        //{
        //    for (int col = 0; col < Grid.GetLength(1); col++)

        for (int row = 0; row < matSize; row++)
        {
            for (int col = 0; col < matSize; col++)
            {
                if (Grid[row, col] == MoveCardGridCellType.Target)
                {
                    coordinates.Add(new Coordinate(row, col));

                    //if (playDirection == Direction.North)
                    //{
                    //    targetY = playStartCoordinate.Row + row;
                    //    targetX = playStartCoordinate.Column + col - startCoordinate.Column;


                    //}
                    //else
                    //{
                    //    targetX = playStartCoordinate.Row + row;
                    //    targetY = playStartCoordinate.Column + col;
                    //}

                    //if (targetX >= 0 && targetX < matSize && targetY >= 0 && targetY < matSize)
                    //{
                    //    coordinates.Add(new Coordinate(targetX, targetY));
                    //}
                }
            }
        }
        return coordinates;
    }
}