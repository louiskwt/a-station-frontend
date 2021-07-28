import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import AuthContext from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Header() {
	const { user, logout, status, message } = useContext(AuthContext);
	const router = useRouter();

	// Strapi Error Handling
	useEffect(() => {
		if (status !== 'success' && message && router.pathname !== '/') {
			toast.error(message, {
				position: 'top-center'
			});
		}

		if (status === 'success' && message) {
			toast.success(message, {
				position: 'top-center',
				autoClose: 2000
			});
		}
	});

	return (
		<>
			<ToastContainer />
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
								Grammar
							</span>
						</Link>

						<Link href='/courses'>
							<span className='nav-link' role='button'>
								付費課程
							</span>
						</Link>
					</Nav>
					<Nav>
						{user && user.type !== 'guest' ? (
							// If logged in
							<>
								<Link href={`/dashboard/${user.username}`}>
									<span className='nav-link' role='button'>
										Hi, {user.username}
									</span>
								</Link>{' '}
								<span
									className='nav-link'
									role='button'
									onClick={logout}
								>
									登出
								</span>
							</>
						) : (
							// If logged out
							<>
								<Link href='/login'>
									<span className='nav-link' role='button'>
										登入
									</span>
								</Link>

								<Link href='/signup'>
									<span className='nav-link' role='button'>
										註冊
									</span>
								</Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
}
