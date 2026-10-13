import Common "../types/common";

module {
  public type Player = {
    id : Nat;
    name : Text;
    role : Text;
  };

  public type Team = {
    id : Common.TeamId;
    name : Text;
    logoUrl : Text;
    game : Text;
    description : Text;
    roster : [Player];
    tournamentIds : [Common.TournamentId];
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type TeamInput = {
    name : Text;
    logoUrl : Text;
    game : Text;
    description : Text;
  };
};
