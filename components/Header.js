import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';

export default function Header() {
	return (
		<Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
			<Link href='/'>
				<a className='navbar-brand'>A-Station</a>
			</Link>
			<Navbar.Toggle aria-controls='responsive-header' />
			<Navbar.Collapse id='responsive-header'>
				<Nav className='mr-auto'>
					<Link href='/reading'>
						<span className='nav-link' role='button'>
							Reading
						</span>
					</Link>
					<Link href='/writing' className='nav-link'>
						<span className='nav-link' role='button'>
							Writing
						</span>
					</Link>
				</Nav>
				<Nav>
					<Link href='/login'>
						<Nav.Link>登入</Nav.Link>
					</Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
