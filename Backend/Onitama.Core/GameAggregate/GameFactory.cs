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
    private IMoveCard _moveCard;
    private PlayMat _playMat;

    public GameFactory(IMoveCardRepository moveCardRepository)
    {
        _moveCardRepository = moveCardRepository;
    }

    public IGame CreateNewForTable(ITable table)
    {
        IPlayer[] seatedPLayers = new IPlayer[2];
        Color[] colors = new Color[2];
        for (int i = 0; i < table.SeatedPlayers.Count; i++)
        {
            colors[i] = table.SeatedPlayers[i].Color;
            seatedPLayers[i] = table.SeatedPlayers[i];
            for (int j = 0; j < 2; j++)
            {
                _moveCard = new MoveCard();
                table.SeatedPlayers[i].MoveCards.Add(_moveCard);
            }
        }
        _playMat = new PlayMat(seatedPLayers);
        _game = new Game(table.Id, _playMat, seatedPLayers, _moveCard) ;
        _moveCardRepository.LoadSet(table.Preferences.MoveCardSet, colors);
        return _game;
    }
}