import styles from '../../component-styles/main.module.css'
import { observer } from 'mobx-react-lite'
import saveImg from "../../images/save.svg"
import weightImg from "../../images/weight.svg"
import calendarImg from "../../images/calendar.svg"
import doubleArrowDownImg from "../../images/double-arrow.svg"

const Main = observer(() => {

	return (
		<main>
			<section className={styles["first-section"]}>
			<div className={styles["main-container"]}>
				<div className={styles["text-container"]}>
					<h1 className={styles["h1-main"]}>GYM<span>LOG</span></h1>
					<h2 className={styles["h2-main"]}>Simple workout tracker</h2>
				</div>
				<img className={styles["double-arrow"]} src={doubleArrowDownImg} alt="arrow-down" />
			</div>
		</section>
			<section className={styles["second-section"]}>
				<div className={styles['second-container']}>
					<h1 className={styles["h1-second-section"]}>Features</h1>
					<div className={styles["container"]}>
						<img src={saveImg} alt="save" />
						<p>
							Workout data is saved on our database, simply create an account and dont worry
							about losing any of your workout logs
						</p>
					</div>
					<div className={styles["container"]}>
						<img src={weightImg} alt="weight" />
						<p>
							View and navigate daily workout logs quickly by swiping between them, add an exercise
							to the workout log and record sets of weight, reps, and more ..
						</p>
					</div>
					<div className={styles["container"]}>
						<img src={calendarImg} alt="calendar" />
						<p>
							Dates on which you have recorded training logs are highlighted, click a day in the
							calendar to display a popup listing the exercises performed on that day
						</p>
					</div>
				</div>
			</section>
		</main>
	)
})

export default Main
