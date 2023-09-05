import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`

:root {
  &, &.light-mode{
    --color-grey-back-900: #F8F9FA;
    --color-grey-back-800: #e9ecef;
    --color-grey-font-900: #212529;
}
  

  &.dark-mode{
    --color-grey-back-900: #212529;
    --color-grey-back-800: #343a40;
    --color-grey-font-900: #F8F9FA;
  }
}



* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
  font-family: "Roboto", sans-serif;
}

body {
  background-color: var(--color-grey-back-900);
  color: var(--color-grey-font-900);
  padding-left: 1.2rem;
  padding-right: 1.2rem;
  margin: 0 auto;
  max-width: 72rem;
  transition: color 0.3s, background-color 0.3s;
}
`

export default GlobalStyles
