import Wrapper from "../assets/wrappers/JobsContainer"
import { useEffect } from "react"
import { useAppContext } from "../context/appContext"
import { Job, Loading, PageBtnContainer } from "./"

function JobsContainer() {
	const {
		getJobs,
		jobs,
		isLoading,
		page,
		totalJobs,
		search,
		searchStatus,
		searchType,
		sort,
		numOfPages,
	} = useAppContext()
	useEffect(() => {
		getJobs()
		// eslint-disable-next-line
	}, [search, searchStatus, searchType, sort, page])

	if (isLoading) {
		return <Loading center={true} />
	}
	if (totalJobs === 0) {
		return (
			<Wrapper>
				<h2>No jobs to display</h2>
			</Wrapper>
		)
	}
	return (
		<Wrapper>
			<h5>
				{totalJobs} job{totalJobs > 1 && "s"} found
			</h5>
			<div className='jobs'>
				{jobs.map((job) => {
					return <Job key={job._id} {...job} />
				})}
			</div>
			{numOfPages > 1 && <PageBtnContainer />}
		</Wrapper>
	)
}
export default JobsContainer
