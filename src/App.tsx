import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home.mdx";
import Rules from "./pages/Rules.mdx";

function App() {
    return (
        <StyledApp>
            <a href="/" title="Home"><h1 className="title">Tablora Rasa</h1></a>
            <h3 className="subtitle">A tableless, tarot based oracle for any TTRPG</h3>
            <div id="link-row">
                <ul>
                    <li><a href="#" title="Download on Itch.io">itch.io</a></li>
                    <li><a href="/rules" title="Online Rules">Online Rules</a></li>
                    <li><a href="#" title="Download Cheat Sheets">Cheat Sheets</a></li>
                </ul>
            </div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="rules" element={<Rules />} />
                </Routes>
            </BrowserRouter>
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
