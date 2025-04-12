export class Email {
    private _content: string;

    constructor(content: string) {
        this._content = content;
    }


    set content(value: string) {
        if (!this.validateEmail(value)) {
            throw new Error('Invalid email format');
        }
        this._content = value;
    }

    get content(): string {
        return this._content;
    }

    private validateEmail(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
}