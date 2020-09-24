import React, { useState, useEffect } from "react";
import "./App.css";
import {
  makeStyles,
  Grid,
  Table,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import TablePagination from '@material-ui/core/TablePagination';


function App() {
  //Set UseStates
  const [marketData, setMarketData] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //Set UseEffects
  useEffect(() => {
    console.log("useEffect has run");

    getData().catch((error) => {
      console.log(error);
    });
  }, [query]);

  //Functions
  const getData = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${query}&order=market_cap_desc&per_page=150&page=1&sparkline=false`
    );
    const data = await response.json();
    console.log(data);
    console.log("this is data is not sorted");
    setMarketData(data);
  };

  const handleReset = () => {
    setQuery("");
    setSearch("");
    getData();
  };

  const updateSearch = (evt) => {
    setSearch(evt.target.value);
  };

  const getSearch = (evt) => {
    evt.preventDefault();
    setQuery(search.toLowerCase());
    setSearch("");
  };

  // const handleSort = async (evt) => {
  //   setMarketData([...marketData].sort(compare));
  //   console.log("handleSort has run");
  // };

  const handleSort = async (evt) => {
    let btnSelected = evt.target.textContent;
    setMarketData(
      [...marketData].sort((a, b) => {
        let dataA;
        let dataB;
        let comparison = 0;
        switch (btnSelected) {
          case "Name":
            dataA = a.name.toUpperCase();
            dataB = b.name.toUpperCase();
            comparison = 0;
            if (dataA > dataB) {
              comparison = 1;
            } else if (dataA < dataB) {
              comparison = -1;
            }
            return comparison;

          case "Symbol":
            dataA = a.symbol.toUpperCase();
            dataB = b.symbol.toUpperCase();
            comparison = 0;
            if (dataA > dataB) {
              comparison = 1;
            } else if (dataA < dataB) {
              comparison = -1;
            }
            return comparison;

          case "Price":
            dataA = a.current_price;
            dataB = b.current_price;
            comparison = 0;
            if (dataA > dataB) {
              comparison = 1;
            } else if (dataA < dataB) {
              comparison = -1;
            }
            return comparison;

          case "Volume":
            dataA = a.total_volume;
            dataB = b.total_volume;
            comparison = 0;
            if (dataA > dataB) {
              comparison = 1;
            } else if (dataA < dataB) {
              comparison = -1;
            }
            return comparison;

          case "Price Change":
            dataA = a.price_change_percentage_24h;
            dataB = b.price_change_percentage_24h;
            comparison = 0;
            if (dataA > dataB) {
              comparison = 1;
            } else if (dataA < dataB) {
              comparison = -1;
            }
            return comparison;

          case "Market Cap":
            handleReset();
            break;
          default:
        }
      })
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const useStyles = makeStyles({
    root: {
      display: "flex",
      overflowX: "hide",
    },
    table: {
      minWidth: 650,
      maxWidth: 1100,
      margin: "auto",
    },
    tableCell: {
      paddingRight: 4,
      paddingLeft: 5,
    },
    button: {
      maxWidth: 200,
      marginTop: 10,
      margin: "auto",
    },
  });

  const classes = useStyles();

  return (
    <div className="App">
      <div className="app_searchContainer">
        <h1 className="app_searchTitle"> Search a Cryptocurrency</h1>
        <form onSubmit={getSearch}>
          <input
            type="text"
            placeholder="CryptoCurrency Name"
            onChange={updateSearch}
            value={search}
            className="app_searchInput"
          />
        </form>
        <Button
          variant="outlined"
          size="small"
          className={classes.button}
          onClick={handleReset}
        >
          Reset Market
        </Button>
      </div>
      <Grid
        item
        xs={12}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <TableContainer className="classes.root">
          <Table size="medium" className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableCell}>
                  <Button color="primary" disabled>
                    Logo
                  </Button>
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleSort}
                  >
                    Name
                  </Button>
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleSort}
                  >
                    Symbol
                  </Button>
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleSort}
                  >
                    Price
                  </Button>
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleSort}
                  >
                    Volume
                  </Button>
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleSort}
                    disableElevation
                  >
                    Price Change
                  </Button>
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleSort}
                  >
                    Market Cap
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {marketData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <img
                      src={row.image}
                      className="app_symbol"
                      alt="Market Logo"
                    ></img>
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {row.symbol}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    ${row.current_price}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {row.total_volume}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {row.price_change_percentage_24h < 0 ? (
                      <p className="market_percent_green">
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </p>
                    ) : (
                      <p className="market_percent_red">
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </p>
                    )}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    ${row.market_cap.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25,50]}
          component="div"
          count={marketData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Grid>
    </div>
  );
}

export default App;
