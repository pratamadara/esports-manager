import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import OQL "mo:caffeineai-oql";
import Expose "mo:caffeineai-oql/Expose";
import Entity "mo:caffeineai-oql/Entity";
import Common "types/common";
import TournamentTypes "types/tournaments";
import TeamTypes "types/teams";
import MatchTypes "types/matches";
import ProfileTypes "types/profiles";
import TournamentsApi "mixins/tournaments-api";
import TeamsApi "mixins/teams-api";
import MatchesApi "mixins/matches-api";
import ProfilesApi "mixins/profiles-api";
import ApiDocMixin "mixins/api-doc";

actor {
  let accessControlState : AccessControl.AccessControlState;
  include MixinAuthorization(accessControlState, null);

  let tournaments : Map.Map<Common.TournamentId, TournamentTypes.Tournament>;
  let teams : Map.Map<Common.TeamId, TeamTypes.Team>;
  let matches : Map.Map<Common.MatchId, MatchTypes.Match>;
  let profiles : Map.Map<Principal, ProfileTypes.UserProfile>;
  let state : {
    var nextTournamentId : Nat;
    var nextTeamId : Nat;
    var nextMatchId : Nat;
  };

  include TournamentsApi(accessControlState, tournaments, state);
  include TeamsApi(accessControlState, teams, state);
  include MatchesApi(accessControlState, matches, state);
  include ProfilesApi(accessControlState, profiles);

  func optNat(v : ?Nat) : OQL.Value {
    switch (v) {
      case (?n) #nat(n);
      case null #null_;
    };
  };

  func _toRow(v : OQL.Value) : OQL.Value = v;

  include Expose({
    entities = [
      OQL.Entity.manual<TournamentTypes.Tournament>(
        "tournament",
        func () = tournaments.values(),
        "Tournament",
        "id",
      )
        .sample({
          id = 0;
          name = "";
          game = "";
          format = "";
          prizePool = "";
          status = #akanDatang;
          description = "";
          schedule = [];
          teamIds = [];
          createdAt = 0;
          updatedAt = 0;
        })
        .payload("id", func t = t.id)
        .payload("name", func t = t.name)
        .payload("game", func t = t.game)
        .payload("format", func t = t.format)
        .payload("prizePool", func t = t.prizePool)
        .payload("status", func t = switch (t.status) {
          case (#akanDatang) "akanDatang";
          case (#berlangsung) "berlangsung";
          case (#selesai) "selesai";
        })
        .payload("description", func t = t.description)
        .payload("scheduleCount", func t = t.schedule.size())
        .payload("teamCount", func t = t.teamIds.size())
        .payload("createdAt", func t = t.createdAt)
        .payload("updatedAt", func t = t.updatedAt)
        .public_()
        .build(),
      OQL.Entity.manual<TeamTypes.Team>(
        "team",
        func () = teams.values(),
        "Team",
        "id",
      )
        .sample({
          id = 0;
          name = "";
          logoUrl = "";
          game = "";
          description = "";
          roster = [];
          tournamentIds = [];
          createdAt = 0;
          updatedAt = 0;
        })
        .payload("id", func t = t.id)
        .payload("name", func t = t.name)
        .payload("logoUrl", func t = t.logoUrl)
        .payload("game", func t = t.game)
        .payload("description", func t = t.description)
        .payload("rosterCount", func t = t.roster.size())
        .payload("tournamentCount", func t = t.tournamentIds.size())
        .payload("createdAt", func t = t.createdAt)
        .payload("updatedAt", func t = t.updatedAt)
        .public_()
        .build(),
      OQL.Entity.manual<MatchTypes.Match>(
        "match",
        func () = matches.values(),
        "Match",
        "id",
      )
        .sample({
          id = 0;
          tournamentId = 0;
          round = "";
          teamAId = ?0;
          teamBId = ?0;
          scoreA = ?0;
          scoreB = ?0;
          winnerId = ?0;
          status = #dijadwalkan;
          scheduledAt = ?0;
          updatedAt = 0;
        })
        .payload("id", func m = m.id)
        .payload("tournamentId", func m = m.tournamentId)
        .edge("tournamentId", "tournament")
        .payload("round", func m = m.round)
        .payload("teamAId", func m = optNat(m.teamAId))
        .payload("teamBId", func m = optNat(m.teamBId))
        .payload("scoreA", func m = optNat(m.scoreA))
        .payload("scoreB", func m = optNat(m.scoreB))
        .payload("winnerId", func m = optNat(m.winnerId))
        .payload("status", func m = switch (m.status) {
          case (#dijadwalkan) "dijadwalkan";
          case (#berlangsung) "berlangsung";
          case (#selesai) "selesai";
        })
        .payload("scheduledAt", func m = optNat(m.scheduledAt))
        .payload("updatedAt", func m = m.updatedAt)
        .public_()
        .build(),
      OQL.Entity.manual<(Principal, ProfileTypes.UserProfile)>(
        "profile",
        func () = profiles.entries(),
        "Profile",
        "principal",
      )
        .sample((Principal.fromText("aaaaa-aa"), { displayName = "" }))
        .payload("principal", func ((p, _)) = p)
        .payload("displayName", func ((_, prof)) = prof.displayName)
        .ownedByWith("principal", func (caller, owner) = owner == #text(caller.toText()))
        .controllerOrScoped()
        .build(),
    ];
  });

  include ApiDocMixin();
};
