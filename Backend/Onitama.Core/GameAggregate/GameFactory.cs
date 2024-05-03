using System.Drawing;
using Onitama.Core.GameAggregate.Contracts;
using Onitama.Core.MoveCardAggregate.Contracts;
using Onitama.Core.PlayerAggregate.Contracts;
using Onitama.Core.PlayMatAggregate;
using Onitama.Core.PlayMatAggregate.Contracts;
using Onitama.Core.SchoolAggregate;
using Onitama.Core.TableAggregate.Contracts;

namespace Onitama.Core.GameAggregate;

internal class GameFactory : IGameFactory
{
    private IMoveCardRepository _moveCardRepository;
    public GameFactory(IMoveCardRepository moveCardRepository)
    {
        _moveCardRepository = moveCardRepository;
    }

    public IGame CreateNewForTable(ITable table)
    {
        //PlayMat playmat = new PlayMat();


        throw new NotImplementedException();
    }
}