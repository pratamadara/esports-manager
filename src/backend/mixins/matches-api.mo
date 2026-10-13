import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import Types "../types/matches";
import MatchesLib "../lib/matches";

mixin (
  accessControlState : AccessControl.AccessControlState,
  matches : Map.Map<Common.MatchId, Types.Match>,
  state : { var nextMatchId : Nat },
) {
  public query func listMatches(tournamentId : Common.TournamentId) : async [Types.Match] {
    MatchesLib.listMatches(matches, tournamentId);
  };

  public query func getMatch(id : Common.MatchId) : async ?Types.Match {
    MatchesLib.getMatch(matches, id);
  };

  public shared ({ caller }) func createMatch(tournamentId : Common.TournamentId, input : Types.MatchInput) : async Types.Match {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create matches");
    };
    MatchesLib.createMatch(matches, state, tournamentId, input);
  };

  public shared ({ caller }) func updateMatch(id : Common.MatchId, input : Types.MatchInput) : async ?Types.Match {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update matches");
    };
    MatchesLib.updateMatch(matches, id, input);
  };

  public shared ({ caller }) func deleteMatch(id : Common.MatchId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete matches");
    };
    MatchesLib.deleteMatch(matches, id);
  };

  public shared ({ caller }) func recordScore(id : Common.MatchId, scoreA : Nat, scoreB : Nat) : async ?Types.Match {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can record scores");
    };
    MatchesLib.recordScore(matches, id, scoreA, scoreB);
  };

  public shared ({ caller }) func setMatchStatus(id : Common.MatchId, status : Types.MatchStatus) : async ?Types.Match {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can change match status");
    };
    MatchesLib.setMatchStatus(matches, id, status);
  };

  public shared ({ caller }) func setMatchWinner(id : Common.MatchId, winnerId : Common.TeamId) : async ?Types.Match {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can set match winners");
    };
    MatchesLib.setMatchWinner(matches, id, winnerId);
  };
};
