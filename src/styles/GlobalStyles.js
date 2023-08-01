import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
  font-family: "Roboto", sans-serif;
}

body {
  background-color: #212529;
  height: 100vh;
  color: #f8f9fa;
  padding: 2.4rem 1.2rem;
  margin: 0 auto;
  max-width: 72rem;
}
`

export default GlobalStyles
