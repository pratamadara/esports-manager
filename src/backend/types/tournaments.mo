import Common "../types/common";

module {
  public type TournamentStatus = {
    #akanDatang;
    #berlangsung;
    #selesai;
  };

  public type ScheduleEntry = {
    id : Nat;
    caption : Text;
    startAt : Common.Timestamp;
    endAt : Common.Timestamp;
  };

  public type Tournament = {
    id : Common.TournamentId;
    name : Text;
    game : Text;
    format : Text;
    prizePool : Text;
    status : TournamentStatus;
    description : Text;
    schedule : [ScheduleEntry];
    teamIds : [Common.TeamId];
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type TournamentInput = {
    name : Text;
    game : Text;
    format : Text;
    prizePool : Text;
    status : TournamentStatus;
    description : Text;
    schedule : [ScheduleEntry];
  };
};
