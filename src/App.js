import BackendProvider from "./providers/BackendProvider";
import CustomizedThemeProvider from "./providers/CustomizedThemeProvider";
import CustomizedQueryClientProvider from "./providers/CustomizedQueryClientProvider";
import MainComponent from "./MainComponent";

const BACKEND="https://flask-dm.herokuapp.com"
//const BACKEND="http://localhost:5000"

function App() {


  
  return (
    <BackendProvider backend={BACKEND}>
      <CustomizedQueryClientProvider>
        <CustomizedThemeProvider>
          <MainComponent/>
        </CustomizedThemeProvider>
      </CustomizedQueryClientProvider>
    </BackendProvider>

  );
}

export default App;
