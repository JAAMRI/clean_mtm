export interface MenuPage {
    name: string;
    route?: string;
    action?: Function;
    active?: boolean;
    toggled?: boolean;
    subPages?: MenuPage[];
}
