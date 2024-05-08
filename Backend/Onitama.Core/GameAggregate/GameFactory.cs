using System.Drawing;
using Onitama.Core.GameAggregate.Contracts;
using Onitama.Core.MoveCardAggregate;
using Onitama.Core.MoveCardAggregate.Contracts;
using Onitama.Core.PlayerAggregate;
using Onitama.Core.PlayerAggregate.Contracts;
using Onitama.Core.PlayMatAggregate;
using Onitama.Core.PlayMatAggregate.Contracts;
using Onitama.Core.SchoolAggregate;
using Onitama.Core.TableAggregate;
using Onitama.Core.TableAggregate.Contracts;
using Onitama.Core.UserAggregate;

namespace Onitama.Core.GameAggregate;

internal class GameFactory : IGameFactory
{
    private IMoveCardRepository _moveCardRepository;
    private IGame _game;

    public GameFactory(IMoveCardRepository moveCardRepository)
    {
        _moveCardRepository = moveCardRepository;


    }

    public IGame CreateNewForTable(ITable table)
    {
        Random random = new Random();
        Color[] colorArray = new Color[table.SeatedPlayers.Count];
        for (int i = 0; i < table.SeatedPlayers.Count; i++)
        {
            colorArray[i] = table.SeatedPlayers[i].Color;

        }
        _moveCardRepository.LoadSet(table.Preferences.MoveCardSet, colorArray);

       
        PlayerBase playerbase = new PlayerBase(table.SeatedPlayers[0]);
        //PlayMat playmat = new PlayMat();
        //table.SeatedPlayers.
        //_game = new Game(Guid.NewGuid(), table.Preferences, table.SeatedPlayers., );

        //_game.Id = Guid.NewGuid();
        //table.Preferences.MoveCardSet.;

        //return _game;
        throw new NotImplementedException();
    }
}