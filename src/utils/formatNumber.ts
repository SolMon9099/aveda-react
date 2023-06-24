import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fCurrency(number: string | number) {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export function fPercent(number: number) {
  return numeral(number / 100).format('0.0%');
}

export function fNumber(number: string | number) {
  return numeral(number).format();
}

export function fShortenNumber(number: string | number) {
  return numeral(number).format('0.00a').replace('.00', '');
}

export function fData(number: string | number) {
  return numeral(number).format('0.0 b');
}

export const money = (valor: any) => { // formata o valor para o formato 'R$ 00,00' para exibição
  var valor_formatado = "R$ "+parseFloat(valor).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+,)/g, "$1.");
  return valor_formatado;
}

export const desMoney = (valor: any) => { // recebe um valor (string) no formato 'R$ 00,00' e converte para o formato 0.0 como float, para fazer calculos, cadastrar no banco, etc
  var valor_formatado = parseFloat(valor.replace(/[\D]+/g,''))/100
  return valor_formatado;
}

export const moneyWithoutCurrency = (valor: any) => { // formata o valor para o formato 'R$ 00,00' para exibição
  var valor_formatado = parseFloat(valor).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+,)/g, "$1.");
  return valor_formatado;
}