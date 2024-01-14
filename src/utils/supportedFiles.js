export const SUPPORTED_FORMATS = ['PNG','GIF','JPG', 'MP4', 'MPEG','JPEG']

export const isVideo = (fileObj) => {
    if (!fileObj || !fileObj.type) return false;
    const format = String(fileObj.type).split('/')[1];
    return format.toUpperCase() === 'MP4' || format.toUpperCase() === 'MPEG';
}

export const isValidFormat = (fileObj) => {
    if (!fileObj || !fileObj.type) return false;
    const format = String(fileObj.type).split('/')[1];
    return SUPPORTED_FORMATS.includes(format.toUpperCase());
}
