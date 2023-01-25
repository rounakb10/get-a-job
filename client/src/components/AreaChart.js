import {
	AreaChart as AChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts"
function AreaChart({ data }) {
	return (
		<ResponsiveContainer width='100%' height={300}>
			<AChart data={data} margin={{ top: 50 }}>
				<CartesianGrid strokeDasharray='3 3 ' />
				<XAxis dataKey='date' />
				<YAxis allowDecimals={false} />
				<Tooltip />
				<Area
					type='monotone'
					dataKey='count'
					stroke='#2cb1bc'
					fill='#bef8fd'
				/>
			</AChart>
		</ResponsiveContainer>
	)
}
export default AreaChart
