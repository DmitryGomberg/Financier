import {IStageTypes} from "pages/createContract/payConditions";

export const formatDateForMySQL = (date: Date) => {
    return date.toISOString().slice(0, 19).replace('T', ' ');
};

export const formatPrice = (price: string): string => {
    const number = parseFloat(price);
    return number.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
};

export const formatDateDots = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};
export const formatDateDashes = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
export const getFileType = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
            return 'img';
        case 'pdf':
            return 'pdf';
        case 'doc':
        case 'docx':
            return 'docx';
        case 'xls':
        case 'xlsx':
            return 'excel';
        case 'mp4':
            return 'mp4';
        default:
            return 'other';
    }
};

export const validateNames = (stages: IStageTypes[]) =>{
    for (const stage of stages) {
        if(stage.name === '') {
            return false
        }
    }
    return true
}
export const validateStages = (stages: IStageTypes[]) => {
    let sumOfPercents = 0;
    stages.map((stage)=>{
        sumOfPercents += Number(stage.percent);
    })
    return sumOfPercents === 100
};

export const isNumeric = (value: string): boolean => {
    return /^-?\d+([.,]\d+)?$/.test(value);
};

export const isDate = (value: string): boolean => {
    const datePattern = /^\d{2}\.\d{2}\.\d{4}$/;
    return datePattern.test(value);
};