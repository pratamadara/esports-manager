import Common "../types/common";

module {
  public type MatchStatus = {
    #dijadwalkan;
    #berlangsung;
    #selesai;
  };

  public type Match = {
    id : Common.MatchId;
    tournamentId : Common.TournamentId;
    round : Text;
    teamAId : ?Common.TeamId;
    teamBId : ?Common.TeamId;
    scoreA : ?Nat;
    scoreB : ?Nat;
    winnerId : ?Common.TeamId;
    status : MatchStatus;
    scheduledAt : ?Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type MatchInput = {
    round : Text;
    teamAId : ?Common.TeamId;
    teamBId : ?Common.TeamId;
    scheduledAt : ?Common.Timestamp;
  };
};
