import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/teams";

module {
  public func listTeams(teams : Map.Map<Common.TeamId, Types.Team>) : [Types.Team] {
    teams.values().toArray();
  };

  public func getTeam(teams : Map.Map<Common.TeamId, Types.Team>, id : Common.TeamId) : ?Types.Team {
    teams.get(id);
  };

  public func createTeam(
    teams : Map.Map<Common.TeamId, Types.Team>,
    state : { var nextTeamId : Nat },
    input : Types.TeamInput,
  ) : Types.Team {
    let id = state.nextTeamId;
    state.nextTeamId := id + 1;
    let now = Time.now().toNat();
    let team : Types.Team = {
      id;
      name = input.name;
      logoUrl = input.logoUrl;
      game = input.game;
      description = input.description;
      roster = [];
      tournamentIds = [];
      createdAt = now;
      updatedAt = now;
    };
    teams.add(id, team);
    team;
  };

  public func updateTeam(
    teams : Map.Map<Common.TeamId, Types.Team>,
    id : Common.TeamId,
    input : Types.TeamInput,
  ) : ?Types.Team {
    switch (teams.get(id)) {
      case null { null };
      case (?existing) {
        let updated : Types.Team = {
          existing with
          name = input.name;
          logoUrl = input.logoUrl;
          game = input.game;
          description = input.description;
          updatedAt = Time.now().toNat();
        };
        teams.add(id, updated);
        ?updated;
      };
    };
  };

  public func deleteTeam(teams : Map.Map<Common.TeamId, Types.Team>, id : Common.TeamId) : Bool {
    switch (teams.get(id)) {
      case null { false };
      case (?_) {
        teams.remove(id);
        true;
      };
    };
  };

  public func setRoster(
    teams : Map.Map<Common.TeamId, Types.Team>,
    id : Common.TeamId,
    roster : [Types.Player],
  ) : ?Types.Team {
    switch (teams.get(id)) {
      case null { null };
      case (?existing) {
        let updated : Types.Team = {
          existing with
          roster;
          updatedAt = Time.now().toNat();
        };
        teams.add(id, updated);
        ?updated;
      };
    };
  };

  public func addTournamentToTeam(
    teams : Map.Map<Common.TeamId, Types.Team>,
    id : Common.TeamId,
    tournamentId : Common.TournamentId,
  ) : ?Types.Team {
    switch (teams.get(id)) {
      case null { null };
      case (?existing) {
        if (existing.tournamentIds.contains(tournamentId)) {
          return ?existing;
        };
        let updated : Types.Team = {
          existing with
          tournamentIds = existing.tournamentIds.concat([tournamentId]);
          updatedAt = Time.now().toNat();
        };
        teams.add(id, updated);
        ?updated;
      };
    };
  };

  public func removeTournamentFromTeam(
    teams : Map.Map<Common.TeamId, Types.Team>,
    id : Common.TeamId,
    tournamentId : Common.TournamentId,
  ) : ?Types.Team {
    switch (teams.get(id)) {
      case null { null };
      case (?existing) {
        let updated : Types.Team = {
          existing with
          tournamentIds = existing.tournamentIds.filter(func t = t != tournamentId);
          updatedAt = Time.now().toNat();
        };
        teams.add(id, updated);
        ?updated;
      };
    };
  };
};
