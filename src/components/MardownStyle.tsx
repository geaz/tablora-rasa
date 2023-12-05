import { createGlobalStyle } from "styled-components";

function MardownStyle() {
    return <GlobalMarkdownStyle/>;
}

const GlobalMarkdownStyle = createGlobalStyle`
    .markdown {
        em { font-style: italic; }
        strong { font-weight: bold; }

        ul {
            padding-left: 25px;
            margin-bottom: 25px;
            list-style: circle; 
        }

        ol {
            padding-left: 25px;
            margin-bottom: 25px;
            list-style: decimal; 
        }

        table {
            width: 100%;
            text-align: center;
            margin: 25px 0;
        }

        th { font-weight: bold; }
        tr { border-bottom: 1px solid ${ p => p.theme.borderColor }; }
        td { padding: 5px; }

        blockquote {
            padding: 15px;
            margin: 25px 0;
            border-radius: 5px;
            background: #f5f5f5;
            border: 1px solid ${ p => p.theme.borderColor };
        }
    }
`;

export default MardownStyle;