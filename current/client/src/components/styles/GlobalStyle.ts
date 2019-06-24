import { createGlobalStyle } from 'styled-components';
const GlobalStyles = createGlobalStyle`
/* Base 10 typography scale courtesty of @wesbos 1.6rem === 16px */
html {
  box-sizing: border-box;
  font-size: 10px;
}
body {
  font-size: 1.6rem;
  color: #fff;
}
@font-face {
  font-family: system;
  font-style: normal;
  font-weight: 300;
  src: local(".SFNSText-Light"), local(".HelveticaNeueDeskInterface-Light"), local(".LucidaGrandeUI"), local("Ubuntu Light"), local("Segoe UI Light"), local("Roboto-Light"), local("DroidSans"), local("Tahoma");
}
@font-face {
  font-family: systemregular;
  font-style: normal;
  font-weight: 500;
  src: local(".SFNSText-Regular"), local(".HelveticaNeueDeskInterface-Regular"), local(".LucidaGrandeUI"), local("Ubuntu Regular"), local("Segoe UI Regular"), local("Roboto-Regular"), local("DroidSans"), local("Tahoma");
}

/* Modern CSS Reset */
/* https://alligator.io/css/minimal-css-reset/ */
body, h1, h2, h3, h4, h5, h6, p, ol, ul, button {
  margin: 0;
  padding: 0;
  font-weight: normal;
}
body,  p, ol, ul, input[type=text], input[type=email], button {
  font-family: "systemregular";
}
h1, h2, h3, h4, h5, h6 {
  font-family: 'Oswald', "systemregular";
  font-weight: lighter;
}
/* p {
  font-family: 'Oxygen', "systemregular"
} */
*, *:before, *:after {
  box-sizing: inherit;
}
ol, ul {
  list-style: none;
}
button {
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
}
img {
  max-width: 100%;
  height: auto;
}
/* Links */
a {
  text-decoration: underline;
  color: inherit;
&.active {
    text-decoration: none;
  }
}
`;

export default GlobalStyles;
