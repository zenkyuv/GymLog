import { daysOfCurrentMonths } from "./helpers";


export function handleMonthNavBackButtonClick({ component, yearAndMonth, onYearAndMonthChange }: {
	component: string
	yearAndMonth: any
	onYearAndMonthChange: any
}) {
	console.log(yearAndMonth)
	const [year, month, day] = yearAndMonth;
	let prevDay = day - 1
	let nextYear = year;
	let nextMonth = month;
	if (component === "workoutPanel") {
		if (prevDay < 1) {
			nextMonth -= 1
			prevDay = daysOfCurrentMonths
		}
	}
		else if (component === 'calendar') {
		nextMonth -= 1;
	}
			if (nextMonth === 0) {
			nextMonth = 12;
			nextYear = year - 1;
		}
		onYearAndMonthChange([nextYear, nextMonth, prevDay]);
}

export function handleMonthNavForwardButtonClick({component, yearAndMonth, onYearAndMonthChange }:
	{	
		component:any
		yearAndMonth: any
		onYearAndMonthChange: any
	}) {
	const [year, month, day] = yearAndMonth;
    let nextYear = year;
	let nextMonth = month;
	let nextDay = day + 1;
	if(component === "workoutPanel") {
	if (nextDay > daysOfCurrentMonths) {
		nextDay = 1
		nextMonth += 1;
		}
	}
	else if (component === 'calendar') {
		nextMonth += 1;
	}
    if (nextMonth === 13) {
      nextMonth = 1;
      nextYear = year + 1;
    }
    onYearAndMonthChange([nextYear, nextMonth, nextDay]);
};
	

export function renderButtons(componentBetween:any, component:any, yearAndMonth:any, onYearAndMonthChange:any) {
	return (
		<div className="time-cnt">
			<button onClick={() => handleMonthNavBackButtonClick({ component, yearAndMonth, onYearAndMonthChange })}>{"<"}</button>
				{componentBetween}
			<button onClick={() => handleMonthNavForwardButtonClick({component,yearAndMonth, onYearAndMonthChange})}>{">"}</button>
		</div>	
	)

}