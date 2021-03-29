export default function ({ $axios }) {
  // Asigna el URL dependiendo de si está en producción o desarrollo
  const url = 'https://zemoga-back.vercel.app/api/'
  // Se asignan los parámetros para todas las peticiones
  $axios.setBaseURL(url)
}
