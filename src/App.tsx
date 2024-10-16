import { Route, Routes } from "react-router-dom";
// import Header from './Components/Header'
// import Footer from './Components/Footer'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header /> */}
      <main className="h-full w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
