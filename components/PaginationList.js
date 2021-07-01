import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function PaginationList({ total, PER_PAGE, page, type }) {
	console.log(PER_PAGE);
	console.log(total);

	const totalPage = Math.ceil(total / PER_PAGE);

	// Populating the pagination array
	const pageItems = [];

	for (let number = 1; number <= totalPage; number++) {
		pageItems.push(
			<Pagination.Item
				key={number}
				active={number === page}
				href={`/${type}?page=${number}`}
			>
				{number}
			</Pagination.Item>
		);
	}

	return (
		<Container className='mt-5 text-center'>
			<Row>
				<div className='col-6 offset-4'>
					<Pagination>
						{page > 1 ? (
							<Pagination.Prev
								href={`/${type}?page=${page - 1}`}
							/>
						) : (
							<Pagination.Prev disabled />
						)}

						{pageItems}
						{page < totalPage ? (
							<Pagination.Next
								href={`/${type}?page=${page + 1}`}
							/>
						) : (
							<Pagination.Next disabled />
						)}
					</Pagination>
				</div>
			</Row>
		</Container>
	);
}
