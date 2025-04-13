export class LicensePlate {
    private _content!: string;

    constructor(content: string) {
        this.content = content;
    }

    get content(): string {
        return this._content;
    }

    set content(value: string) {
        const pattern: RegExp = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;
        if (!pattern.test(value)) {
            throw new Error(`License plate ${value} is not valid.`);
        }
        this._content = value;
    }

}