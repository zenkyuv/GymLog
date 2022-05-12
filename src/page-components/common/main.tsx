import '../../component-styles/main.css';
import featuesFirstIcon from '../../images/featuresFirstIcon.png';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { checkIfUserLogged } from '../auth';
import UserStore from '../states-store/states/user-store';

const Main = observer(() => {
  const userStore = useContext(UserStore);
  useEffect(() => {
    console.log('dziala');
    checkIfUserLogged(userStore);
  });

  return (
    <div>
      <div className="main-banner" id="top">
        <video autoPlay muted loop id="bg-video">
          <source src="../images/gym-video.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay header-text">
          <div className="caption">
            <h6>work harder, get stronger</h6>
            <h2>
              ease with our <em>app</em>
            </h2>
            <div className="main-button scroll-to-section">
              <a href="#features">Become a member</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Main;
