import { API_URL } from './config'
import { Sealing } from './types'

export async function getSailingsAPI(): Promise<Sealing[]> {
  const sealing = (await fetch(API_URL)
    .then((res) => res.json())
    .then((data) => data.results)) as Sealing[]

  return sealing
}
