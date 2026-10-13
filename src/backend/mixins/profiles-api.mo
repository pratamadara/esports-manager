import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/profiles";
import ProfilesLib "../lib/profiles";

mixin (
  accessControlState : AccessControl.AccessControlState,
  profiles : Map.Map<Principal, Types.UserProfile>,
) {
  public query ({ caller }) func getCallerUserProfile() : async ?Types.UserProfile {
    ProfilesLib.getProfile(profiles, caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : Types.UserProfile) : async () {
    ProfilesLib.saveProfile(profiles, caller, profile);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?Types.UserProfile {
    ProfilesLib.getProfile(profiles, user);
  };
};
