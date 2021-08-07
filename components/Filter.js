import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';

export default function Filter({ tags, type }) {
	console.log(type);
	const router = useRouter();
	const handleChange = (e) => {
		router.push(`/${type}/filter?tag=${e.target.value}`);
	};
	return (
		<Form className='mt-5' onChange={handleChange}>
			<Form.Control as='select'>
				<option>題型篩選</option>
				{tags.map((tag) => (
					<option value={tag} key={tag}>
						{tag}
					</option>
				))}
			</Form.Control>
		</Form>
	);
}
