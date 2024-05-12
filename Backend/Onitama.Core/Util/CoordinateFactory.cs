﻿using Onitama.Core.Util.Contracts;

namespace Onitama.Core.Util;

internal class CoordinateFactory : ICoordinateFactory
{
    public ICoordinate Create(int row, int column)
    {
        return new Coordinate(row, column);
        throw new NotImplementedException(
            "Return an instance of a class that implements ICoordinate");
    }
}