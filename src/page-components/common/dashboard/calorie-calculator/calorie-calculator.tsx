import { useRef, useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import styles from "../../../../component-styles/calorie-calculator.module.css"

const CalorieCalculator = () => {
	const [bmr, setBmr] = useState(null)
	const macros = [{ name: 'fat', value: Math.round((bmr * 0.30) / 9), kcal: Math.round((bmr * 0.30)) },
		{ name: 'carbs', value: Math.round((bmr * 0.55) / 4), kcal: Math.round((bmr * 0.55)) },
		{ name: 'protein', value: Math.round((bmr * 0.15) / 4), kcal: Math.round((bmr * 0.15)) }]
	const COLORS = ["#FFBB28", "#00C49F", "#FF4412"]
	const formatTooltip = (value) => `${value} g`
	const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
	value,
	name,
	kcal,
	index
	}: any) => {
	const RADIAN = Math.PI / 180;
	const radius = innerRadius + (outerRadius - innerRadius) * 0.35
	const x = cx + radius * Math.cos(-midAngle * RADIAN)
	const y = cy + radius * Math.sin(-midAngle * RADIAN)
	return (
		<text
		style={{fontSize: '10px'}}
			x={x}
			y={y}
			fill="white"
			textAnchor={x > cx ? "start" : "end"}
			dominantBaseline="central">
			{`${kcal} kcal`}
		</text>
	)
}
	const form = useRef<HTMLFormElement>()
	const handleSubmit = (event) => {
		event.preventDefault()
		const age = Number(form?.current.elements['age'].value)
		const gender = form?.current.elements['gender'].value
		const weight = Number(form?.current.elements['weight'].value)
		const height = Number(form?.current.elements['height'].value)
		// const activity = Number(form?.current.elements['activity'].value)
		if (gender === 'female') {
			const bmr = Math.round((10 * weight) + (6.25 * height) - (5 * age) - 161)
			setBmr(bmr)
		} else if (gender === 'male') {
			const bmr = Math.round((10 * weight) + (6.25 * height) - (5 * age) + 5)
			setBmr(bmr)
		}
	}

	return (
		<div className={styles["main-container"]}>
		<form ref={form} onSubmit={handleSubmit} className={styles["form-container"]}>
			<h1>
				Calculate daily calorie intake
			</h1>
			<div className={styles["container"]}>
				<div className={styles["flex-row"]}>
					<span>Gender:</span>
							<div className={styles.label}>
						<label>
							<input value="female" className={styles.input} type="radio" name="gender" id="gender-female" />
							<span className={styles.gender}>Female</span>
						</label>
							</div>
						<div className={styles.label}>
						<label>
							<input value="male" className={styles.input} type="radio" name="gender" id="gender-male" />
							<span className={styles.gender}>Male</span>
						</label>
					</div>
				</div>
				<div className={styles["flex-row"]}>
					<span>Weight:</span>
					<input type="number" name="weight" id="weight" />
					<span>kg</span>
				</div>
				<div className={styles["flex-row"]}>
					<span>Height:</span>
					<input type="number" name="height" id="height" />
					<span>cm</span>
				</div>
				<div className={styles["flex-row"]}>
					<span>Age:</span>
					<input type="number" name="age" id="age" />
				</div>
				{/* to be done https://www.calculator.net/calorie-calculator.html
				 <div className={styles["flex-row"]}>
					<span>Activity:</span>
					<select name="activity" id="activity">
						<option value="1.2">Sedentary (little or no exercise)</option>
						<option value="1.375">Lightly active (light exercise/sports 1-3 days/week)</option>
						<option value="1.55">Moderately active (moderate exercise/sports 3-5 days/week)</option>
						<option value="1.725">Very active (hard exercise/sports 6-7 days a week)</option>
						<option value="1.9">Extra active (very hard exercise/sports & physical job or 2x training)</option>
					</select>
				</div> */}
			</div>
			<button className={styles["button-submit"]} type="submit">Calculate</button>
			</form>
			{bmr
				? <div className={styles["bmr-container"]}>
						<div className={styles["flex-column"]}>
							<span>Basal Metabolic Rate (BMR):</span>
							<span>{bmr} kcal</span>
						</div>
						<ResponsiveContainer width={250} height={200}>
							<PieChart width={400} height={400}>
								<Pie
									labelLine={false}
									dataKey="value"
									nameKey="name"
									data={macros}
									outerRadius={80}
									fill="#82ca9d"
									label={renderCustomizedLabel}>
									{macros.map((entry, index) =>
									(<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
								</Pie>
								<Tooltip formatter={formatTooltip} />
							</PieChart>
						</ResponsiveContainer>
					</div>
				: undefined}
			</div>
		
	)
}

export default CalorieCalculator
