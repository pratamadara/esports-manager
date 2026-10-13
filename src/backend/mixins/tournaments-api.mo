import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import Types "../types/tournaments";
import TournamentsLib "../lib/tournaments";

mixin (
  accessControlState : AccessControl.AccessControlState,
  tournaments : Map.Map<Common.TournamentId, Types.Tournament>,
  state : { var nextTournamentId : Nat },
) {
  public query func listTournaments() : async [Types.Tournament] {
    TournamentsLib.listTournaments(tournaments);
  };

  public query func getTournament(id : Common.TournamentId) : async ?Types.Tournament {
    TournamentsLib.getTournament(tournaments, id);
  };

  public shared ({ caller }) func createTournament(input : Types.TournamentInput) : async Types.Tournament {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create tournaments");
    };
    TournamentsLib.createTournament(tournaments, state, input);
  };

  public shared ({ caller }) func updateTournament(id : Common.TournamentId, input : Types.TournamentInput) : async ?Types.Tournament {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update tournaments");
    };
    TournamentsLib.updateTournament(tournaments, id, input);
  };

  public shared ({ caller }) func deleteTournament(id : Common.TournamentId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete tournaments");
    };
    TournamentsLib.deleteTournament(tournaments, id);
  };

  public shared ({ caller }) func setTournamentStatus(id : Common.TournamentId, status : Types.TournamentStatus) : async ?Types.Tournament {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can change tournament status");
    };
    TournamentsLib.setTournamentStatus(tournaments, id, status);
  };

  public shared ({ caller }) func addTeamToTournament(id : Common.TournamentId, teamId : Common.TeamId) : async ?Types.Tournament {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add teams to tournaments");
    };
    TournamentsLib.addTeamToTournament(tournaments, id, teamId);
  };

  public shared ({ caller }) func removeTeamFromTournament(id : Common.TournamentId, teamId : Common.TeamId) : async ?Types.Tournament {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can remove teams from tournaments");
    };
    TournamentsLib.removeTeamFromTournament(tournaments, id, teamId);
  };
};
