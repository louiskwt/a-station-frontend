import Form from 'react-bootstrap/Form';

export default function Filter({ tags }) {
	const handleChange = (e) => {
		console.log('fired');
		console.log(e.target.value);
	};
	return (
		<Form className='mt-5' onChange={handleChange}>
			<Form.Control as='select'>
				<option>題型分類</option>
				{tags.map((tag) => (
					<option value={tag} key={tag}>
						{tag}
					</option>
				))}
			</Form.Control>
		</Form>
	);
}
