import axios from 'axios'
import {
    PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
} from '../constants/productConstants'
const listProducts = () =>
    async (dispatch) => {
        try {
            const { data } = await axios.get('https://api.hatchways.io/assessment/work_orders');
            let orders = data.orders;
            let workerNo = Math.max.apply(Math, orders.map(function (orders) { return orders.workerId; }))
            let workers = []
            for (let i = 0; i <= workerNo; i++) {
                let workerInfo = await (await axios.get('https://api.hatchways.io/assessment/workers/' + i))
                let workerData = workerInfo.data.worker
                workers.push(workerData)
            }
            data.workers = workers
            dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
        }
        catch (error) {
            dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
        }

    }
export { listProducts }