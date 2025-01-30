import { 
    GET_GLOBAL_DASHBOARDS_SUCCESS,
    SHOW_LOADER,
    REMOVE_LOADER
} from '../../types';
import GlobalAccountDashboardService from '../../services/GlobalAccountDashboardService';
import GlobalAccessDashboardService from '../../services/GlobalAccessDashboardService';

// Action creator for getting all dashboards.
export const getGlobalDashboard = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        let accessDashboardResponse = await GlobalAccessDashboardService.find();

        let accountDashboardResponse = await GlobalAccountDashboardService.find();
        let data={};
        if (accountDashboardResponse && accountDashboardResponse.data) {
            data={...accountDashboardResponse.data}
        }
        if (accessDashboardResponse && accessDashboardResponse.data) {
            data={...data, totalUsers: accessDashboardResponse?.data?.totalUsers }
        }
        dispatch({ type: GET_GLOBAL_DASHBOARDS_SUCCESS, payload: data });
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};
