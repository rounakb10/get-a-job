import Wrapper from "../../assets/wrappers/DashboardFormPage"
import { useAppContext } from "../../context/appContext"
import { FormRow, Alert, FormRowSelect } from "../../components"

function AddJob() {
	const {
		isLoading,
		showAlert,
		displayAlert,
		position,
		company,
		jobLocation,
		jobType,
		jobTypeOptions,
		status,
		statusOptions,
		isEditing,
		handleChange,
		clearValues,
		createJob,
		editJob,
	} = useAppContext()

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!position || !company || !jobLocation) {
			displayAlert()
			return
		}

		if (isEditing) {
			editJob()
			return
		}

		createJob()
		console.log("create job")
	}
	const handleJobInput = (e) => {
		const name = e.target.name
		const value = e.target.value
		handleChange({ name, value })
		// console.log(`${name}: ${value}`)
	}

	return (
		<Wrapper>
			<form className='form' onSubmit={handleSubmit}>
				<h3>{isEditing ? "edit job" : "add job"}</h3>
				{showAlert && <Alert />}
				<div className='form-center'>
					<FormRow
						type='text'
						name='position'
						value={position}
						handleChange={handleJobInput}
					/>
					<FormRow
						type='text'
						name='company'
						value={company}
						handleChange={handleJobInput}
					/>
					<FormRow
						type='text'
						labelText='job location'
						name='jobLocation'
						value={jobLocation}
						handleChange={handleJobInput}
					/>
					<FormRowSelect
						value={jobType}
						handleChange={handleJobInput}
						name='jobType'
						labelText='job type'
						options={jobTypeOptions}
					/>
					<FormRowSelect
						value={status}
						handleChange={handleJobInput}
						name='status'
						options={statusOptions}
					/>
					<div className='btn-container'>
						<button
							className='btn btn-block submit-btn'
							type='submit'
							disabled={isLoading}
						>
							Submit
						</button>
						<button
							className='btn btn-block clear-btn'
							type='button'
							onClick={clearValues}
							disabled={isLoading}
						>
							Clear
						</button>
					</div>
				</div>
			</form>
		</Wrapper>
	)
}
export default AddJob
