using Onitama.Core.TableAggregate.Contracts;
using Onitama.Core.UserAggregate;

namespace Onitama.Core.TableAggregate;

/// <inheritdoc cref="ITableFactory"/>
internal class TableFactory : ITableFactory
{

    private Guid _idTable;
    public ITable CreateNewForUser(User user, TablePreferences preferences)
    {
        _idTable = Guid.NewGuid();
        Table table = new Table(user.Id, preferences);
        table.Join(user);
        return table;
        throw new NotImplementedException();
    }
}