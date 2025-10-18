import './App.css'
import Header from './Screens/Header/Header'
import Home from './Screens/Home/Home'
import Services from './Screens/Services/Services'
import Contact from './Screens/Contact/Contact'
// import About from './Screens/About/About'
// import Footer from './Screens/Footer/Footer' // (optional future)

function App() {
  return (
    <div style={{background:" linear-gradient(0deg, #000000 0%, #1B4193 100%)"}}>
      <Header />
      <main>
        <section id="home" style={{background:" linear-gradient(135deg, #000000 0%, #1B4193 100%)"}}>
          <Home />
        </section>
        <section id="feature"style={{background:" linear-gradient(0deg, #000000 0%, #608ded01 100%)"}}>
          <Services />
        </section>
        <section id="contact" >
          <Contact />
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default App
