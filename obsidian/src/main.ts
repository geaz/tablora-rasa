import { WorkspaceLeaf, Plugin, FileSystemAdapter } from 'obsidian';
import { TabloraRasa, TABLORA_RASA_VIEW_TYPE } from './tablora-rasa';

export default class TabloraRasaPlugin extends Plugin {
	async onload() {
		const adapter = this.app.vault.adapter
        if (! (adapter instanceof FileSystemAdapter))
            throw new Error('This plugin requires a FileSystemAdapter for now')

		const manifestPath = this.manifest.dir
        if (manifestPath == null)
            throw new Error('Could not determine manifest directory')

		this.registerView(
			TABLORA_RASA_VIEW_TYPE,
			(leaf) => new TabloraRasa(leaf, manifestPath)
		);

		this.addCommand({
			id: 'open-tablora-rasa',
			name: 'Open Tablora Rasa',
			callback: () => { this.activateView(); }
		});
		this.addRibbonIcon('dice', 'Tablora Rasa', () => { this.activateView(); });
	}

	async activateView() {
		const { workspace } = this.app;
	
		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(TABLORA_RASA_VIEW_TYPE);
	
		if (leaves.length > 0) leaf = leaves[0];
		else {
			leaf = workspace.getRightLeaf(false);
			await leaf!.setViewState({ type: TABLORA_RASA_VIEW_TYPE, active: true });
		}
		workspace.revealLeaf(leaf!);
	}
}