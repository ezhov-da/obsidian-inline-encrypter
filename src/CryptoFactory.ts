import { InlineEncrypterPluginSettings} from 'Settings';
export class CryptoFactory {
	private settings: InlineEncrypterPluginSettings;

	constructor(settings: InlineEncrypterPluginSettings) {
		this.settings = settings;
	}

	public async encryptToBase64(text: string): Promise<string> {
        console.log('!!!!!!!!! encryptToBase64', text, this.settings);

        try {
            const response = await fetch(`${this.settings.chainActionUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Rocket-Action-Handler-Key': this.settings.chainActionKey,
                },
                body: JSON.stringify({ "_id": this.settings.encryptId, text }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.result;
        } catch (error) {
            console.error('Error during encryptToBase64:', error);
            return 'Encryption failed';
        }
	}

	public async decryptFromBase64(base64Encoded: string): Promise<string|null> {
 		console.log('!!!!!!!!! decryptFromBase64', base64Encoded);

        try {
            const response = await fetch(`${this.settings.chainActionUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Rocket-Action-Handler-Key': this.settings.chainActionKey,
                },
                body: JSON.stringify({ "_id": this.settings.decryptId, text: base64Encoded }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.result;
        } catch (error) {
            console.error('Error during encryptToBase64:', error);
            return 'Decryption failed';
        }
	}
}
