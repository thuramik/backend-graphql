// Mutation
import { mutations as customerMutations } from '../bus/customer/mutations'
import { mutations as taskMutations } from '../bus/task/mutations'

export const Mutation = {
    ...customerMutations,
    ...taskMutations,
}