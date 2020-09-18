// Queries
import { queries as customerQueries } from '../bus/customer/queries'
import { queries as taskQueries } from '../bus/task/queries'

export const Query = {
    ...customerQueries,
    ...taskQueries,
}