import '../../component-styles/main.css'
import { observer } from 'mobx-react-lite'

const Main = observer(() => {

	return (
		<div>
			<div className="main-banner" id="top">
				<video autoPlay muted loop id="bg-video">
					<source src="../images/gym-video.mp4" type="video/mp4" />
				</video>
				<div className="video-overlay header-text">
					<div className="caption">
						<h6>work harder, get stronger</h6>
						<h2>make workout easy with our <em>app</em></h2>
						<div className="main-button scroll-to-section">
							<a href="#features">Become a member</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
})

export default Main
