import { createContext, useContext, useReducer } from "react"
import reducer from "./reducer"
import axios from "axios"

import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	SETUP_USER_BEGIN,
	SETUP_USER_SUCCESS,
	SETUP_USER_ERROR,
	TOGGLE_SIDEBAR,
	LOGOUT_USER,
	UPDATE_USER_BEGIN,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_ERROR,
	HANDLE_CHANGE,
	CLEAR_VALUES,
	CREATE_JOB_BEGIN,
	CREATE_JOB_SUCCESS,
	CREATE_JOB_ERROR,
	GET_JOBS_BEGIN,
	GET_JOBS_SUCCESS,
	DELETE_JOB_BEGIN,
	SET_EDIT_JOB,
	EDIT_JOB_BEGIN,
	EDIT_JOB_SUCCESS,
	EDIT_JOB_ERROR,
	SHOW_STATS_BEGIN,
	SHOW_STATS_SUCCESS,
	CLEAR_FILTERS,
	CHANGE_PAGE,
} from "./actions"

const token = localStorage.getItem("token")
const user = localStorage.getItem("user")
const location = localStorage.getItem("location")

const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: "",
	alertType: "",
	user: user ? JSON.parse(user) : null,
	token: token,
	userLocation: location || "",
	showSidebar: false,
	// Jobs
	// setting job states in global context for edit functionality
	isEditing: false,
	editJobId: "",
	position: "",
	company: "",
	jobLocation: location || "",
	jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
	jobType: "full-time",
	statusOptions: ["interview", "declined", "pending"],
	status: "pending",
	// Get Jobs
	jobs: [],
	totalJobs: 0,
	page: 1,
	numOfPages: 1,
	// Stats
	stats: {},
	monthlyApplications: [],
	//Search
	search: "",
	searchStatus: "all",
	searchType: "all",
	sort: "latest",
	sortOptions: ["latest", "oldest", "a-z", "z-a"],
}

