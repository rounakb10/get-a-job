import { useState } from "react"
import Wrapper from "../assets/wrappers/ChartsContainer"
import { useAppContext } from "../context/appContext"
import { BarChart, AreaChart } from "./"
function ChartsContainer() {
	const [barChart, setBarChart] = useState(true)
	const { monthlyApplications: data } = useAppContext()
	return (
		<Wrapper>
			<button type='button' onClick={() => setBarChart(!barChart)}>
				{barChart ? "BarChart" : "AreaChart"}
			</button>
			{barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
		</Wrapper>
	)
}
export default ChartsContainer
