export default function converterDataParaString(data: Date): string {
  const dia = String(data.getDate()).padStart(2, '0'); // Obtém o dia e garante que tenha 2 dígitos
  const mes = String(data.getMonth() + 1).padStart(2, '0'); // Obtém o mês (adiciona 1, pois janeiro é 0)
  const ano = data.getFullYear(); // Obtém o ano

  return `${dia}/${mes}/${ano}`;
}
