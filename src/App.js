import "./App.css";
import { useEffect, useState } from "react";
import DataTable from "./Table.js";
import moment from "moment";

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
				var string = row[1] + " " + row[2];
				// console.log(string);

				let m = moment(string, "DD/MM/YYYY hh:mm:ss");
				var date = m.toString().split(" ");

				var day, month, tarik, year, time;
				day = date[0];
				month = date[1];
				tarik = date[2];
				year = date[3];
				time = date[4];
				row[1] = tarik + " " + month + " " + year;
				row[2] = time;

				col.push(row);
			});

			setDatabase(col);
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
