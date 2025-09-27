import { AppConfig } from './types'

export const APP_CONFIG: AppConfig = {
  baseUrl: 'https://jsonplaceholder.typicode.com',
  validationPeriod: 60,
  defaultLimit: 10,
  limitOptions: [5, 10, 20, 50],
  skeletonTestingDelay: 0,
  limitForSecondPagination: 15,
}
