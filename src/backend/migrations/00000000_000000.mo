import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";

module {
  type TournamentStatus = { #akanDatang; #berlangsung; #selesai };

  type ScheduleEntry = {
    id : Nat;
    caption : Text;
    startAt : Nat;
    endAt : Nat;
  };

  type Tournament = {
    id : Nat;
    name : Text;
    game : Text;
    format : Text;
    prizePool : Text;
    status : TournamentStatus;
    description : Text;
    schedule : [ScheduleEntry];
    teamIds : [Nat];
    createdAt : Nat;
    updatedAt : Nat;
  };

  type Player = {
    id : Nat;
    name : Text;
    role : Text;
  };

  type Team = {
    id : Nat;
    name : Text;
    logoUrl : Text;
    game : Text;
    description : Text;
    roster : [Player];
    tournamentIds : [Nat];
    createdAt : Nat;
    updatedAt : Nat;
  };

  type MatchStatus = { #dijadwalkan; #berlangsung; #selesai };

  type Match = {
    id : Nat;
    tournamentId : Nat;
    round : Text;
    teamAId : ?Nat;
    teamBId : ?Nat;
    scoreA : ?Nat;
    scoreB : ?Nat;
    winnerId : ?Nat;
    status : MatchStatus;
    scheduledAt : ?Nat;
    updatedAt : Nat;
  };

  type UserProfile = {
    displayName : Text;
  };

  type OldActor = {};

  type NewActor = {
    accessControlState : AccessControl.AccessControlState;
    tournaments : Map.Map<Nat, Tournament>;
    teams : Map.Map<Nat, Team>;
    matches : Map.Map<Nat, Match>;
    profiles : Map.Map<Principal, UserProfile>;
    state : {
      var nextTournamentId : Nat;
      var nextTeamId : Nat;
      var nextMatchId : Nat;
    };
  };

  public func migration(_ : OldActor) : NewActor {
    {
      accessControlState = AccessControl.initState();
      tournaments = Map.empty();
      teams = Map.empty();
      matches = Map.empty();
      profiles = Map.empty();
      state = {
        var nextTournamentId = 0;
        var nextTeamId = 0;
        var nextMatchId = 0;
      };
    };
  };
};
