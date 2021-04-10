import { homeStoreName, IHomeState } from '../home/store/home.store';

export interface IAppState {
    [homeStoreName]: IHomeState;
}
