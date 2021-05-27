import { createGlobalStyle } from "styled-components";

export const lightTheme = {
	body: "#fff",
	fontColor: "#333",
	margin: 15,
	padding: 35,
	background: "#333",
};

export const darkTheme = {
	body: "#333",
	fontColor: "#fff",
};

export const GlobalStyles = createGlobalStyle`
    body{
        background-color: ${(props) => props.theme.body};
        
    }
    .app__header__button{
        background: ${(props) => props.theme.background};
    }
`;
