import { WorkspaceLeaf, Plugin, FileSystemAdapter } from 'obsidian';
import { TabloraRasa, TABLORA_RASA_VIEW_TYPE } from './tablora-rasa';

import { imageBlob, imageHash } from './images'

import * as fs from 'fs'
import * as path from 'path'

const decompress = require('decompress')
const decompressTargz = require('decompress-targz')

export default class TabloraRasaPlugin extends Plugin {
	async onload() {
		if (! (this.app.vault.adapter instanceof FileSystemAdapter))
			throw new Error('This plugin requires a FileSystemAdapter for now');	
		if (this.manifest.dir == null)
			throw new Error('Could not determine manifest directory');
		await checkUnpack(this.app.vault.adapter.getBasePath(), this.manifest.dir);

		this.registerView(
			TABLORA_RASA_VIEW_TYPE,
			(leaf) => new TabloraRasa(leaf, this.manifest.dir!)
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

async function checkUnpack(vaultPath: string, manifestPath: string) : Promise<void> {
	let imagesUnpacked: boolean = false;
	try {
		// Extract resources if they are not already extracted
		const checksumPath = path.join(vaultPath, manifestPath, 'images', 'CHECKSUM');
		if(fs.existsSync(checksumPath)) {
			const data = fs.readFileSync(checksumPath, 'utf8');
			imagesUnpacked = data.trim() == imageHash;
		}

		if (!imagesUnpacked)
			await extractTarGz(imageBlob, path.join(vaultPath, manifestPath))
	} catch { 
		throw new Error('Error during Tablora Rasa image unpack!');
	}	
}

async function extractTarGz(base64TarGz: string, destinationPath: string) {
    const tarGzBuffer = Buffer.from(base64TarGz, 'base64')
    await decompress(tarGzBuffer, destinationPath, { plugins: [decompressTargz()] })
}