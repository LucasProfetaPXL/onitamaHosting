using System.Drawing;
using System.Linq;
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

    private List<PlayerBase> _playerList;
    private Guid _id;
    private TablePreferences _preferences;
    private Guid _ownerPlayerId;
    private bool _hasAvailableSeat;
    public Table _table;

    private static readonly Color[] PossibleColors = 
        new[] { Color.Red, Color.Blue, Color.Green, Color.Yellow, Color.Orange };

    public Table(Guid id, TablePreferences preferences)
    {
        _id = id;
        _preferences = preferences;
        _hasAvailableSeat = true;
        Random randColor = new Random();
        Color tableColor = PossibleColors[randColor.Next(PossibleColors.Length)];
        _playerList = new List<PlayerBase>();
    }





    //public Guid Id => throw new NotImplementedException();
    public Guid Id => _id;

    public TablePreferences Preferences => _preferences;

    public Guid OwnerPlayerId => _ownerPlayerId;

    public IReadOnlyList<IPlayer> SeatedPlayers => _playerList;

    public bool HasAvailableSeat => _hasAvailableSeat;

    public Guid GameId { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

    public void FillWithArtificialPlayers(IGamePlayStrategy gamePlayStrategy)
    {
        throw new NotImplementedException();
    }

    public void Join(User user)
    {
        Random randNumber = new Random();
        bool erin = false;
        Direction direction;
        Color color = PossibleColors[randNumber.Next(PossibleColors.Length)];
        if (_playerList.Count == 0)
        {
            direction = Direction.North;
            _ownerPlayerId = user.Id;
        }
        else
        {
           direction= Direction.South;
           _hasAvailableSeat = false;
        }
        if(_playerList.Count == 2) 
        {
            throw new InvalidOperationException("This table is full");
        }
        foreach(PlayerBase player in _playerList) 
        { 
            if(player.Id == user.Id) 
            {
                throw new InvalidOperationException("You are already seated");
            }
        }
        
        HumanPlayer humanPlayer = new HumanPlayer(user.Id, user.WarriorName, color, direction);
        _playerList.Add(humanPlayer);
        
        //throw new NotImplementedException();
    }

    public void Leave(Guid userId)
    {
        //_table.SeatedPlayers 
        //_table._playerList.Contains(userId);

        try
        {
            for (int i = 0; i < _playerList.Count; i++)
            {
                if (_playerList[i].Id == userId)
                {
                    _playerList.Remove(_playerList[i]);
                    _ownerPlayerId = _playerList[0].Id;
                    break;
                }
                else if (i == _playerList.Count-1)
                {
                    throw new InvalidOperationException();
                }
            }
        }
        catch (InvalidOperationException)
        {
            throw;
        }

        //InvalidOperationException(_table.Leave(userId));


        //throw new NotImplementedException();
    }
    
}