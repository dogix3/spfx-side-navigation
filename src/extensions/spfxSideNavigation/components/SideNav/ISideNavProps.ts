import { ServiceScope } from '@microsoft/sp-core-library';

export default interface ISideNavProps {
    description: string;
    userName: string;
    serviceScope: ServiceScope;
}