const AppContext = createContext()

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const authFetch = axios.create({
		baseURL: "/api/v1",
		// headers: { Authorization: `Bearer ${state.token}` },
	})

	authFetch.interceptors.request.use(
		(config) => {
			config.headers.Authorization = `Bearer ${state.token}`
			return config
		},
		(error) => {
			return Promise.reject(error)
		}
	)

	authFetch.interceptors.response.use(
		(response) => {
			return response
		},
		(error) => {
			// console.log(error.response)
			if (error.response.status === 401) {
				logoutUser()
			}
			return Promise.reject(error)
		}
	)

	const displayAlert = () => {
		dispatch({ type: DISPLAY_ALERT })
		clearAlert()
	}
	const clearAlert = () => {
		setTimeout(() => {
			dispatch({ type: CLEAR_ALERT })
		}, 5000)
	}

	const addUserToLocalStorage = ({ user, token, location }) => {
		localStorage.setItem("user", JSON.stringify(user))
		localStorage.setItem("token", token)
		localStorage.setItem("location", location)
	}
	const removeUserFromLocalStorage = () => {
		localStorage.removeItem("user")
		localStorage.removeItem("token")
		localStorage.removeItem("location")
	}

	const setupUser = async ({ currentUser, endPoint, alertText }) => {
		dispatch({ type: SETUP_USER_BEGIN })
		try {
			const response = await axios.post(
				`/api/v1/auth/${endPoint}`,
				currentUser
			)
			const { user, location, token } = response.data
			dispatch({
				type: SETUP_USER_SUCCESS,
				payload: { user, location, token, alertText },
			})
			addUserToLocalStorage({ user, token, location })
		} catch (err) {
			dispatch({
				type: SETUP_USER_ERROR,
				payload: { msg: err.response.data.msg },
			})
		}
		clearAlert()
	}

	const logoutUser = () => {
		dispatch({ type: LOGOUT_USER })
		removeUserFromLocalStorage({ user, token, location })
	}

	const updateUser = async (currentUser) => {
		dispatch({ type: UPDATE_USER_BEGIN })
		try {
			const response = await authFetch.patch(
				"/auth/updateUser",
				currentUser
			)
			const { user, location, token } = response.data
			dispatch({
				type: UPDATE_USER_SUCCESS,
				payload: { user, location, token },
			})
			addUserToLocalStorage({ user, token, location })
		} catch (err) {
			if (err.response.status !== 401) {
				dispatch({
					type: UPDATE_USER_ERROR,
					payload: { msg: err.response.data.msg },
				})
			}
		}
		clearAlert()
	}

	/*
	 *	  █ █▀█ █▄▄ █▀
	 *	█▄█ █▄█ █▄█ ▄█
	 */

	const createJob = async () => {
		dispatch({ type: CREATE_JOB_BEGIN })
		try {
			let { position, company, jobLocation, jobType, status } = state

			await authFetch.post("/jobs", {
				company,
				position,
				jobLocation,
				jobType,
				status,
			})
			dispatch({ type: CREATE_JOB_SUCCESS })
			dispatch({ type: CLEAR_VALUES })
		} catch (err) {
			if (err.response.status !== 401) {
				dispatch({
					type: CREATE_JOB_ERROR,
					payload: { msg: err.response.data.msg },
				})
			}
		}
		clearAlert()
	}

	const getJobs = async () => {
		const { search, searchStatus, searchType, sort, page } = state
		let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`
		if (search) {
			url = `${url}&search=${search}`
		}
		dispatch({ type: GET_JOBS_BEGIN })
		try {
			const response = await authFetch.get(url)
			const { jobs, totalJobs, numOfPages } = response.data
			dispatch({
				type: GET_JOBS_SUCCESS,
				payload: { jobs, totalJobs, numOfPages },
			})
		} catch (err) {
			logoutUser()
		}
		clearAlert()
	}

	const setEditJob = (id) => {
		dispatch({ type: SET_EDIT_JOB, payload: { id } })
	}

	const editJob = async () => {
		dispatch({ type: EDIT_JOB_BEGIN })
		try {
			let { position, company, jobLocation, jobType, status } = state

			await authFetch.patch(`/jobs/${state.editJobId}`, {
				company,
				position,
				jobLocation,
				jobType,
				status,
			})
			dispatch({ type: EDIT_JOB_SUCCESS })
			dispatch({ type: CLEAR_VALUES })
		} catch (err) {
			if (err.response.status !== 401) {
				dispatch({
					type: EDIT_JOB_ERROR,
					payload: { msg: err.response.data.msg },
				})
			}
		}
		clearAlert()
	}

	const deleteJob = async (id) => {
		dispatch({ type: DELETE_JOB_BEGIN })
		try {
			await authFetch.delete(`/jobs/${id}`)
			getJobs()
		} catch (err) {
			logoutUser()
		}
	}

	const showStats = async () => {
		dispatch({ type: SHOW_STATS_BEGIN })
		try {
			const { data } = await authFetch.get("/jobs/stats")
			dispatch({
				type: SHOW_STATS_SUCCESS,
				payload: {
					stats: data.defaultStats,
					monthlyApplications: data.monthlyApplications,
				},
			})
		} catch (err) {
			logoutUser()
		}
		clearAlert()
	}

	const toggleSidebar = () => {
		dispatch({ type: TOGGLE_SIDEBAR })
	}

	const handleChange = ({ name, value }) => {
		dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
	}

	const clearValues = () => {
		dispatch({ type: CLEAR_VALUES })
	}

	const clearFilters = () => {
		dispatch({ type: CLEAR_FILTERS })
	}

	const changePage = (page) => {
		dispatch({ type: CHANGE_PAGE, payload: { page } })
	}

	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				clearAlert,
				setupUser,
				toggleSidebar,
				logoutUser,
				updateUser,
				handleChange,
				clearValues,
				createJob,
				getJobs,
				setEditJob,
				editJob,
				deleteJob,
				showStats,
				clearFilters,
				changePage,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

const useAppContext = () => {
	return useContext(AppContext)
}

export { AppProvider, useAppContext, initialState }
