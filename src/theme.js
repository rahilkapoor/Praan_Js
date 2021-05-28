import { createGlobalStyle } from "styled-components";

// Light Theme and Dark Theme variables
export const lightTheme = {
	body: "#fefefe",
	fontColor: "#222",
	button_background: "#333",
	header: "#fff",
	navbar_shadow: "2px 3px 8px lightgreen",
};

export const darkTheme = {
	body: "#333",
	fontColor: "#fff",
	navbar_shadow: "2px 5px 8px crimson",
	header: "#222",
};

// Global Styles which remain constant throughout the site
// irrespective of Theme chosen by the user/client.
export const GlobalStyles = createGlobalStyle`
    
    .app__header {
		position: fixed;
		top: 0;
		background: ${(props) => props.theme.header};
		height: 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px;
		width: 100%;
		z-index: 10;
		box-shadow: ${(props) => props.theme.navbar_shadow};
        color: ${(props) => props.theme.fontColor};
	}
    h1 {
		position: fixed;
		left: 20px;
		height: 35px;
	}
    .app__header__button{
        position: fixed;
		right: 20px;
		height: 35px;
		width: 60px;
        background: ${(props) => props.theme.button_background};
        color: ${(props) => props.theme.fontColor};
    }

    .app__filter{
        padding: 18px;
        width: 80%;
        margin: auto;
        text-align:center;
    }

    .filter__input{
        background: ${(props) => props.theme.body};
        color: ${(props) => props.theme.fontColor};
        padding: 8px;
        margin: 50px 0px 0px 15px;
        border-radius: 5px;
    }
    .app__table{
        width: 80%;
        margin: auto;
    }
    .app__tabs{
        padding: 18px;
        width: 80%;
        margin: auto;
        margin-top: 100px;
        margin-bottom: 60px;
        text-align:center;
        display: flex;
    }
    .graph__link{
        flex: 1;
        border: 2px #333;
    }
    .link__button{
        background: ${(props) => props.theme.body};
        color: ${(props) => props.theme.fontColor};
        padding: 18px;
        margin: 4px;
    }
    .app__graph{
        width: 80%;
        margin: auto;
    }
    
`;
