using System.Drawing;
using System.Numerics;
using Onitama.Core.PlayerAggregate;
using Onitama.Core.PlayerAggregate.Contracts;
using Onitama.Core.TableAggregate.Contracts;
using Onitama.Core.UserAggregate;
using Onitama.Core.Util;

namespace Onitama.Core.TableAggregate;

/// <inheritdoc cref="ITable"/>
internal class Table : ITable
{

    public Table _table;

    private static readonly Color[] PossibleColors =
        new[] { Color.Red, Color.Blue, Color.Green, Color.Yellow, Color.Orange };

    public Table(Guid id, TablePreferences preferences)
    {

      
        Random randColor = new Random();
        Color tableColor = PossibleColors[randColor.Next(PossibleColors.Length)];
    }





    //public Guid Id => throw new NotImplementedException();
    public Guid Id => Id;

    public TablePreferences Preferences => _table.Preferences;

    public Guid OwnerPlayerId => _table.OwnerPlayerId;

    public IReadOnlyList<IPlayer> SeatedPlayers => SeatedPlayers;

    public bool HasAvailableSeat => throw new NotImplementedException();

    public Guid GameId { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

    public void FillWithArtificialPlayers(IGamePlayStrategy gamePlayStrategy)
    {
        throw new NotImplementedException();
    }

    public void Join(User user)
    {
        throw new NotImplementedException();
    }

    public void Leave(Guid userId)
    {
        throw new NotImplementedException();
    }
}