import { ItemView, WorkspaceLeaf } from 'obsidian';
import { ThemeProvider } from 'styled-components';
import { StrictMode } from 'react';
import { Root, createRoot } from 'react-dom/client';
import { FileSystemAdapter } from 'obsidian';

import { TabloraRasa as TabloraRasaComponent } from "../../src/components/TabloraRasa";
import MardownStyle from '../../src/components/MardownStyle';
import * as path from 'path';

export const TABLORA_RASA_VIEW_TYPE = 'tablora-rasa-view';

const Theme = {
    textColor: "#525252",
    textColorFaded: "#969696",
    primaryColor: "#0068b4",
    secondaryColor: "#0098ff",
    backgroundColor: "#FFFFFF",
    borderColor: "rgba(0, 0, 0, 0.1)",
    colorRed: "#ff4a4a",
    colorBlue: "#4c5fff",
    colorGreen: "#2ea169",
    cursorColor: "#1E1E1E"
};

export class TabloraRasa extends ItemView {
    root: Root | null = null;
    adapter: FileSystemAdapter | null = null;
    manifestDir: string;

    constructor(leaf: WorkspaceLeaf, manifestDir: string) {
        super(leaf);
        
        this.manifestDir = manifestDir;
		this.adapter = this.app.vault.adapter as FileSystemAdapter;
    }

    async onOpen() {
        this.root = createRoot(this.containerEl.children[1]);
		this.root.render(
			<StrictMode>
                <ThemeProvider theme={Theme}>
                    <MardownStyle/>
                    <TabloraRasaComponent imageUrlFn={(imgPath) => { return this.adapter?.getResourcePath(path.join(this.manifestDir, 'images', imgPath)) } } />
                </ThemeProvider>    
            </StrictMode>,
		);
    }

    getViewType() {
        return TABLORA_RASA_VIEW_TYPE;
    }

    getDisplayText() {
        return 'Tablora Rasa';
    }
}