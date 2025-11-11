import { Outlet } from "react-router-dom";

import Header from "./components/Header";

import "./css/style-make-your-moves.css";

/*
      <Header />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
*/

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
