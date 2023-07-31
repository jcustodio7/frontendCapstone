export const formatMoney = (number) =>{
    number = number !== undefined && number ? parseFloat(number) : 0;
    return number.toLocaleString('en-US'   ,{style:'currency', currency: 'PHP'})
}