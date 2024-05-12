using Onitama.Core.PlayerAggregate.Contracts;
using Onitama.Core.SchoolAggregate.Contracts;
using Onitama.Core.Util.Contracts;

namespace Onitama.Core.SchoolAggregate;

/// <inheritdoc cref="IPawn"/>
internal class Pawn : IPawn
{
    private Guid _ownerId;
    private PawnType _type;
    private ICoordinate _position;

    public Pawn(Guid ownerId, PawnType type)
    {
        _ownerId = ownerId;
        _type = type;
    }

    public Guid Id => Guid.NewGuid();

    public Guid OwnerId => _ownerId;

    public PawnType Type => _type;

    public ICoordinate Position { get => _position; set => value = _position; }
}