export default function converterStringParaData(dataStr: string): Date {
  const ano = parseInt(dataStr.substring(0, 4), 10);
  const mes = parseInt(dataStr.substring(4, 6), 10) - 1; // O mês começa do 0 em JavaScript/TypeScript
  const dia = parseInt(dataStr.substring(6, 8), 10);

  return new Date(ano, mes, dia);
}
