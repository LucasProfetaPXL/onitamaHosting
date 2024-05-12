using Onitama.Core.PlayerAggregate.Contracts;
using Onitama.Core.SchoolAggregate.Contracts;
using Onitama.Core.Util.Contracts;

namespace Onitama.Core.SchoolAggregate;

/// <inheritdoc cref="IPawn"/>
internal class Pawn : IPawn
{
    private Guid _ownerId;
    private PawnType _type;

    public Pawn(Guid ownerId, PawnType type, ICoordinate position)
    {
        _ownerId = ownerId;
        _type = type;
        Position = position;
    }

    public Guid Id => Guid.NewGuid();

    public Guid OwnerId => throw new NotImplementedException();

    public PawnType Type => throw new NotImplementedException();

    public ICoordinate Position { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
}