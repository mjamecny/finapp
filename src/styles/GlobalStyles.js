import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`

:root {
  &, &.light-mode{
    --color-grey-back-900: #F8F9FA;
    --color-grey-font-900: #212529;
}
  

  &.dark-mode{
    --color-grey-back-900: #212529;
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
  height: 100vh;
  color: var(--color-grey-font-900);
  padding: 2.4rem 1.2rem;
  margin: 0 auto;
  max-width: 72rem;
  transition: color 0.3s, background-color 0.3s;
}
`

export default GlobalStyles
