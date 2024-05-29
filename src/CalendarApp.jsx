import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { store } from "./store";
import { Provider } from "react-redux";
export const CalendarApp = () => {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </div>
  );
};
