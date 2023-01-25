import Wrapper from "../assets/wrappers/SearchContainer"
import { useAppContext } from "../context/appContext"
import { FormRow, FormRowSelect } from "./"
function SearchContainer() {
	const {
		isLoading,
		handleChange,
		clearFilters,
		search,
		searchStatus,
		searchType,
		sort,
		sortOptions,
		jobTypeOptions,
		statusOptions,
	} = useAppContext()
	const handleSearch = (e) => {
		// if (isLoading) return
		handleChange({ name: e.target.name, value: e.target.value })
	}
	return (
		<Wrapper>
			<form className='form'>
				<h4>search form</h4>
				<div className='form-center'>
					<FormRow
						type='text'
						name='search'
						value={search}
						handleChange={handleSearch}
					/>
					<FormRowSelect
						labelText='status'
						name='searchStatus'
						value={searchStatus}
						handleChange={handleSearch}
						options={["all", ...statusOptions]}
					/>
					<FormRowSelect
						labelText='type'
						name='searchType'
						value={searchType}
						handleChange={handleSearch}
						options={["all", ...jobTypeOptions]}
					/>
					<FormRowSelect
						name='sort'
						value={sort}
						handleChange={handleSearch}
						options={sortOptions}
					/>
					<button
						className='btn btn-block btn-danger'
						type='button'
						onClick={clearFilters}
						disabled={isLoading}
					>
						Clear
					</button>
				</div>
			</form>
		</Wrapper>
	)
}
export default SearchContainer
