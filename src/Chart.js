import { useState, useEffect } from "react";
import moment from "moment";
import { Bar } from "react-chartjs-2";

const Chart = ({ chartdata }) => {
	const [database, setDatabase] = useState([]);

	useEffect(() => {
		getData();
		async function getData() {
			const response = await fetch("test.csv");
			const data = await response.text();

			// console.log(data);
			const table = data.split("\n").slice(1);

			// console.log(table);
			const p1_data = [];
			const p2_data = [];
			const chart_label = [];
			const p10_data = [];
			table.forEach((record) => {
				const row = record.split(",");
				var string = row[1] + " " + row[2];
				// console.log(string);

				let m = moment(string, "DD/MM/YYYY hh:mm:ss");
				var date = m.toString().split(" ");

				var month, tarik, year, time;
				month = date[1];
				tarik = date[2];
				year = date[3];
				time = date[4];
				row[1] = tarik + " " + month + " " + year;
				row[2] = time;

				chart_label.push(row[1]);
				p1_data.push(row[5]);
				p2_data.push(row[6]);
				p10_data.push(row[7]);
			});

			setDatabase([chart_label, p1_data, p2_data, p10_data]);
			console.log(database);
		}
	}, []);

	return (
		<div>
			<Bar
				data={database}
				width={600}
				height={500}
				options={{
					maintainAspectRatio: false,
					scales: {
						y: {
							beginAtZero: true,
						},
					},
				}}
			/>
		</div>
	);
};

export default Chart;
