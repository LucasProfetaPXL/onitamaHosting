﻿using System.Drawing;
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
    private ISchool _school;
    private IList<IMoveCard> _moveCards;

    public Guid Id =>  _id;

    public string Name => _name;

    public Color Color => _color;

    public Direction Direction => _direction;

    public ISchool School => _school;

    public IList<IMoveCard> MoveCards => _moveCards;

    protected PlayerBase(Guid id, string name, Color color, Direction direction)
    {
        _id = id;
        _name = name;
        _color = color;
        _direction = direction;
        _moveCards = new List<IMoveCard>();
        _school = new School(id, direction);
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
        _id = otherPlayer.Id;
        _name = otherPlayer.Name;
        _color = otherPlayer.Color;
        _direction = otherPlayer.Direction;
        _school = otherPlayer.School;
        _moveCards = otherPlayer.MoveCards;
        //throw new NotImplementedException("TODO: copy properties of other player");
    }
}