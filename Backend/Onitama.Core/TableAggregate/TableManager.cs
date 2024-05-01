using Onitama.Core.GameAggregate.Contracts;
using Onitama.Core.PlayerAggregate.Contracts;
using Onitama.Core.TableAggregate.Contracts;
using Onitama.Core.UserAggregate;

namespace Onitama.Core.TableAggregate;

/// <inheritdoc cref="ITableManager"/>
internal class TableManager : ITableManager
{
    private ITableFactory _tableFactory;
    private ITableRepository _tableRepository;
    private IGameRepository _gameRepository;
    private IGameFactory _gameFactory;
    private IGamePlayStrategy _gamePlayStrategy;

    public TableManager(
        ITableRepository tableRepository,
        ITableFactory tableFactory,
        IGameRepository gameRepository,
        IGameFactory gameFactory,
        IGamePlayStrategy gamePlayStrategy)
    {
        _tableRepository = tableRepository;
        _tableFactory = tableFactory;
        _gameRepository = gameRepository;
        _gameFactory = gameFactory;
        _gamePlayStrategy = gamePlayStrategy;
    }

    public ITable AddNewTableForUser(User user, TablePreferences preferences)
    {
        ITableFactory table = _tableFactory;
        ITableRepository repository = _tableRepository;
        ITable createdTable = table.CreateNewForUser(user, preferences);
        repository.Add(createdTable);
        return createdTable;
        throw new NotImplementedException();
    }

    public void JoinTable(Guid tableId, User user)
    {
        _tableRepository.Get(tableId).Join(user);
        //throw new NotImplementedException();
    }

    public void LeaveTable(Guid tableId, User user)
    {
        var table = _tableRepository.Get(tableId);
        table.Leave(user.Id);
        if (table.SeatedPlayers.Count == 0)
        {
            _tableRepository.Remove(tableId);
        }

        //throw new NotImplementedException();
    }

    public void FillWithArtificialPlayers(Guid tableId, User user)
    {
        //throw new NotImplementedException();
    }

    public IGame StartGameForTable(Guid tableId, User user)
    {
        throw new NotImplementedException();
    }
}