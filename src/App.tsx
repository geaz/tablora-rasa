import styled from "styled-components";
import Home from "./pages/Home.mdx";

function App() {
    return (
        <StyledApp>
            <a href="/" title="Home"><h1 className="title">Tablora Rasa</h1></a>
            <h3 className="subtitle">A table-less, tarot based TTRPG oracle</h3>
            <div id="link-row">
                <ul>
                    <li><a href="./Tablora Rasa.pdf" title="Rules" target="_blank">Rules</a></li>
                    <li><a href="https://github.com/geaz/tablora-rasa" title="Github" target="_blank">Github</a></li>
                </ul>
            </div>
            <Home />
        </StyledApp>
    );
}

const StyledApp = styled.div`
    .title, .subtitle {
        margin-bottom: 0;
    }

    #link-row{
        width: 100%;
        padding: 15px;
        margin-top: 25px;
        margin-bottom: 50px;
        border-top: 1px solid #eee; 
        border-bottom: 1px solid #eee; 

        ul { 
            gap: 25px;
            display: flex;
            justify-content: center;
        }
    }

    display:flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;    
    margin: 25px auto;
    max-width: 700px;
`;

export default App;
