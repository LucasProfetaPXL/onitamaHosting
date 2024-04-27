using Onitama.Core.TableAggregate.Contracts;
using Onitama.Core.UserAggregate;

namespace Onitama.Core.TableAggregate;

/// <inheritdoc cref="ITableFactory"/>
internal class TableFactory : ITableFactory
{
    private ITableFactory _tableFactory = null!;
    private ITable _table = null!;
    public ITable CreateNewForUser(User user, TablePreferences preferences)
    {
        _table.Join(user);
        _tableFactory.CreateNewForUser(user, preferences);
        throw new NotImplementedException();
    }
}