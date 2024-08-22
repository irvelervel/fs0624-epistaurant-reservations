// RICORDIAMOCI DI INCLUDERE IN APP.JS IL FILE CSS DI BOOTSTRAP PRESENTE IN NODE_MODULES
// !!!
import 'bootstrap/dist/css/bootstrap.min.css'
// !!!
// INCLUDIAMO ANCHE LE BOOTSTRAP-ICONS
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'
import CustomNavbar from './components/CustomNavbar'
import Home from './components/Home'
import TableBooking from './components/TableBooking'
import BookingList from './components/BookingList'

function App() {
  return (
    <>
      <header>
        <CustomNavbar />
      </header>
      <main>
        <BookingList />
        <TableBooking />
        <Home />
      </main>
    </>
  )
}

export default App
