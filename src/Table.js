import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

// This Table was imported from Material UI for better visualization

const columns = [
	{ id: "device", label: "Device", minWidth: 30, index: 0 },
	{ id: "date", label: "Date", minWidth: 30, index: 1 },
	{ id: "time", label: "Time", minWidth: 30, index: 2 },
	{
		id: "windspeed",
		label: "Wind Speed\u00a0(km/h\u00b2)",
		minWidth: 30,
		align: "center",
		index: 3,
	},
	{ id: "direction", label: "Direction", minWidth: 30, index: 4 },
	{ id: "p1", label: "PM 1.0", minWidth: 30, index: 5 },
	{ id: "p2.5", label: "PM 2.5", minWidth: 30, index: 6 },
	{ id: "p10", label: "PM 10", minWidth: 30, index: 7 },
];

// Styles for the Table
const useStyles = makeStyles({
	root: {
		width: "100%",
	},
	container: {
		maxHeight: 440,
	},
});

export default function DataTable({ data }) {
	const classes = useStyles();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper className={classes.root}>
			<TableContainer className={classes.container}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{data
							.slice(
								page * rowsPerPage,
								page * rowsPerPage + rowsPerPage
							)
							.map((row) => {
								return (
									<TableRow
										hover
										role="checkbox"
										tabIndex={-1}
										key={row[2]}
									>
										{columns.map((column) => {
											const value = row[column.index];
											return (
												<TableCell
													key={column.id}
													align={column.align}
												>
													{value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
