using System.Drawing;
using Onitama.Core.MoveCardAggregate.Contracts;

namespace Onitama.Core.MoveCardAggregate;

/// <inheritdoc cref="IMoveCardFactory"/>
internal class MoveCardFactory : IMoveCardFactory
{
    private MoveCard _moveCard;
    Color _color;
    public IMoveCard Create(string name, MoveCardGridCellType[,] grid, Color[] possibleStampColors)
    {
        Random random = new Random();
        _color = possibleStampColors[random.Next(possibleStampColors.Length)];
        _moveCard = new MoveCard(name, grid, _color);
        return _moveCard;
        throw new NotImplementedException("TODO: pick a random stamp color and return a MoveCard instance");
    }
}