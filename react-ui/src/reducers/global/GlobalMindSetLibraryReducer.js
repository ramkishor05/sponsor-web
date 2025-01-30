import { 
   GET_ALL_GLOBAL_MINDSET_LIBRARY_SUCCESS,
   GET_ALL_GLOBAL_MINDSET_LIBRARY_FAIL,
   GET_GLOBAL_MINDSET_LIBRARY_TODAY_SUCCESS,
   GET_GLOBAL_MINDSET_LIBRARY_YESTERDAY_SUCCESS,
   GET_GLOBAL_MINDSET_LIBRARY_LONG_SUCCESS,
   ADD_GLOBAL_MINDSET_LIBRARY_SUCCESS,
   ADD_GLOBAL_MINDSET_LIBRARY_FAIL,
   RENDER_GLOBAL_MINDSET_LIBRARY_TO_EDIT,
   GET_ALL_GLOBAL_MINDSET_LIBRARY_PAGE_SUCCESS
} from '../../types';

const INITIAL_STATE = {
    globalMindSetLibraryPageData: {

    },
    globalMindSetLibraryList: [],
    globalMindSetLibraryList_today: [],
    globalMindSetLibraryList_yesterday: [],
    globalMindSetLibraryList_long: [],
    globalMindSetLibrary_to_edit: {
        name: '',
        desc: '',
        typeId:'',
        glbPromptTagGroupId: 0
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_GLOBAL_MINDSET_LIBRARY_PAGE_SUCCESS:
            return { ...state, globalMindSetLibraryPageData: action.payload };

        case GET_ALL_GLOBAL_MINDSET_LIBRARY_SUCCESS:
            return { ...state, globalMindSetLibraryList: action.payload };

        case GET_ALL_GLOBAL_MINDSET_LIBRARY_FAIL:
            return { ...state };

        case GET_GLOBAL_MINDSET_LIBRARY_TODAY_SUCCESS:
            return { ...state, globalMindSetLibraryList_today: action.payload };

        case GET_GLOBAL_MINDSET_LIBRARY_YESTERDAY_SUCCESS:
            return { ...state, globalMindSetLibraryList_yesterday: action.payload };

        case GET_GLOBAL_MINDSET_LIBRARY_LONG_SUCCESS:
            return { ...state, globalMindSetLibraryList_long: action.payload };

        case ADD_GLOBAL_MINDSET_LIBRARY_SUCCESS:
            return { ...state, openAddGlobalPromptTagModal: false };

        case ADD_GLOBAL_MINDSET_LIBRARY_FAIL:
            return { ...state };

        case RENDER_GLOBAL_MINDSET_LIBRARY_TO_EDIT:
            return { ...state, globalMindSetLibrary_to_edit: action.payload };
    
        default:
            return state;
    }
};









