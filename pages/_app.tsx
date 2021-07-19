import type { AppProps as NextAppProps } from "next/app";
import { Provider } from "react-redux";
import "tailwindcss/tailwind.css";
import { useStore } from "../redux-store";
import "../styles/globals.css";
import { JSONData } from "./api/insurance-policies";

type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, "pageProps">;

function App({
  Component,
  pageProps,
}: AppProps<{ insurancePolicies: JSONData[] }>) {
  const store = useStore({
    insurancePolicies: pageProps.insurancePolicies,
    maxDanosPropiedad: 0,
    maxGastosMedicos: 0,
    maxLesionesCorporales: 0,
  })!;

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
export default App;
