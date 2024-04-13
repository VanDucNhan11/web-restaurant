import Header from "./components/Header"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import FoodMenu from "./pages/foodMenu/FoodMenu"
import Reservations from "./pages/reservations/Reservations"
import Recruitment from "./pages/recruitment/Recruitment"
import News from "./pages/news/News"
import Footer from "./components/Footer"

function App() {

  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/thuc-don' element={<FoodMenu />} />
          <Route path='/dat-cho' element={<Reservations />} />
          <Route path='/tin-tuc' element={<News />} />
          <Route path='/tuyen-dung' element={<Recruitment />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
