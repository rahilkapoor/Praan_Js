import "./App.css";
import { useEffect, useState } from "react";
import DataTable from "./Table.js";

function App() {
	const [database, setDatabase] = useState([]);

	useEffect(() => {
		getData();
		async function getData() {
			const response = await fetch("test.csv");
			const data = await response.text();

			// console.log(data);
			const table = data.split("\n").slice(1);

			// console.log(rows);
			const col = [];
			table.forEach((record) => {
				const row = record.split(",");
				col.push(row);
			});

			setDatabase(col);
			// console.log(col);
		}
	}, []);

	return (
		<div className="App">
			<h1> Praan js </h1>
			<DataTable data={database} />
		</div>
	);
}

export default App;
