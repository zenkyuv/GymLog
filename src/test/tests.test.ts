import { Suite, assert, expect } from 'cynic';
import { handleMonthNavForwardButtonClick } from '../page-components/common/dashboard/calendar/calendar-buttons';

function makeCalendar(date: any) {
  const days = 5;
  const year = 2021;
  function moveToNextYear() {
    return 20;
  }
  return { days, year, moveToNextYear };
}

const test = {
  //  "buttons to handle months": {
  // 		"1 month forward": async () => {
  // 		 let yearAndMonth = [2022, 3, 19]
  // 		let [year, month, day] = yearAndMonth
  // 		 function setYearAndMonth([nextYear, nextMonth, nextDay]:any) {
  // 			return yearAndMonth = [nextYear,nextMonth,nextDay]
  // 		 }
  // 		 const button:any = handleMonthNavForwardButtonClick({ component: "workoutPanel", setExercisesPanel: true, onYearAndMonthChange: setYearAndMonth, yearAndMonth })
  // 		 expect(button()).equals([2022,3,20])
  // 		//  function e() {
  // 		// 	 const a = 1;
  // 		// 	 const b = 2
  // 		// 	 return a+b
  // 		//  }
  // 		//  expect(e()).equals(2)
  //     },
  //     "1 month backward": async() => {
  //       const a = 1
  //       const b = 2
  //       const c = 3
  //       // benefits of 'assert'
  //       //  - you get a stack trace
  //       //  - you can provide a custom message for each failure
  //       assert((a + b + c) === 6, `sum is wrong`)
  //     }
  //   },
  //   "bravo system": {
  //     "can multiply numbers (expect)": async() => {
  //       const a = 2
  //       const b = 3
  //       // benefits of 'expect'
  //       //  - you get a stack trace
  //       //  - cynic tries to invent a message about the failure
  //       expect(a * b).equals(6)
  //       expect(a * b * a).equals(12)
  //     }
  // }
} as Suite;

export default test;
