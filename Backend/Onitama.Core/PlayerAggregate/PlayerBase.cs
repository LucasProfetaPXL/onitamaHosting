using System.Drawing;
using Onitama.Core.MoveCardAggregate.Contracts;
using Onitama.Core.PlayerAggregate.Contracts;
using Onitama.Core.SchoolAggregate;
using Onitama.Core.SchoolAggregate.Contracts;
using Onitama.Core.Util;

namespace Onitama.Core.PlayerAggregate;

/// <inheritdoc cref="IPlayer"/>
internal class PlayerBase : IPlayer
{
    private Guid _id;
    private string _name;
    private Color _color;
    private Direction _direction;

    public Guid Id => throw new NotImplementedException();

    public string Name => throw new NotImplementedException();

    public Color Color => throw new NotImplementedException();

    public Direction Direction => throw new NotImplementedException();

    public ISchool School => throw new NotImplementedException();

    public IList<IMoveCard> MoveCards => throw new NotImplementedException();

    protected PlayerBase(Guid id, string name, Color color, Direction direction)
    {
        _id = id;
        _name = name;
        _color = color;
        _direction = direction;
    }

    /// <summary>
    /// Creates a player that is a copy of an other player.
    /// </summary>
    /// <remarks>
    /// This is an EXTRA. Not needed to implement the minimal requirements.
    /// To make the mini-max algorithm for an AI game play strategy work, this constructor should be implemented.
    /// </remarks>
    public PlayerBase(IPlayer otherPlayer)
    {
        throw new NotImplementedException("TODO: copy properties of other player");
    }
}