import { combineReducers } from 'redux'
import Loader from "./loaderReducer";

const createRootReducer = () => {
    return combineReducers({
        Loader,
    });
}


export default createRootReducer;
