import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/matches";

module {
  public func listMatches(
    matches : Map.Map<Common.MatchId, Types.Match>,
    tournamentId : Common.TournamentId,
  ) : [Types.Match] {
    matches.values().toArray().filter(func m = m.tournamentId == tournamentId);
  };

  public func getMatch(matches : Map.Map<Common.MatchId, Types.Match>, id : Common.MatchId) : ?Types.Match {
    matches.get(id);
  };

  public func createMatch(
    matches : Map.Map<Common.MatchId, Types.Match>,
    state : { var nextMatchId : Nat },
    tournamentId : Common.TournamentId,
    input : Types.MatchInput,
  ) : Types.Match {
    let id = state.nextMatchId;
    state.nextMatchId := id + 1;
    let match : Types.Match = {
      id;
      tournamentId;
      round = input.round;
      teamAId = input.teamAId;
      teamBId = input.teamBId;
      scoreA = null;
      scoreB = null;
      winnerId = null;
      status = #dijadwalkan;
      scheduledAt = input.scheduledAt;
      updatedAt = Time.now().toNat();
    };
    matches.add(id, match);
    match;
  };

  public func updateMatch(
    matches : Map.Map<Common.MatchId, Types.Match>,
    id : Common.MatchId,
    input : Types.MatchInput,
  ) : ?Types.Match {
    switch (matches.get(id)) {
      case null { null };
      case (?existing) {
        let updated : Types.Match = {
          existing with
          round = input.round;
          teamAId = input.teamAId;
          teamBId = input.teamBId;
          scheduledAt = input.scheduledAt;
          updatedAt = Time.now().toNat();
        };
        matches.add(id, updated);
        ?updated;
      };
    };
  };

  public func deleteMatch(matches : Map.Map<Common.MatchId, Types.Match>, id : Common.MatchId) : Bool {
    switch (matches.get(id)) {
      case null { false };
      case (?_) {
        matches.remove(id);
        true;
      };
    };
  };

  public func recordScore(
    matches : Map.Map<Common.MatchId, Types.Match>,
    id : Common.MatchId,
    scoreA : Nat,
    scoreB : Nat,
  ) : ?Types.Match {
    switch (matches.get(id)) {
      case null { null };
      case (?existing) {
        let updated : Types.Match = {
          existing with
          scoreA = ?scoreA;
          scoreB = ?scoreB;
          updatedAt = Time.now().toNat();
        };
        matches.add(id, updated);
        ?updated;
      };
    };
  };

  public func setMatchStatus(
    matches : Map.Map<Common.MatchId, Types.Match>,
    id : Common.MatchId,
    status : Types.MatchStatus,
  ) : ?Types.Match {
    switch (matches.get(id)) {
      case null { null };
      case (?existing) {
        let updated : Types.Match = {
          existing with
          status;
          updatedAt = Time.now().toNat();
        };
        matches.add(id, updated);
        ?updated;
      };
    };
  };

  public func setMatchWinner(
    matches : Map.Map<Common.MatchId, Types.Match>,
    id : Common.MatchId,
    winnerId : Common.TeamId,
  ) : ?Types.Match {
    switch (matches.get(id)) {
      case null { null };
      case (?existing) {
        let updated : Types.Match = {
          existing with
          winnerId = ?winnerId;
          updatedAt = Time.now().toNat();
        };
        matches.add(id, updated);
        ?updated;
      };
    };
  };
};
