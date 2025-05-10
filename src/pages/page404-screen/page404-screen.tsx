import { Link } from 'react-router-dom';

import Header from '../../components/header/header';

function Page404Screen(): JSX.Element {

  return (
    <div className="page page--gray page--main">

      <Header />

      <main className="page__main page__main--index">
        <div style={{ textAlign: 'center', marginTop: '200px' }}>
          <h1 style={{ marginBottom: '150px' }}>Error 404. Page not found</h1>
          <Link to='/'>Go to main page</Link>
        </div>
      </main>
    </div>

  );
}

export default Page404Screen;
