import { useEffect, useState } from "react"
import Wrapper from "../assets/wrappers/RegisterPage"
import { Logo, FormRow, Alert } from "../components"
import { useAppContext } from "../context/appContext"
import { useNavigate } from "react-router-dom"

const initialState = {
	name: "",
	email: "",
	password: "",
	isMember: true,
}

function Register() {
	const [values, setValues] = useState(initialState)
	const { isLoading, showAlert, displayAlert, setupUser } = useAppContext()

	const { user } = useAppContext()
	const navigate = useNavigate()

	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate("/")
			}, 500)
		}
	}, [user, navigate])

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}
	const onSubmit = (e) => {
		e.preventDefault()
		const { name, email, password, isMember } = values
		if (!email || !password || (!isMember && !name)) {
			displayAlert()
			return
		}
		const currentUser = { name, email, password }
		if (isMember) {
			setupUser({
				currentUser,
				endPoint: "login",
				alertText: "Login successful",
			})
		} else {
			setupUser({
				currentUser,
				endPoint: "register",
				alertText: "Registration successful",
			})
		}
	}
	const toggleMember = () => {
		setValues((prev) => {
			return { ...prev, isMember: !prev.isMember }
		})
	}
	return (
		<Wrapper className='full-page'>
			<form className='form' onSubmit={onSubmit}>
				<Logo />
				<h3>{values.isMember ? "Login" : "Register"} </h3>
				{showAlert && <Alert />}
				{!values.isMember && (
					<FormRow
						values={values.name}
						handleChange={handleChange}
						type='text'
						name='name'
					/>
				)}
				<FormRow
					values={values.email}
					handleChange={handleChange}
					type='email'
					name='email'
				/>
				<FormRow
					values={values.password}
					handleChange={handleChange}
					type='password'
					name='password'
				/>
				<button className='btn btn-block' disabled={isLoading}>
					{values.isMember ? "Login" : "Register"}
				</button>
				<div>
					<p>
						{values.isMember
							? "Not a member?"
							: "Already a member?"}
						<button
							type='button'
							className='member-btn'
							onClick={toggleMember}
						>
							{values.isMember ? "Register" : "Login"}
						</button>
					</p>
				</div>
			</form>
		</Wrapper>
	)
}
export default Register
