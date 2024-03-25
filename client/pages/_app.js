import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import { store} from '../store'
import { Provider } from 'react-redux'

// Subsets are really important. CHECK BELOW FOR MORE INFO
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }) {
  return (
<Provider store={store}>
    <main className={poppins.className}>
      <div className="bg-primary bg-opacity-5">
        <Component {...pageProps} />
      </div>
    </main>
    </Provider>
  );
}
