import { useAppSelector } from "../../store/hooks";
import { LinearProgress, Typography, Box, Paper, Theme } from "@mui/material";
import { styled } from "@mui/system";

const Currencies = ({ theme }: { theme: Theme }) => {
  const Item = styled(Paper)(({ theme }: { theme: Theme }) => ({
    backgroundColor: theme.palette.primary.light,
    margin: theme.spacing(1),
    flex: "1 1",
    padding: theme.spacing(2),
  }));

  const exchangedCurrencies = useAppSelector(
    (state) => state.currency.exchangedCurrencies
  );

  const currenciFilter = useAppSelector(
    (state) => state.currency.currencyFilter
  );

  const loading = useAppSelector((state) => state.currency.loading);

  const amount = useAppSelector((state) => state.currency.amount);

  if (loading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress color="primary" />
      </Box>
    );
  else
    return (
      <div
        className="currencies"
        style={{ padding: theme.spacing(1), display: "flex", flexWrap: "wrap" }}
      >
        {exchangedCurrencies
          .filter((value) => {
            return currenciFilter.includes(value[0]);
          })
          .map((code, index) => {
            return (
              <Item key={index}>
                <Typography sx={{ fontSize: 40 }}>
                  {(code[1] * amount).toFixed(2)}
                </Typography>
                <Typography sx={{ fontSize: 20 }}>{code[0]}</Typography>
              </Item>
            );
          })}
      </div>
    );
};

export default Currencies;
