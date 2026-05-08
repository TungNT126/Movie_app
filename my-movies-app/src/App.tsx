import { BrowserRouter } from "react-router-dom";

import "./App.css";
import AppRoutes from "./routes/AppRoutes";
// import AuthProvider from "./component/AuthProvider";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    // <BrowserRouter>
    //   <AuthProvider>
    //     <AppRoutes />
    //   </AuthProvider>
    // </BrowserRouter>

    <BrowserRouter>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
