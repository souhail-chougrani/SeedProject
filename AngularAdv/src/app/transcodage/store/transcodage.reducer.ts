import * as TRANSCODAGE from './transcodage.action';
import { AppState } from 'src/app/core/core.state';

export interface State  extends AppState{
       transcodage:any  
};

const initialState: State = {
       transcodage:"Test init"  
        
};

export function reducer(state = initialState, action: TRANSCODAGE.TranscodageActions ): State {
    switch (action.type) {
        case TRANSCODAGE.TranscodageActionTypes.Verb1: {
            return {
            ...state
            };
        }

        default: {
            return state;
        }
    }
}