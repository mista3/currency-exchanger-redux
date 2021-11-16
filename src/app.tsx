import "./app.scss";
import { Paper, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./design/themes";
import { useAppSelector } from "./store/hooks";
import Currencies from "./components/currencies/currencies";
import InputPanel from "./components/inputPanel/inputPanel";

const App = () => {
  const isDarkMode = useAppSelector((state) => state.currency.isDarkMode);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          backgroundColor: theme.palette.primary.main,
          height: "100vh",
          borderRadius: 0,
        }}
        className={`${isDarkMode ? "dark" : "light"}-scrollbar app`}
      >
        <InputPanel theme={theme} />
        <Currencies theme={theme} />
      </Paper>
    </ThemeProvider>
  );
};

export default App;

//✔TODO: Make background color conected to theme using mui styled
//✔TODO: Reorgonize components
//✔TODO: Configure spacing
//✔TODO: Stylize input components
//✔TODO: Make scrollbar change with theme
//✔TODO: Add title
