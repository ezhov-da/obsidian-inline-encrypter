import { App, Modal, Setting, TextAreaComponent } from 'obsidian';

import { EncryptedTextType } from 'Constants';

export class ModalPassword extends Modal {
	input: string;
	isPassword: boolean;
	textType: EncryptedTextType;

	constructor(app: App, textType: EncryptedTextType) {
		super(app);
		this.input = '';
		this.textType = textType;
	}

	onOpen() {
		const {contentEl} = this;
		let textArea: TextAreaComponent;

		if (this.textType === EncryptedTextType.PreEncrypted) {
			contentEl.createEl("h1", {text: "Введите текст для шифрования"});
		}

		if (this.textType === EncryptedTextType.PreEncrypted) {
			contentEl.classList.add('inline-encrypter-encrypt-text-modal');
			new Setting(contentEl).setName("Текст для шифрования").addTextArea(cb => {
				textArea = cb;
				cb.setValue(this.input);
				cb.inputEl.readOnly = false;
				cb.inputEl.cols = 30
				cb.inputEl.rows = 8;
			})
		}

		new Setting(contentEl).addButton((btn) => 
			btn.setButtonText("OK").setCta().onClick(() => {
				if (this.textType === EncryptedTextType.PreEncrypted) {
					this.input = textArea.getValue();
				}
				this.passwordOk();
			}));
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}

	passwordOk() {
		this.isPassword = true;
		this.close();	
	}	
}
