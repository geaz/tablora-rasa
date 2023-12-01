import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home.mdx";
import Rules from "./pages/Rules.mdx";

function App() {
    return (
        <StyledApp>
            <a href="/" title="Home"><h1 className="title">Tablora Rasa</h1></a>
            <h3 className="subtitle">A tableless, tarot based oracle for any TTRPG</h3>
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

    display:flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;    
    margin: 25px auto;
    max-width: 700px;
`;

export default App;
