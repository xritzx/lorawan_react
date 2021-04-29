import './App.less';
import configureStore from "./redux";
import { Provider } from 'react-redux';
import { GlobalLoader } from "./components"
import { Home } from "./pages";
// CREATING REACT STORE INSTANCE
const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <GlobalLoader />
      <Home />
    </Provider>
  );
}

export default App;
