import {format} from 'date-fns';
// import {TDashboardAnual} from './dashboardApi';
// import {IProductionOrderBackend} from './productionOrderApi';
// import {getMonth} from 'date-fns';

export const parseStringToDate = (dado: string): Date => {
  return new Date(dado);
};

export const parseDateToString = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const parseValueToNumber = (values: string): number => {
  const stringValue = values.split('R$ ')[1];

  return Number(stringValue.replace(',', '.'));
};

export const parseDateToStringDashboard = (date: Date): string => {
  return format(date, 'MM-dd-yyyy');
};

const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

export const parseNumberToReal = (amount: string, decimalCount = 2, decimal = ",", thousands = ".") => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return 'R$ ' + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(Number(amount) - Number(i)).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
};
