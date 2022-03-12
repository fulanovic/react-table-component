export const getFormatedValue = (value) => {
    const options = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    };
    return `${Number(value).toLocaleString('en', options)}`;
};
