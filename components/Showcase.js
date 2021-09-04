import styles from '@/styles/Showcase.module.css';
import Link from 'next/link';

export default function Showcase() {
	const questionType = ['readings', 'grammar'];
	const getRandomInt = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1) + min);
	};
	let randomInt = getRandomInt(0, 1);
	return (
		<div className={styles.showcase}>
			<h2>Welcome to A-Station</h2>
			<h3>你的線上英文練習平台</h3>
			<Link href={`/${questionType[randomInt]}`}>
				<a className='btn btn-outline-light mt-3'>開始練習</a>
			</Link>
		</div>
	);
}
