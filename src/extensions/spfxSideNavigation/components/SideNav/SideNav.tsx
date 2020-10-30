import * as React from "react";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import SideNavNode from "./SideNavNode";
import ISideNavItem from "./model/ISideNavItem";
import ISideNavProvider from "./provider/ISideNavProvider";
import SideNavProvider from "./provider/SideNavProvider";
import ISideNavProps from "./ISideNavProps";
import ISideNavState from "./ISideNavState";
//exportaciones para consumir la clase de user profile
import { IUserProfile } from './model/IUserProfile';
//objetos de pnp
import * as pnp from 'sp-pnp-js';
// Clase de objetos
export class UserProfile implements IUserProfile {
    FirstName: string;
    LastName: string;
    Email: string;
    Title: string;
    WorkPhone: string;
    DisplayName: string;
    Department: string;
    PictureURL: string;
    BirthDate: string;
    UserProfileProperties: Array<any>;
}

export default class SideNav extends React.Component<
    ISideNavProps,
    ISideNavState
    > {
    private sideNavProvider: ISideNavProvider;

    constructor(props: ISideNavProps) {
        super(props);
        pnp.setup({
            sp: {
                baseUrl: "https://ulacitcr.sharepoint.com/"
            }
        });
        this.state = {
            siteNavItems: [],
            isOpened: true,
            userProfileItems: new UserProfile()
        };
        window.addEventListener("click", this.handleOutsideClick, true);
    }

    public componentWillMount(): void {
        this.sideNavProvider = new SideNavProvider();
    }

    public componentDidMount(): void {
        this.sideNavProvider
            .getSideNav()
            .then((result: ISideNavItem[]): void => {
                this.setState({
                    siteNavItems: result
                });
            })
            .catch((error) => {
                // console.log(error);
            });

        this.GetUserProperties();
    }

    public render(): JSX.Element {
        const siteMenuClass: string = this.state.isOpened
            ? "site-menu opened"
            : "site-menu";
        // const toggleIconName: string = this.state.isOpened
        //   ? "DoubleChevronLeft8"
        //   : "DoubleChevronRight8";

        const toggleIconName: string = "CollapseMenu";
        return (
            <div
                className={`site-menu-panel ms-slideRightIn40 visible-i`}
                style={{
                    visibility: "hidden"
                }} /* set to hidden then onces css loads it will be visible */
            >
                <div className={siteMenuClass}>
                    {/* Se agrega contenedor para el logo */}
                    <div className={`LogoContainer ${this.state.isOpened ? "ShowIcon" : "HideIcon"}`}>
                        <img src={require('../../../../../images/ULACIT-logo.svg')} className={"MenuMainLogo"} />
                    </div>
                    <div className="menu-toggle">
                        {
                            <IconButton
                                className="site-menu-icon"
                                checked={false}
                                iconProps={{
                                    iconName: toggleIconName
                                }}
                                title="Toggle Menu"
                                ariaLabel="Toggle Menu"
                                onClick={this.toggleNav}
                            />
                        }
                    </div>
                    {/* Se agrega sección para la información del perfil de la persona */}
                    {
                        this.state.isOpened ?
                            <div className={"MainContainUserData"}>
                                <div className={"userProfilePic"}>
                                    <img src={this.state.userProfileItems.PictureURL ? this.state.userProfileItems.PictureURL : require("../../../../../images/default-user.jpg")} alt="Perfil" />
                                </div>
                                <div className={"userProfileInfo"}>
                                    <div className={"saludo"}>
                                        Bienvenido
                </div>
                                    <div className={"userBame"}>
                                        {`${this.state.userProfileItems.FirstName} ${this.state.userProfileItems.LastName}`}
                                    </div>
                                    <div className={"birthDate"}>
                                        {`${this.state.userProfileItems.BirthDate}`}
                                    </div>
                                </div>

                            </div> : ""
                    }
                    <hr />
                    {this.state.siteNavItems.length > 0 &&
                        this.state.siteNavItems.map(this.renderSideNavNodes)}

                    <hr />
                    <div className="site-nav-node">
                        <div role="menu">
                            <div className="icon-node ms-fadeIn400">
                                <div className="icon ms-fadeIn400 sideNavElemetns">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g id="_26.PEOPLE" data-name="26.PEOPLE"><path d="M16,14.51A14.07,14.07,0,0,0,2,28.56V29a1,1,0,0,0,1,1h26.1a1,1,0,0,0,1-1v-.46A14.07,14.07,0,0,0,16,14.51ZM4,28a12.05,12.05,0,0,1,24.08,0Z"></path><path d="M16,13.61a5.75,5.75,0,0,0,5.66-5.82A5.75,5.75,0,0,0,16,2a5.75,5.75,0,0,0-5.66,5.82A5.75,5.75,0,0,0,16,13.61ZM16,4a3.75,3.75,0,0,1,3.66,3.82A3.75,3.75,0,0,1,16,11.61a3.75,3.75,0,0,1-3.66-3.82A3.75,3.75,0,0,1,16,4Z"></path></g></svg>
                                </div>
                                {
                                    this.state.isOpened ? <div>
                                        <div className="title noselect">Account details</div>
                                    </div> : ""
                                }
                            </div>
                        </div>
                    </div>
                    <div className="site-nav-node">
                        <div role="menu">
                            <div className="icon-node ms-fadeIn400">
                                <div className="icon ms-fadeIn400 sideNavElemetns">
                                    <svg width="20px" height="20px" viewBox="0 0 25 25" version="1.1"><desc>Created with Sketch.</desc><polygon id="Path" points="0 0 24 0 24 24 0 24" style={{ fill: "transparent" }}></polygon><path d="M11,18 L13,18 L13,16 L11,16 L11,18 Z M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z M12,20 C7.59,20 4,16.41 4,12 C4,7.59 7.59,4 12,4 C16.41,4 20,7.59 20,12 C20,16.41 16.41,20 12,20 Z M12,6 C9.79,6 8,7.79 8,10 L10,10 C10,8.9 10.9,8 12,8 C13.1,8 14,8.9 14,10 C14,12 11,11.75 11,15 L13,15 C13,12.75 16,12.5 16,10 C16,7.79 14.21,6 12,6 Z" id="🔹-Icon-Color" fill="inherit"></path></svg>
                                </div>
                                <div>
                                    {
                                        this.state.isOpened ? <div>
                                            <div className="title noselect">Help</div>
                                        </div> : ""
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                </div>
            </div>
        );
    }

    private handleOutsideClick = (event: any) => {
        if (!this.state.isOpened) { return; } // if site nav is already closed, abort

        let foundSideNavPanel: boolean = false;
        for (let i: number = 0; i < event.path.length; i++) {
            const node: HTMLElement = event.path[i];
            if (!node.className) { continue; } // skip if no class name
            if (node.className.toLowerCase().indexOf("site-menu-panel") !== -1) {
                foundSideNavPanel = true;
                break;
            }
        }

        if (!foundSideNavPanel) {
            this.toggleNav(); // if no site menu panel found, close the site menu
        }
    };

    private toggleNav = (): void => {
        this.setState((state, props) => ({
            isOpened: !state.isOpened
        }));
    };

    private renderSideNavNodes = (
        siteNavItem: ISideNavItem,
        index: number
    ): JSX.Element => {
        return (
            <SideNavNode
                key={index}
                siteNavItem={siteNavItem}
                navIsOpened={this.state.isOpened}
            />
        );
    };

    private GetUserProperties(): void {

        pnp.sp.profiles.myProperties.get().then((result) => {
            var userProperties = result.UserProfileProperties;
            var userPropertyValues = "";
            let newUserProfile: IUserProfile = new UserProfile();
            userProperties.forEach(function (property) {
                if (property.Key == "FirstName") {
                    newUserProfile.FirstName = property.Value;
                }
                if (property.Key == "LastName") {
                    newUserProfile.LastName = property.Value;
                }
                if (property.Key == "UserName") {
                    var _url = `https://outlook.office.com/owa/service.svc/s/GetPersonaPhoto?email=${property.Value}&UA=0&size=HR96x96`
                    // newUserProfile.PictureURL = property.Value.replace( /:[a-zA-Z0-9_.:-]+/, '' )
                    newUserProfile.PictureURL = _url;
                }
                if (property.Key == "SPS-Birthday") {
                    if (property.Value == "") {
                        newUserProfile.BirthDate = "";
                    } else {
                        console.log(property.Value);
                        newUserProfile.BirthDate = property.Value.split(" ")[0];
                    }
                }
                // console.log(property.Key, property.Value);
            });

            // document.getElementById("spUserProfileProperties").innerHTML = userPropertyValues;
            this.setState({ userProfileItems: newUserProfile });
        }).catch(function (error) {

            console.log("Error: " + error);

        });

    }
}
