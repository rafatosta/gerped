export default function formatDate(timestamp) {
  const data = new Date(timestamp).toISOString().slice(0, 10)
  const dia = data.slice(8, 10)
  const mes = data.slice(5, 7)
  const ano = data.slice(0, 4)

  return `${dia}/${mes}/${ano}`
}
