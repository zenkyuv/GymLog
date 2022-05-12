import { observer } from 'mobx-react-lite';
import Footer from './common/footer.js';
import Header from './common/header.js';
import Main from './common/main.js';

const MainPage = observer(() => {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
});

export default MainPage;
