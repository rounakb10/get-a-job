import { useEffect } from "react"
import { useAppContext } from "../../context/appContext"
import { ChartsContainer, Loading, StatsContainer } from "../../components"

function Stats() {
	const { showStats, isLoading } = useAppContext()
	useEffect(() => {
		showStats()
		// eslint-disable-next-line
	}, [])

	if (isLoading) {
		return <Loading center />
	}

	return (
		<>
			<StatsContainer />
			{<ChartsContainer />}
		</>
	)
}
export default Stats
