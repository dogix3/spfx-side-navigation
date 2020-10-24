import { IUserProfile } from '../components/SideNav/model/IUserProfile';

export interface IDataService {  
    getUserProfileProperties: () => Promise<IUserProfile>;  
}  