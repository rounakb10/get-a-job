const FormRow = ({ value, handleChange, type, name, labelText }) => {
	return (
		<div className='form-row'>
			<label htmlFor={type} className='form-label'>
				{labelText || name}
			</label>
			<input
				type={type}
				name={name}
				className='form-input'
				value={value}
				onChange={handleChange}
			/>
		</div>
	)
}

export default FormRow
