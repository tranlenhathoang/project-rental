import "./App.css";
import Slider from "./component/slider/Slider";

function App() {
	return (
		<div className="App">
			<div>
				{/* <h1 style={{
					color: "blueviolet",
					fontSize: "30px",
					fontWeight: "600",
					marginBottom: "20px"
				}}>Mặt bằng tòa nhà </h1> */}
				<Slider />
			</div>
		</div>
	);
}

export default App;
