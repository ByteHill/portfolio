// root of the app — just stacks all the sections in order
import Hero from "./sections/Hero.jsx";
import Experience from "./sections/Experience.jsx";
import Navbar from "./components/Navbar.jsx";
import Research from "./sections/Research.jsx";
import Art from "./sections/Art.jsx";
import Grass from "./sections/Grass.jsx";
import Contact from "./sections/contact.jsx";
const App = () => {
    return (
        <>
            <Navbar />
            <Hero/>
            <Experience/>
            <Research/>
            <Art/>
            <Grass/>
            <Contact />
        </>
    )
}
export default App