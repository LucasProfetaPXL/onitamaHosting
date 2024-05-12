using System.Numerics;
using Onitama.Core.Util.Contracts;

namespace Onitama.Core.Util;

/// <inheritdoc cref="ICoordinate"/>
internal class Coordinate : ICoordinate
{
    public int Row { get; }
    public int Column { get; }

    public Coordinate(int row, int column)
    {
        Row = row;
        Column = column;
    }

    //Do not change this method
    public override bool Equals(object obj)
    {
        if (obj is null) return false;
        return obj is ICoordinate other && Equals(other);
    }

    //Do not change this method
    protected bool Equals(ICoordinate other)
    {
        return Row == other.Row && Column == other.Column;
    }

    //Do not change this method
    public override int GetHashCode()
    {
        return HashCode.Combine(Row, Column);
    }

    //Do not change this method
    public override string ToString()
    {
        return $"({Row}, {Column})";
    }

    public bool IsOutOfBounds(int playMatSize)
    {
        if (this.Row > playMatSize || this.Column > playMatSize)
        {
            return true;
        }
        return false;
        throw new NotImplementedException();
    }

    public ICoordinate GetNeighbor(Direction direction)
    {
        if (direction == Direction.North) //switch not working idk why
        {
            return new Coordinate(this.Row, this.Column + 1);
        }
        else if (direction == Direction.South)
        {
            return new Coordinate(this.Row, this.Column - 1);
        }
        else if (direction == Direction.East)
        {
            return new Coordinate(this.Row + 1, this.Column);
        }
        else if (direction == Direction.West)
        {
            return new Coordinate(this.Row - 1, this.Column);
        }
        throw new System.ArgumentException("Invalid coordinate");
    }

    public ICoordinate RotateTowards(Direction direction)
    {
        if (direction == Direction.North) //switch not working idk why
        {
            return new Coordinate(this.Row, this.Column);
        }
        else if (direction == Direction.South)
        {
            return new Coordinate(-this.Row, -this.Column);
        }
        else if (direction == Direction.East)
        {
            return new Coordinate(-this.Column, this.Row);
        }
        else if (direction == Direction.West)
        {
            return new Coordinate(this.Column, -this.Row);
        }
        throw new System.ArgumentException("Invalid coordinate");
        throw new NotImplementedException();
    }

    public int GetDistanceTo(ICoordinate other) // extra
    {
        throw new NotImplementedException();
    }
}