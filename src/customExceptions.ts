export class InvalidExcelDataError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidExcelDataError';
    }
}

