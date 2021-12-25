import React from "react";

function Main() {

	return (
		<div>
		<div className="main-banner" id="top">
		<video autoPlay muted loop id="bg-video">
			<source src="assets/images/gym-video.mp4" type="video/mp4" />
		</video>
		<div className="video-overlay header-text">
			<div className="caption">
				<h6>work harder, get stronger</h6>
				<h2>ease with our <em>app</em></h2>
				<div className="main-button scroll-to-section">
					<a href="#features">Become a member</a>
				</div>
			</div>
		</div>
	</div>
	<section className="section" id="features">
		<div className="container">
			<div className="section-heading">
				<h2>App <em>Features</em></h2>
				<img src="assets/images/line-dec.png" alt="waves" />
				<p>GymLog is a workout tracker with a focus on simplicity and clean design.</p>
			</div>
			<ul className="features-items">
				<li className="feature-item">
					<div className="left-icon">
						<img src="assets/images/features-first-icon.png" alt="First One" />
					</div>
					<div className="right-content">
						<h4>Basic Fitness</h4>
						<p>Please do not re-distribute this template ZIP file on any template collection website. This is not
							allowed.</p>
						<a href="#/" className="text-button">Discover More</a>
					</div>
				</li>
				<li className="feature-item">
					<div className="left-icon">
						<img src="assets/images/features-first-icon.png" alt="second one" />
					</div>
					<div className="right-content">
						<h4>New Gym Training</h4>
						<p>If you wish to support TemplateMo website via PayPal, please feel free to contact us. We appreciate it a
							lot.</p>
						<a href="#/" className="text-button">Discover More</a>
					</div>
				</li>
				<li className="feature-item">
					<div className="left-icon">
						<img src="assets/images/features-first-icon.png" alt="third gym training" />
					</div>
					<div className="right-content">
						<h4>Basic Muscle Course</h4>
						<p>Credit goes to <a rel="nofollow noreferrer" href="https://www.pexels.com" target="_blank">Pexels website</a> for
							images and video background used in this HTML template.</p>
						<a href="#/" className="text-button">Discover More</a>
					</div>
				</li>
			</ul>
			<ul className="features-items">
				<li className="feature-item">
					<div className="left-icon">
						<img src="assets/images/features-first-icon.png" alt="fourth muscle" />
					</div>
					<div className="right-content">
						<h4>Advanced Muscle Course</h4>
						<p>You may want to browse through <a rel="nofollow" href="https://templatemo.com/tag/digital-marketing"
								target="_parent">Digital Marketing</a> or <a href="https://templatemo.com/tag/corporate">Corporate</a>
							HTML CSS templates on our website.</p>
						<a href="#/" className="text-button">Discover More</a>
					</div>
				</li>
				<li className="feature-item">
					<div className="left-icon">
						<img src="assets/images/features-first-icon.png" alt="training fifth" />
					</div>
					<div className="right-content">
						<h4>Yoga Training</h4>
						<p>This template is built on Bootstrap v4.3.1 framework. It is easy to adapt the columns and sections.</p>
						<a href="#/" className="text-button">Discover More</a>
					</div>
				</li>
				<li className="feature-item">
					<div className="left-icon">
						<img src="assets/images/features-first-icon.png" alt="gym training" />
					</div>
					<div className="right-content">
						<h4>Body Building Course</h4>
						<p>Suspendisse fringilla et nisi et mattis. Curabitur sed finibus nisi. Integer nibh sapien, vehicula et
							auctor.</p>
						<a href="#/" className="text-button">Discover More</a>
					</div>
				</li>
			</ul>
		</div>
	</section>
	<section className="section" id="call-to-action">
		<div className="row">
			<div className="cta-content">
				<h2>Don’t <em>think</em>, begin <em>today</em>!</h2>
				<p>Ut consectetur, metus sit amet aliquet placerat, enim est ultricies ligula, sit amet dapibus odio augue eget
					libero. Morbi tempus mauris a nisi luctus imperdiet.</p>
				<div className="main-button scroll-to-section">
					<a href="#our-classes">Become a member</a>
				</div>
			</div>
		</div>
	</section>
	<section className="section" id="our-classes">
		<div className="row">
			<div className="section-heading">
				<h2>Our <em>Classes</em></h2>
				<img src="assets/images/line-dec.png" alt="" />
				<p>Nunc urna sem, laoreet ut metus id, aliquet consequat magna. Sed viverra ipsum dolor, ultricies fermentum
					massa consequat eu.</p>
			</div>
		</div>
		<div className="row" id="tabs">
			<ul>
				<li><a href='#tabs-1'><img src="assets/images/tabs-first-icon.png" alt="" />First Training Class</a></li>
				<li><a href='#tabs-2'><img src="assets/images/tabs-first-icon.png" alt="" />Second Training Class</a></li>
				<li><a href='#tabs-3'><img src="assets/images/tabs-first-icon.png" alt="" />Third Training Class</a></li>
				<li><a href='#tabs-4'><img src="assets/images/tabs-first-icon.png" alt="" />Fourth Training Class</a></li>
				<div className="main-rounded-button"><a href="/#">View All Schedules</a></div>
			</ul>
			<section className='tabs-content'>
				<article id='tabs-1'>
					<img src="assets/images/training-image-01.jpg" alt="First Class" />
					<h4>First Training Class</h4>
					<p>Phasellus convallis mauris sed elementum vulputate. Donec posuere leo sed dui eleifend hendrerit. Sed
						suscipit suscipit erat, sed vehicula ligula. Aliquam ut sem fermentum sem tincidunt lacinia gravida aliquam
						nunc. Morbi quis erat imperdiet, molestie nunc ut, accumsan diam.</p>
					<div className="main-button">
						<a href="/#">View Schedule</a>
					</div>
				</article>
				<article id='tabs-2'>
					<img src="assets/images/training-image-02.jpg" alt="Second Training" />
					<h4>Second Training Class</h4>
					<p>Integer dapibus, est vel dapibus mattis, sem mauris luctus leo, ac pulvinar quam tortor a velit. Praesent
						ultrices erat ante, in ultricies augue ultricies faucibus. Nam tellus nibh, ullamcorper at mattis non,
						rhoncus sed massa. Cras quis pulvinar eros. Orci varius natoque penatibus et magnis dis parturient montes,
						nascetur ridiculus mus.</p>
					<div className="main-button">
						<a href="/#">View Schedule</a>
					</div>
				</article>
				<article id='tabs-3'>
					<img src="assets/images/training-image-03.jpg" alt="Third Class" />
					<h4>Third Training Class</h4>
					<p>Fusce laoreet malesuada rhoncus. Donec ultricies diam tortor, id auctor neque posuere sit amet. Aliquam
						pharetra, augue vel cursus porta, nisi tortor vulputate sapien, id scelerisque felis magna id felis. Proin
						neque metus, pellentesque pharetra semper vel, accumsan a neque.</p>
					<div className="main-button">
						<a href="#/">View Schedule</a>
					</div>
				</article>
				<article id='tabs-4'>
					<img src="assets/images/training-image-04.jpg" alt="Fourth Training" />
					<h4>Fourth Training Class</h4>
					<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean
						ultrices elementum odio ac tempus. Etiam eleifend orci lectus, eget venenatis ipsum commodo et.</p>
					<div className="main-button">
						<a href="#/">View Schedule</a>
					</div>
				</article>
			</section>
		</div>
	</section >
		</div>
)
}

export default Main