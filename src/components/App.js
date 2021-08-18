import Header from "./Header";
import Speakers from "./Speakers";
import Layout from "./Layout";

function App(){
    
    return(
        <Layout startingTheme="light">
            <div className={theme === "light" ? "container-fluid light" : "container-fluid dark"}>
                <Header />
                <Speakers />
            </div>
        </Layout>
    );
}
export default App;