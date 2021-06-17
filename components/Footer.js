import Link from 'next/link';
import styles from '@/styles/Footer.module.css';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<p>Copyright &copy; A-Station 2021</p>
			<div className={styles.contact}>
				<Link href='https://wa.me/85263520220'>
					<a className={styles.wa}>
						<FaWhatsapp size={36} />
					</a>
				</Link>
				<Link href='https://www.instagram.com/louis_tkw'>
					<a className={styles.ig}>
						<FaInstagram size={36} />
					</a>
				</Link>
			</div>
			<p>This is a project created for all the DSE students</p>
		</footer>
	);
}
