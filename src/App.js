import { useEffect, useState } from "react";

// Material UI Table for better visualization of data in Tabular form
import DataTable from "./Table.js";

// Moment is used for Manipulating Time Stamp in the data
import moment from "moment";

// Chart is used for Visualization of Filtered Data
import Chart from "./Chart";
import Daychart from "./Daychart.js";

// For Light and Dark Theme we use Styled components
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./theme.js";

// We use React Router Dom for navigation
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Styling Components
const StyledApp = styled.div`
	.app__body {
		background-color: ${(props) => props.theme.body};
		color: ${(props) => props.theme.fontColor};
		margin-top: 40px;
	}
	footer {
		padding-top: 100px;
		background-color: ${(props) => props.theme.body};
	}
`;

function App() {
	const [theme, setTheme] = useState("light");

	// For filtering the data as per the user requirement
	const [query, setQuery] = useState("");

	const themetoggler = () => {
		theme === "light" ? setTheme("dark") : setTheme("light");
	};

	// This is for storing the data into a variable 'database'
	const [database, setDatabase] = useState([]);

	// This runs only once to fetch data from the file when the page is loaded
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

	// Searching the query in our data and
	// sorting the data according to the query.
	function search(records) {
		return records.filter(
			(row) =>
				row[1]
					.toString()
					.toLowerCase()
					.indexOf(query.toLowerCase().split()) > -1
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
							🐱‍👤
						</button>
					</div>

					<Router>
						<div className="app__body">
							<div className="app__filter">
								Day Filter
								<input
									className="filter__input"
									type="text"
									value={query}
									placeholder="DD MON YYYY"
									onChange={(e) => {
										setQuery(e.target.value);
									}}
								/>
							</div>
							<div className="app__table">
								<DataTable data={search(database)} />
							</div>

							<nav className="app__tabs">
								<p className="graph__link">
									<Link to="/">
										<button className="link__button">
											Comparison Graph
										</button>
									</Link>
								</p>
								<p className="graph__link">
									<Link to="/daily">
										<button className="link__button">
											Time-Series Graph
										</button>
									</Link>
								</p>
							</nav>
							<Switch>
								<Route path="/daily">
									<div className="app__graph">
										<Daychart
											chartdata={search(database)}
										/>
									</div>
								</Route>
								<Route path="/">
									<div className="app__graph">
										<Chart chartdata={search(database)} />
									</div>
								</Route>
							</Switch>
						</div>
					</Router>
					<footer></footer>
				</div>
			</StyledApp>
		</ThemeProvider>
	);
}

export default App;
