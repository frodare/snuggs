import { register } from 'use-async-ops'
import * as names from './names'
import kubectlCmd from './kubectlCmd'

register(names.GET_PODS, kubectlCmd('get pods -o json'))