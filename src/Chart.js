import { useState, useEffect } from "react";
import moment from "moment";
import { Doughnut, Pie } from "react-chartjs-2";

const Chart = ({ chartdata }) => {
	const labels = ["PM 1 Particle", "PM 2.5 Particle", "PM 10 Particle"],
		data_p1 = [];

	var sum_p1 = 0.0,
		sum_p2 = 0.0,
		sum_p10 = 0.0;

	function refactorData() {
		for (var i = 0; i < chartdata.length; i++) {
			sum_p1 = sum_p1 + parseFloat(chartdata[i][5]);
			sum_p2 = sum_p2 + parseFloat(chartdata[i][6]);
			sum_p10 = sum_p10 + parseFloat(chartdata[i][7]);
			// data_p1.push(chartdata[i][5]);
			// data_p2.push(chartdata[i][6]);
			// data_p3.push(chartdata[i][7]);
		}
		data_p1.push(sum_p1);
		data_p1.push(sum_p2);
		data_p1.push(sum_p10);
	}
	refactorData();

	// const [database, setDatabase] = useState([]);

	// useEffect(() => {
	// 	getData();
	// 	async function getData() {
	// 		const response = await fetch("test.csv");
	// 		const data = await response.text();

	// 		// console.log(data);
	// 		const table = data.split("\n").slice(1);

	// 		// console.log(table);
	// 		const p1_data = [];
	// 		const p2_data = [];
	// 		const chart_label = [];
	// 		const p10_data = [];
	// 		table.forEach((record) => {
	// 			const row = record.split(",");
	// 			var string = row[1] + " " + row[2];
	// 			// console.log(string);

	// 			let m = moment(string, "DD/MM/YYYY hh:mm:ss");
	// 			var date = m.toString().split(" ");

	// 			var month, tarik, year, time;
	// 			month = date[1];
	// 			tarik = date[2];
	// 			year = date[3];
	// 			time = date[4];
	// 			row[1] = tarik + " " + month + " " + year;
	// 			row[2] = time;

	// 			chart_label.push(row[1]);
	// 			p1_data.push(row[5]);
	// 			p2_data.push(row[6]);
	// 			p10_data.push(row[7]);
	// 		});

	// 		setDatabase([chart_label, p1_data, p2_data, p10_data]);
	// 		console.log(database);
	// 	}
	// }, []);

	return (
		<div>
			<Doughnut
				data={{
					labels: labels,
					datasets: [
						{
							label: "P1",
							data: data_p1,
							backgroundColor: [
								"rgba(255, 99, 132, 0.4)",
								"rgba(54, 162, 235, 0.4)",
								"rgba(255, 205, 86, 0.4)",
							],
							fill: false,
							hoverOffset: 4,
						},
					],
				}}
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
