using Onitama.Core.MoveCardAggregate.Contracts;
using Onitama.Core.PlayerAggregate.Contracts;
using Onitama.Core.SchoolAggregate.Contracts;
using Onitama.Core.Util;
using Onitama.Core.Util.Contracts;
using System.Drawing;

namespace Onitama.Core.SchoolAggregate;

/// <inheritdoc cref="ISchool"/>
internal class School : ISchool
{
    private IPawn _Master;
    private IPawn[] _Students;
    private IPawn[] _AllPawns;
    private ICoordinate _TempleArchPosition;

    /// <summary>
    /// Creates a school that is a copy of another school.
    /// </summary>
    /// <remarks>
    /// This is an EXTRA. Not needed to implement the minimal requirements.
    /// To make the mini-max algorithm for an AI game play strategy work, this constructor should be implemented.
    /// </remarks>
    public School(ISchool otherSchool)
    {
        _Master = otherSchool.Master;
        _Students = otherSchool.Students;
        _AllPawns = otherSchool.AllPawns;
        _TempleArchPosition = otherSchool.TempleArchPosition;
        //throw new NotImplementedException("TODO: copy properties of other school. Make sure to copy the pawns, not just reference them");
    }

    public IPawn Master => _Master;

    public IPawn[] Students => _Students;

    public IPawn[] AllPawns => _AllPawns;

    public ICoordinate TempleArchPosition { get => _TempleArchPosition; set => value = _TempleArchPosition; }

 

    public IPawn GetPawn(Guid pawnId)
    {
        foreach (var pawn in _AllPawns)
        {
            if (pawn.Id == pawnId)
            {
                // Found the pawn; return it
                return pawn;
            }
        }

        // No pawn with the specified ID found; return null
        return null;

        //throw new NotImplementedException();
    }
}