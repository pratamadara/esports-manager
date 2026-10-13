import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Types "../types/profiles";

module {
  public func getProfile(profiles : Map.Map<Principal, Types.UserProfile>, user : Principal) : ?Types.UserProfile {
    profiles.get(user);
  };

  public func saveProfile(
    profiles : Map.Map<Principal, Types.UserProfile>,
    user : Principal,
    profile : Types.UserProfile,
  ) : () {
    profiles.add(user, profile);
  };
};
