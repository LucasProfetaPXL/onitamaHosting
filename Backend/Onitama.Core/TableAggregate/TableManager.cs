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
        Table table = new Table(user.Id, preferences);
        return table;
        throw new NotImplementedException();
    }

    public void JoinTable(Guid tableId, User user)
    {
        throw new NotImplementedException();
    }

    public void LeaveTable(Guid tableId, User user)
    {
        throw new NotImplementedException();
    }

    public void FillWithArtificialPlayers(Guid tableId, User user)
    {
        throw new NotImplementedException();
    }

    public IGame StartGameForTable(Guid tableId, User user)
    {
        throw new NotImplementedException();
    }
}