import { useEffect, useState } from "react";
import DataTable from "./Table.js";
import moment from "moment";
import Chart from "./Chart";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./theme.js";
import Daychart from "./Daychart.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const StyledApp = styled.div`
	.app__body {
		color: ${(props) => props.theme.fontColor};
		margin-top: 75px;
		// width: 80%;
		// justify-content: center;
		// text-align: center;
		// align-content: center;
		padding: 40px;
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
		box-shadow: 2px 5px 8px #ddd;
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
	const [query, setQuery] = useState("");

	const themetoggler = () => {
		theme === "light" ? setTheme("dark") : setTheme("light");
	};

	const [database, setDatabase] = useState([]);

	useEffect(() => {
		async function getData() {
			const response = await fetch("test_dataset_all.csv");
			const data = await response.text();

			// console.log(data);
			const table = data.split("\n").slice(1);

			// console.log(rows);
			const col = [];
			table.forEach((record) => {
				const row = record.split(",");
				var string = row[1] + " " + row[2];
				// console.log(string);

				let m = moment(string, "YY/MM/DD hh:mm:ss");
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
		getData();
	}, []);

	function search(records) {
		return records.filter(
			(row) => row[1].toString().toLowerCase().indexOf(query) > -1
		);
	}

	return (
		<ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
			<GlobalStyles />
			<StyledApp>
				<div className="app">
					<div className="app__header">
						<h1>Praan Js</h1>
						<button
							className="app__header__button"
							onClick={themetoggler}
						>
							Dark
						</button>
					</div>

					<Router>
						<div className="app__body">
							<div>
								Day Filter :
								<input
									type="text"
									value={query}
									placeholder="DD MON YYYY"
									onChange={(e) => {
										setQuery(e.target.value);
									}}
								/>
							</div>
							<DataTable data={search(database)} />
							<nav>
								<ul>
									<li>
										<Link to="/">Comparison Graph</Link>
									</li>
									<li>
										<Link to="/daily">
											Time-Series Graph
										</Link>
									</li>
								</ul>
							</nav>
							<Switch>
								<Route path="/daily">
									<Daychart chartdata={search(database)} />
								</Route>
								<Route path="/">
									<p>My Chart ❤</p>
									<Chart chartdata={search(database)} />
								</Route>
							</Switch>
						</div>
					</Router>
				</div>
			</StyledApp>
		</ThemeProvider>
	);
}

export default App;
