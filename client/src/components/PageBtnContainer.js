import Wrapper from "../assets/wrappers/PageBtnContainer"
import { useAppContext } from "../context/appContext"
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi"
function PageBtnContainer() {
	const { numOfPages, page, changePage } = useAppContext()

	let pages = []
	for (let i = 1; i <= numOfPages; i++) {
		pages[i] = i
	}

	const nextPage = () => {
		let newPage = page + 1
		if (newPage <= numOfPages) {
			changePage(newPage)
		}
	}
	const prevPage = () => {
		let newPage = page - 1
		if (newPage >= 1) {
			changePage(newPage)
		}
	}

	return (
		<Wrapper>
			<button
				className='prev-btn'
				disabled={page === 1}
				onClick={prevPage}
			>
				Prev
				<HiChevronDoubleLeft />
			</button>
			<div className='btn-container'>
				{pages.map((pageNum) => (
					<button
						key={pageNum}
						className={`pageBtn ${pageNum === page && "active"}`}
						onClick={() => changePage(pageNum)}
					>
						{pageNum}
					</button>
				))}
			</div>
			<button
				className='next-btn'
				disabled={page === numOfPages}
				onClick={nextPage}
			>
				Next
				<HiChevronDoubleRight />
			</button>
		</Wrapper>
	)
}
export default PageBtnContainer
