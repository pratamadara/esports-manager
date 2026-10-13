import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import Types "../types/teams";
import TeamsLib "../lib/teams";

mixin (
  accessControlState : AccessControl.AccessControlState,
  teams : Map.Map<Common.TeamId, Types.Team>,
  state : { var nextTeamId : Nat },
) {
  public query func listTeams() : async [Types.Team] {
    TeamsLib.listTeams(teams);
  };

  public query func getTeam(id : Common.TeamId) : async ?Types.Team {
    TeamsLib.getTeam(teams, id);
  };

  public shared ({ caller }) func createTeam(input : Types.TeamInput) : async Types.Team {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create teams");
    };
    TeamsLib.createTeam(teams, state, input);
  };

  public shared ({ caller }) func updateTeam(id : Common.TeamId, input : Types.TeamInput) : async ?Types.Team {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update teams");
    };
    TeamsLib.updateTeam(teams, id, input);
  };

  public shared ({ caller }) func deleteTeam(id : Common.TeamId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete teams");
    };
    TeamsLib.deleteTeam(teams, id);
  };

  public shared ({ caller }) func setRoster(id : Common.TeamId, roster : [Types.Player]) : async ?Types.Team {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can manage rosters");
    };
    TeamsLib.setRoster(teams, id, roster);
  };

  public shared ({ caller }) func addTournamentToTeam(id : Common.TeamId, tournamentId : Common.TournamentId) : async ?Types.Team {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add tournaments to teams");
    };
    TeamsLib.addTournamentToTeam(teams, id, tournamentId);
  };

  public shared ({ caller }) func removeTournamentFromTeam(id : Common.TeamId, tournamentId : Common.TournamentId) : async ?Types.Team {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can remove tournaments from teams");
    };
    TeamsLib.removeTournamentFromTeam(teams, id, tournamentId);
  };
};
