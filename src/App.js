import BackendProvider from "./providers/BackendProvider";
import CustomizedThemeProvider from "./providers/CustomizedThemeProvider";
import MainComponent from "./MainComponent";

const BACKEND="https://flask-dm.herokuapp.com"
//const BACKEND="http://localhost:5000"

function App() {


  
  return (
    <BackendProvider backend={BACKEND}>
        <CustomizedThemeProvider>
          <MainComponent/>
        </CustomizedThemeProvider>
    </BackendProvider>

  );
}

export default App;
