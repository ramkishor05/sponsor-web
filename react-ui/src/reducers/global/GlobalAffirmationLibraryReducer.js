import { 
   GET_ALL_GLOBAL_AFFIRMATION_LIBRARY_SUCCESS,
   GET_ALL_GLOBAL_AFFIRMATION_LIBRARY_FAIL,
   GET_GLOBAL_AFFIRMATION_LIBRARY_TODAY_SUCCESS,
   GET_GLOBAL_AFFIRMATION_LIBRARY_YESTERDAY_SUCCESS,
   GET_GLOBAL_AFFIRMATION_LIBRARY_LONG_SUCCESS,
   ADD_GLOBAL_AFFIRMATION_LIBRARY_SUCCESS,
   ADD_GLOBAL_AFFIRMATION_LIBRARY_FAIL,
   RENDER_GLOBAL_AFFIRMATION_LIBRARY_TO_EDIT,
   GET_ALL_GLOBAL_AFFIRMATION_LIBRARY_PAGE_SUCCESS
} from '../../types';

const INITIAL_STATE = {
    globalAffirmationLibraryPageData: {
        pageCount: 7
    },
    globalAffirmationLibraryList: [],
    globalAffirmationLibraryList_today: [],
    globalAffirmationLibraryList_yesterday: [],
    globalAffirmationLibraryList_long: [],
    globalAffirmationLibrary_to_edit: {
        name: '',
        desc: '',
        typeId:'',
        glbPromptTagGroupId: 0
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_GLOBAL_AFFIRMATION_LIBRARY_PAGE_SUCCESS:
            return { ...state, globalAffirmationLibraryPageData: action.payload };

        case GET_ALL_GLOBAL_AFFIRMATION_LIBRARY_SUCCESS:
            return { ...state, globalAffirmationLibraryList: action.payload };

        case GET_ALL_GLOBAL_AFFIRMATION_LIBRARY_FAIL:
            return { ...state };

        case GET_GLOBAL_AFFIRMATION_LIBRARY_TODAY_SUCCESS:
            return { ...state, globalAffirmationLibraryList_today: action.payload };

        case GET_GLOBAL_AFFIRMATION_LIBRARY_YESTERDAY_SUCCESS:
            return { ...state, globalAffirmationLibraryList_yesterday: action.payload };

        case GET_GLOBAL_AFFIRMATION_LIBRARY_LONG_SUCCESS:
            return { ...state, globalAffirmationLibraryList_long: action.payload };

        case ADD_GLOBAL_AFFIRMATION_LIBRARY_SUCCESS:
            return { ...state, openAddGlobalPromptTagModal: false };

        case ADD_GLOBAL_AFFIRMATION_LIBRARY_FAIL:
            return { ...state };

        case RENDER_GLOBAL_AFFIRMATION_LIBRARY_TO_EDIT:
            return { ...state, globalAffirmationLibrary_to_edit: action.payload };
    
        default:
            return state;
    }
};









