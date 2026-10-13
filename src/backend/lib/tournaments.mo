import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/tournaments";

module {
  public func listTournaments(tournaments : Map.Map<Common.TournamentId, Types.Tournament>) : [Types.Tournament] {
    tournaments.values().toArray();
  };

  public func getTournament(tournaments : Map.Map<Common.TournamentId, Types.Tournament>, id : Common.TournamentId) : ?Types.Tournament {
    tournaments.get(id);
  };

  public func createTournament(
    tournaments : Map.Map<Common.TournamentId, Types.Tournament>,
    state : { var nextTournamentId : Nat },
    input : Types.TournamentInput,
  ) : Types.Tournament {
    let id = state.nextTournamentId;
    state.nextTournamentId := id + 1;
    let now = Time.now().toNat();
    let tournament : Types.Tournament = {
      id;
      name = input.name;
      game = input.game;
      format = input.format;
      prizePool = input.prizePool;
      status = input.status;
      description = input.description;
      schedule = input.schedule;
      teamIds = [];
      createdAt = now;
      updatedAt = now;
    };
    tournaments.add(id, tournament);
    tournament;
  };

  public func updateTournament(
    tournaments : Map.Map<Common.TournamentId, Types.Tournament>,
    id : Common.TournamentId,
    input : Types.TournamentInput,
  ) : ?Types.Tournament {
    switch (tournaments.get(id)) {
      case null { null };
      case (?existing) {
        let updated : Types.Tournament = {
          existing with
          name = input.name;
          game = input.game;
          format = input.format;
          prizePool = input.prizePool;
          status = input.status;
          description = input.description;
          schedule = input.schedule;
          updatedAt = Time.now().toNat();
        };
        tournaments.add(id, updated);
        ?updated;
      };
    };
  };

  public func deleteTournament(tournaments : Map.Map<Common.TournamentId, Types.Tournament>, id : Common.TournamentId) : Bool {
    switch (tournaments.get(id)) {
      case null { false };
      case (?_) {
        tournaments.remove(id);
        true;
      };
    };
  };

  public func setTournamentStatus(
    tournaments : Map.Map<Common.TournamentId, Types.Tournament>,
    id : Common.TournamentId,
    status : Types.TournamentStatus,
  ) : ?Types.Tournament {
    switch (tournaments.get(id)) {
      case null { null };
      case (?existing) {
        let updated : Types.Tournament = {
          existing with
          status;
          updatedAt = Time.now().toNat();
        };
        tournaments.add(id, updated);
        ?updated;
      };
    };
  };

  public func addTeamToTournament(
    tournaments : Map.Map<Common.TournamentId, Types.Tournament>,
    id : Common.TournamentId,
    teamId : Common.TeamId,
  ) : ?Types.Tournament {
    switch (tournaments.get(id)) {
      case null { null };
      case (?existing) {
        if (existing.teamIds.contains(teamId)) {
          return ?existing;
        };
        let updated : Types.Tournament = {
          existing with
          teamIds = existing.teamIds.concat([teamId]);
          updatedAt = Time.now().toNat();
        };
        tournaments.add(id, updated);
        ?updated;
      };
    };
  };

  public func removeTeamFromTournament(
    tournaments : Map.Map<Common.TournamentId, Types.Tournament>,
    id : Common.TournamentId,
    teamId : Common.TeamId,
  ) : ?Types.Tournament {
    switch (tournaments.get(id)) {
      case null { null };
      case (?existing) {
        let updated : Types.Tournament = {
          existing with
          teamIds = existing.teamIds.filter(func t = t != teamId);
          updatedAt = Time.now().toNat();
        };
        tournaments.add(id, updated);
        ?updated;
      };
    };
  };
};
