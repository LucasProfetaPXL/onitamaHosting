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

        for (int row = 0; row < matSize; row++)
        {
            for (int col = 0; col < matSize; col++)
            {
                ICoordinate newcord = new Coordinate(row, col);
                ICoordinate rotatedCord = newcord.RotateTowards(playDirection);

                if (_cellType[row, col] == MoveCardGridCellType.Target)
                {
                    coordinates.Add(rotatedCord);
                }
            }
        }
        return coordinates;
        //List<ICoordinate> coordinates = new List<ICoordinate>();
        //int targetX;
        //int targetY;

        ////startCoordinate.RotateTowards(playDirection);
        //_cellType[startCoordinate.Row, startCoordinate.Column] = MoveCardGridCellType.Start;
        //_cellType[startCoordinate.RotateTowards(playDirection).Row, startCoordinate.RotateTowards(playDirection).Column] = MoveCardGridCellType.Start;


        ////startCoordinate.GetNeighbor(playDirection);

        ////startCoordinate = playDirection.GetStartCoordinate(matSize);

        ////for (int row = 0; row < Grid.GetLength(0); row++)
        ////{
        ////    for (int col = 0; col < Grid.GetLength(1); col++)

        //for (int row = 0; row < matSize; row++)
        //{
        //    for (int col = 0; col < matSize; col++)
        //    {
        //        targetX = row;
        //        targetY = col;
        //        //ICoordinate newcord = new Coordinate(targetY, targetY);
        //        ICoordinate newcord = new Coordinate(row, col);


        //        targetX = newcord.RotateTowards(playDirection).Row;
        //        targetY = newcord.RotateTowards(playDirection).Column;



        //        if (_cellType[row, col] == MoveCardGridCellType.Target)
        //        //if (Grid[row, col] == MoveCardGridCellType.Target)
        //        {
        //            //if (!(targetX == 0 && targetY == 0))
        //            //{
        //                coordinates.Add(new Coordinate(targetX, targetY));
        //            //}

        //            //if (playDirection == Direction.North)
        //            //{
        //            //    coordinates.Add(new Coordinate(row, col));

        //            //}
        //            //else if (playDirection == Direction.South)
        //            //{

        //            //    coordinates.Add(new Coordinate(matSize - row, matSize - col));

        //            //}
        //            //else if (playDirection == Direction.East)
        //            //{

        //            //    coordinates.Add(new Coordinate(-col, row));

        //            //}
        //            //else if (playDirection == Direction.West)
        //            //{

        //            //    coordinates.Add(new Coordinate(col, -row));

        //            //}
        //            //coordinates.Add(new Coordinate(row, col));

        //            //if (playDirection == Direction.North)
        //            //{
        //            //    targetY = playStartCoordinate.Row + row;
        //            //    targetX = playStartCoordinate.Column + col - startCoordinate.Column;


        //            //}
        //            //else
        //            //{
        //            //    targetX = playStartCoordinate.Row + row;
        //            //    targetY = playStartCoordinate.Column + col;
        //            //}

        //            //if (targetX >= 0 && targetX < matSize && targetY >= 0 && targetY < matSize)
        //            //{
        //            //    coordinates.Add(new Coordinate(targetX, targetY));
        //            //}
        //        }
        //    }
        //}
        //return coordinates;
    }
}