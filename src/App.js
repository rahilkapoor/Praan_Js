import { useEffect, useState } from "react";
import DataTable from "./Table.js";
import moment from "moment";
import Chart from "./Chart";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./theme.js";

const StyledApp = styled.div`
	.app__body {
		color: ${(props) => props.theme.fontColor};
		margin: 60px;
		margin-top: 75px;
		padding: 20px;
	}
	.app__header {
		position: fixed;
		top: 0;
		background: ${(props) => props.theme.body};
		height: 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px;
		width: 100%;
		z-index: 10;
	}
	h1 {
		position: fixed;
		left: 20px;
		height: 35px;
	}
	.app__header__button {
		position: fixed;
		right: 20px;
		height: 35px;
		width: 60px;
	}
`;

function App() {
	const [theme, setTheme] = useState("light");

	const themetoggler = () => {
		theme === "light" ? setTheme("dark") : setTheme("light");
	};

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

				// var day;
				var month, tarik, year, time;
				// day = date[0];
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
		<ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
			<GlobalStyles />
			<StyledApp>
				<div className="app__body">
					<div className="app__header">
						<h1>Praan Js</h1>
						<button
							className="app__header__button"
							onClick={themetoggler}
						>
							Dark
						</button>
					</div>

					<DataTable data={database} />

					<p>My Chart ❤</p>
					<Chart />
				</div>
			</StyledApp>
			{/* </GlobalStyles> */}
		</ThemeProvider>
	);
}

export default App;
