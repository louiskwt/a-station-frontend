import Form from 'react-bootstrap/Form';

export default function Filter() {
	return (
		<Form className='mt-5'>
			<Form.Control as='select'>
				<option>題型分類</option>
				<option>2</option>
				<option>3</option>
				<option>4</option>
				<option>5</option>
			</Form.Control>
		</Form>
	);
}
