import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Footer from './Footer';
import Header from './Header';
import { useRouter } from 'next/router';
import Showcase from './Showcase';

export default function Layout({ title, keywords, description, children }) {
	const router = useRouter();
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name='keywords' content={keywords} />
				<meta name='description' content={description} />
			</Head>
			<Header />
			{router.pathname === '/' && <Showcase />}

			<Container>{children}</Container>
			<Footer />
		</div>
	);
}

Layout.defaultProps = {
	title: 'A-station | 你的線上英文練習平台',
	description:
		'隨時隨地在線練習英文，幫你鞏固你的英文知識同技能，適合準備緊DSE同IELTS的考生。幫肋學生去克服學英文就是我們的使命。',
	keywords: 'DSE, DSE English, IELTS, 雅思, 英文練習, 學英文'
};
