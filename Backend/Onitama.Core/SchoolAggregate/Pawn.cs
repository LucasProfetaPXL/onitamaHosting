using Onitama.Core.SchoolAggregate.Contracts;
using Onitama.Core.Util.Contracts;

namespace Onitama.Core.SchoolAggregate;

/// <inheritdoc cref="IPawn"/>
internal class Pawn : IPawn
{
    public Guid Id => Guid.NewGuid();

    public Guid OwnerId => throw new NotImplementedException();

    public PawnType Type => throw new NotImplementedException();

    public ICoordinate Position { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
}