const FormRowSelect = ({ value, handleChange, name, labelText, options }) => {
	return (
		<div className='form-row'>
			<label htmlFor={name} className='form-label'>
				{labelText || name}
			</label>
			<select
				name={name}
				className='form-select'
				value={value}
				onChange={handleChange}
			>
				{options.map((item, index) => {
					return (
						<option key={index} value={item}>
							{item}
						</option>
					)
				})}
			</select>
		</div>
	)
}

export default FormRowSelect
