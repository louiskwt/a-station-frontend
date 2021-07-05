import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from '@/context/AuthContext';
import { ScoreProvider } from '@/context/ScoreContext';

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<ScoreProvider>
				<Component {...pageProps} />
			</ScoreProvider>
		</AuthProvider>
	);
}

export default MyApp;
