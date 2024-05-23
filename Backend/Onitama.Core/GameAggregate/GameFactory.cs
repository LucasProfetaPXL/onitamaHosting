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
using Onitama.Core.Util;
using Onitama.Core.Util.Contracts;

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

    private MoveCardGridCellType[,] GenerateRandomGrid()
    {
        Random random = new Random();
        MoveCardGridCellType[,] grid = new MoveCardGridCellType[5, 5];

        for (int x = 0; x < 5; x++)
        {
            for (int y = 0; y < 5; y++)
            {
                grid[x, y] = (MoveCardGridCellType)random.Next(0, 3);
            }
        }

        return grid;
    }

    private List<MoveCard> GeneratePossibleMoveCards()
    {
        List<MoveCard> possibleMoveCards = new List<MoveCard>();
        MoveCardGridCellType[,] grid = GenerateRandomGrid();
        for (int i = 0; i < 10; i++)
        {
            MoveCard moveCard = new MoveCard("MoveCard" + i, grid, Color.Black); 
            possibleMoveCards.Add(moveCard);
        }

        return possibleMoveCards;
    }


    public IGame CreateNewForTable(ITable table)
    {
        //IPlayer[] seatedPlayers = new IPlayer[2];
        //Color[] colors = new Color[2];
        //Random random = new Random();

        //for (int i = 0; i < table.SeatedPlayers.Count; i++)
        //{
        //    colors[i] = table.SeatedPlayers[i].Color;
        //    seatedPlayers[i] = table.SeatedPlayers[i];

        //    List<MoveCard> possibleMoveCards = GeneratePossibleMoveCards(); 

        //    for (int j = 0; j < possibleMoveCards.Count - 1; j++)
        //    {
        //        int index = random.Next(j, possibleMoveCards.Count);
        //        MoveCard temp = possibleMoveCards[j];
        //        possibleMoveCards[j] = possibleMoveCards[index];
        //        possibleMoveCards[index] = temp;
        //    }
        //    for (int k = 0; k < 2; k++)
        //    {
        //        MoveCard selectedMoveCard = possibleMoveCards[k];
        //        table.SeatedPlayers[i].MoveCards.Add(selectedMoveCard);
        //    }
        //}
        //MoveCard extraMoveCard = GeneratePossibleMoveCards()[random.Next(0, 10)]; 
        //_playMat = new PlayMat(seatedPlayers);
        //_game = new Game(table.Id, _playMat, seatedPlayers, extraMoveCard); 
        //_moveCardRepository.LoadSet(table.Preferences.MoveCardSet, colors);
        //return _game;
        IPlayer[] seatedPlayers = new IPlayer[2];
        Color[] colors = new Color[2];
        Random random = new Random();

        for (int i = 0; i < table.SeatedPlayers.Count; i++)
        {
            colors[i] = table.SeatedPlayers[i].Color;
            seatedPlayers[i] = table.SeatedPlayers[i];

            List<MoveCard> possibleMoveCards = GeneratePossibleMoveCards();

            for (int j = 0; j < possibleMoveCards.Count - 1; j++)
            {
                int index = random.Next(j, possibleMoveCards.Count);
                MoveCard temp = possibleMoveCards[j];
                possibleMoveCards[j] = possibleMoveCards[index];
                possibleMoveCards[index] = temp;
            }
            for (int k = 0; k < 2; k++)
            {
                MoveCard selectedMoveCard = possibleMoveCards[k];
                table.SeatedPlayers[i].MoveCards.Add(selectedMoveCard);
            }
        }

        // Ensure the extra move card's color matches one of the players' colors
        Color extraMoveCardColor = colors[random.Next(0, 2)];
        MoveCard extraMoveCard = new MoveCard("ExtraMoveCard", GenerateRandomGrid(), extraMoveCardColor);

        PlayMat playMat = new PlayMat(seatedPlayers);
        Game game = new Game(table.Id, playMat, seatedPlayers, extraMoveCard);
        _moveCardRepository.LoadSet(table.Preferences.MoveCardSet, colors);

        return game;


    }
}