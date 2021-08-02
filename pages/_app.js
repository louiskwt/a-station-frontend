import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from '@/context/AuthContext';
import { ScoreProvider } from '@/context/ScoreContext';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<link rel='icon' href='/favicon.png' />
			</Head>
			<AuthProvider>
				<ScoreProvider>
					<Component {...pageProps} />
				</ScoreProvider>
			</AuthProvider>
		</>
	);
}

export default MyApp;
