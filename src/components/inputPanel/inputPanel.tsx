import "./inputPanel.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setAmount,
  setCurrencyFilter,
  fetchCurrencies,
  toggleMode,
} from "../../features/currencySlice";
import currencyCodes from "../../data/currencyCodes.json";
import { Autocomplete, TextField, Stack, Button, Theme } from "@mui/material";
import { Box } from "@mui/system";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";

const InputPanel = ({ theme }: { theme: Theme }) => {
  const initCurrency = "USD";

  const dispatch = useAppDispatch();

  const isDarkMode = useAppSelector((state) => state.currency.isDarkMode);

  const [baseCurrency, setBaseCurrency] = useState(() => {
    return "";
  });

  const [filter, setFilter] = useState(() => {
    return Array<string>();
  });

  const currencyCodesWithoutBase = currencyCodes.filter((code) => {
    return code != baseCurrency;
  });

  useEffect(() => {
    dispatch(fetchCurrencies(initCurrency));
    setBaseCurrency(initCurrency);
    dispatch(setCurrencyFilter(currencyCodesWithoutBase));
  }, []);

  return (
    <div
      className="inputPanel"
      style={{ padding: theme.spacing(1), width: "100%" }}
    >
      <Stack
        direction="row"
        className="first"
        sx={{ marginBottom: theme.spacing(2) }}
      >
        <Stack direction="row" className="buttonLabel">
          <Button
            title="Switch Theme"
            onClick={() => dispatch(toggleMode())}
            color="secondary"
            variant="contained"
            sx={{ margin: theme.spacing(1) }}
          >
            {isDarkMode ? (
              <LightModeRoundedIcon fontSize="large" />
            ) : (
              <DarkModeRoundedIcon fontSize="large" />
            )}
          </Button>

          <h1>Currency Exchanger</h1>
        </Stack>

        <Stack direction="row">
          <Autocomplete
            onChange={(event, value) => {
              dispatch(fetchCurrencies(value));
              setBaseCurrency(value);
            }}
            autoComplete
            disableClearable
            disablePortal
            defaultValue={initCurrency}
            id="combo-box-demo"
            options={currencyCodes}
            classes={{ listbox: `${isDarkMode ? "dark" : "light"}-scrollbar` }}
            sx={{ minWidth: 110, color: "primary", margin: theme.spacing(1) }}
            renderGroup={(params) => (
              <Box
                {...params}
                className={`${isDarkMode ? "dark" : "light"}-scrollbar`}
              />
            )}
            renderInput={(params) => (
              <TextField {...params} label="Base Currency" color="info" />
            )}
          />

          <TextField
            color="info"
            type="number"
            label="Amount"
            defaultValue={1}
            InputProps={{
              inputProps: { min: 0 },
            }}
            onChange={(e) => dispatch(setAmount(Number(e.target.value)))}
            sx={{ margin: theme.spacing(1), minWidth: "100px" }}
          />
        </Stack>
      </Stack>

      <Stack direction="row" className="second">
        <Autocomplete
          autoComplete
          multiple
          id="tags-outlined"
          options={currencyCodesWithoutBase}
          filterSelectedOptions
          classes={{ listbox: `${isDarkMode ? "dark" : "light"}-scrollbar` }}
          sx={{ width: "100%", margin: theme.spacing(1) }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Currencies to convert to"
              color="info"
            />
          )}
          onChange={(event, value) => {
            setFilter(value);
            dispatch(
              setCurrencyFilter(value.length ? value : currencyCodesWithoutBase)
            );
          }}
        />

        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            filter.length && dispatch(setCurrencyFilter(filter));
          }}
          title="Apply Filter"
          sx={{ margin: theme.spacing(1) }}
        >
          <DoneRoundedIcon fontSize="large" />
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => dispatch(setCurrencyFilter(currencyCodes))}
          title="Reset Filter"
          sx={{ margin: theme.spacing(1) }}
        >
          <AutorenewRoundedIcon fontSize="large" />
        </Button>
      </Stack>
    </div>
  );
};

export default InputPanel;
