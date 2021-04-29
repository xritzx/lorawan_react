const initialState = {
    activeLoaderType1: 0,
}

const Loader = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING':
            let lc = state.activeLoaderType1;
            if (action.payload) {
                lc++
            } else {
                lc = lc === 0 ? 0 : lc - 1;
            }
            return {
                ...state,
                activeLoaderType1: lc,
            };
        default:
            return state;
    }
}

export default Loader
