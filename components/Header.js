import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';

export default function Header() {
	return (
		<Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
			<Link href='/'>
				<Navbar.Brand>A-Station</Navbar.Brand>
			</Link>
			<Navbar.Toggle aria-controls='responsive-header' />
			<Navbar.Collapse id='responsive-header'>
				<Nav className='mr-auto'>
					<Link href='/reading'>
						<Nav.Link>Reading</Nav.Link>
					</Link>
					<Link href='/writing'>
						<Nav.Link>Writing</Nav.Link>
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
