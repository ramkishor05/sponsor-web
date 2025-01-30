import { GET_ALL_ACCESS_SPONSOR_SUCCESS, GET_ONE_ACCESS_SPONSOR_SUCCESS, GET_PAGE_ACCESS_SPONSOR_SUCCESS} from '../types';

const INITIAL_STATE = {
    accessSponsor:{
    },
    accessSponsorList:[],

    accessSponsorPageData:{
        elements: []
    }
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_ACCESS_SPONSOR_SUCCESS:
            return { ...state, accessSponsorList: action.payload };

        case GET_ONE_ACCESS_SPONSOR_SUCCESS:
            return { ...state, accessSponsor: action.payload};

        case GET_PAGE_ACCESS_SPONSOR_SUCCESS:
                return { ...state, accessSponsorPageData: action.payload};
        default:
            return state;
    }
    
};