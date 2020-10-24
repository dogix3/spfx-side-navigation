import ISideNavItem from "./model/ISideNavItem";
import {IUserProfile} from "./model/IUserProfile";

export default interface ISideNavState {
  siteNavItems: ISideNavItem[];
  isOpened: boolean;
  userProfileItems: IUserProfile
}