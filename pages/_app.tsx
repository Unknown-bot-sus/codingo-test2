import { AppPropsWithLayout } from "types/page";
import { Provider } from "react-redux";
import "@/styles/global.scss";
import { wrapper } from "@/store/store";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <>{page}</>);
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      {getLayout(<Component {...props.pageProps} />)}
    </Provider>
  );
}

export default MyApp;
