import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AnswerPanel() {
	return (
		<div className='mt-4 col-10 offset-1'>
			<Form>
				<Form.Group>
					<Form.Label>Q1: hello</Form.Label>
					<div>
						<Form.Check
							inline
							name='true'
							type='radio'
							label='Ture'
						/>
						<Form.Check
							inline
							name='true'
							type='radio'
							label='False'
						/>
						<Form.Check
							inline
							name='true'
							type='radio'
							label='NG'
						/>
					</div>
				</Form.Group>
				<Button variant='success' type='submit'>
					Submit
				</Button>
			</Form>
		</div>
	);
}
