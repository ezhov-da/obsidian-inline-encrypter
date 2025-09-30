import { App, Notice } from "obsidian";
import { EditorSelection } from '@codemirror/state';

import InlineEncrypterPlugin from 'main';
import { ModalDecrypt } from 'ModalDecrypt';
import { CryptoFactory } from 'CryptoFactory';
import { ENCRYPTED_CODE_PREFIX, EncryptedTextType } from 'Constants';

export class UiHelper {

	public handleDecryptClick(app: App, plugin: InlineEncrypterPlugin, event: MouseEvent, input: string) {
		event.preventDefault();
		const cryptoFactory = new CryptoFactory(plugin.settings);
		input = input.replace(ENCRYPTED_CODE_PREFIX, '').replace(/`/g, '').replace(/\s/g, '').replace(/\r?\n|\r/g, '');
		cryptoFactory.decryptFromBase64(input).then(data => {
				if (data === null) {
					new Notice('❌ Decryption failed!');
					return;
				} else {
					new ModalDecrypt(app, data, plugin.settings.autoCopy).open();
				}
    		}
		)

	}

    public selectionAndRangeOverlap(selection: EditorSelection, rangeFrom: number, rangeTo: number) {
        for (const range of selection.ranges) {
            if (range.from <= rangeTo && range.to >= rangeFrom) {
                return true;
            }
        }
        return false;
    }    
}
