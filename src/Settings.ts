import { App, PluginSettingTab, Setting } from 'obsidian';

import InlineEncrypterPlugin from 'main';

export interface InlineEncrypterPluginSettings {
    autoCopy: boolean;
	chainActionUrl: string
	chainActionKey: string
	encryptId: string
	decryptId: string
}

export const DEFAULT_SETTINGS: InlineEncrypterPluginSettings = {
    autoCopy: false,
	chainActionUrl: "",
	chainActionKey: "",
	encryptId: "",
	decryptId: ""
}

export class InlineEncrypterSettingTab extends PluginSettingTab {
	plugin: InlineEncrypterPlugin;

	constructor(app: App, plugin: InlineEncrypterPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Auto copy secret to clipboard')
			.setDesc('Copy secret to clipboard automatically')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.autoCopy)
                .onChange(async (value) => {
                    this.plugin.settings.autoCopy = value;
                    await this.plugin.saveSettings();
                    this.display();
                })
            );

		new Setting(containerEl)
			.setName('Chain action url')
			.setDesc('Chain action url')
            .addText(text => text
                .setValue(this.plugin.settings.chainActionUrl)
                .onChange(async (value) => {
                    this.plugin.settings.chainActionUrl = value;
                    await this.plugin.saveSettings();
                })
            );

		new Setting(containerEl)
			.setName('Chain action key')
			.setDesc('Chain action key')
          	.addText(text => text
                .setValue(this.plugin.settings.chainActionKey)
                .onChange(async (value) => {
                    this.plugin.settings.chainActionKey = value;
                    await this.plugin.saveSettings();
                })
            );

		new Setting(containerEl)
			.setName('Chain action encrypt id')
			.setDesc('Chain action encrypt id')
          	.addText(text => text
                .setValue(this.plugin.settings.encryptId)
                .onChange(async (value) => {
                    this.plugin.settings.encryptId = value;
                    await this.plugin.saveSettings();
                })
            );

		new Setting(containerEl)
			.setName('Chain action decrypt id')
			.setDesc('Chain action decrypt id')
          	.addText(text => text
                .setValue(this.plugin.settings.decryptId)
                .onChange(async (value) => {
                    this.plugin.settings.decryptId = value;
                    await this.plugin.saveSettings();
                })
            );
	}
}
