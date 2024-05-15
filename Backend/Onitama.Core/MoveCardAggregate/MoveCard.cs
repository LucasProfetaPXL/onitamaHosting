using System.Data;
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

<<<<<<< HEAD
        int mapTargetRow, mapTargetCol;
        int diffRow, diffCol;
=======
        //MoveCardGridCellType[,] newgrid = new MoveCardGridCellType[matSize, matSize];

        //_cellType[startCoordinate.Row, startCoordinate.Column] = MoveCardGridCellType.Empty;

        //startCoordinate.RotateTowards(playDirection);

        //_cellType[startCoordinate.RotateTowards(playDirection).Row, startCoordinate.RotateTowards(playDirection).Column] = MoveCardGridCellType.Start;
        
        _cellType[startCoordinate.Row, startCoordinate.Column] = MoveCardGridCellType.Start;
>>>>>>> 11c367267d36add3b71c0384ac52a977655ea36c


        for (int row = 0; row < matSize; row++)
        {
            for (int col = 0; col < matSize; col++)
            {
<<<<<<< HEAD
                if (_cellType[row, col] == MoveCardGridCellType.Target)
                {
                    diffRow = 2 - row;
                    diffCol = 2 - col;

                    if (playDirection == Direction.North)
                    {
                        mapTargetRow = startCoordinate.Row - diffRow;
                        mapTargetCol = startCoordinate.Column - diffCol;

                    }
                    else
                    {
                        mapTargetRow = startCoordinate.Row + diffRow;
                        mapTargetCol = startCoordinate.Column + diffCol;
                    }

                    if (mapTargetRow < 5 && mapTargetCol < 5)
                    {
                        coordinates.Add(new Coordinate(mapTargetRow, mapTargetCol));
                    }
=======
                ICoordinate newcord = new Coordinate(row, col);
                //ICoordinate rotatedCord = newcord.RotateTowards(playDirection);

                if (playDirection == Direction.South)
                {
                    //rotatedCord = new Coordinate(matSize - row -1, matSize - col -1).RotateTowards(playDirection);
                    if (_cellType[newcord.Row, newcord.Column] == MoveCardGridCellType.Target)
                    {
                        coordinates.Add(newcord);
                    }
                    //newgrid[row, col] = Grid[row, col];
                    //coordinates.Add(new Coordinate(matSize - 1 - row, matSize - 1 - col));
>>>>>>> 11c367267d36add3b71c0384ac52a977655ea36c
                }
                else
                {
                    //ICoordinate newCoordinate = new Coordinate(row, col);
                    if (_cellType[newcord.Row, newcord.Column] == MoveCardGridCellType.Target)
                    {
                        coordinates.Add(newcord);
                    }
                    //coordinates.Add(new Coordinate(row, col));
                }
                //if (_cellType[rotatedCord.Row, rotatedCord.Column] == MoveCardGridCellType.Target)
                //{
                //    coordinates.Add(rotatedCord);
                //}
            }

        }
        List<ICoordinate> rotatedcoordinates = new List<ICoordinate>();

        foreach (ICoordinate cord in coordinates)
        {
            rotatedcoordinates.Add(cord.RotateTowards(playDirection));
        }
        return rotatedcoordinates;
    }
}