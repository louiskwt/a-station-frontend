import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import { useRouter } from 'next/router';

export default function Header() {
	const router = useRouter();
	return (
		<Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
			<Link href='/'>
				<a className='navbar-brand'>A-Station</a>
			</Link>
			<Navbar.Toggle aria-controls='responsive-header' />
			<Navbar.Collapse id='responsive-header'>
				<Nav className='mr-auto'>
					<Link href='/readings'>
						<span className='nav-link' role='button'>
							Reading
						</span>
					</Link>
					<Link href='/writings' className='nav-link'>
						<span className='nav-link' role='button'>
							Writing
						</span>
					</Link>
				</Nav>
				<Nav>
					{router.pathname === '/' ? (
						<Link href='/login'>
							<span className='nav-link' role='button'>
								登入
							</span>
						</Link>
					) : (
						' '
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
