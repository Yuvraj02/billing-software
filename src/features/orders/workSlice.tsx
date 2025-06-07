import { createSlice } from '@reduxjs/toolkit'
import { type WorkModel } from '../../models/WorkModel'
import {v1 as uuidv1} from 'uuid'
const initialState = {
    work_left:
        [{
            work_id: uuidv1(),
            // work_id:'a',
            customer_id: 3204,
            customer_name: "Yuvraj",
            customer_phone: "8770805985",
            work_status: "Pending",
            category_name:"Kurta",
            date:new Date(Date.now()),
            length:12.5,
            chest:43,
            bottom:13
        },
        {
            // work_id:'b',
            work_id: uuidv1(),
            customer_id: 2,
            customer_name: "Customer 2",
            customer_phone: "8888888888",
            work_status: "Pending",
            category_name:"Salvaar",
            date:new Date(Date.now()),
            shoulder:35,
            neck_front:3.5,
            armhole:20,
        },
        {
            // work_id:'c',
            work_id: uuidv1(),
            customer_id: 1,
            customer_name: "Customer 1",
            customer_phone: "8827445405",
            work_status: "Pending",
            category_name:"Kurta",
            date:new Date(Date.now()),
            length:12.5,
            chest:43,
            bottom:13
        },
        {
            // work_id:'d',
            work_id: uuidv1(),
            customer_id: 6,
            customer_name: "Jake",
            customer_phone: "8271231123",
            work_status: "Pending",
            category_name:"Salvaar",
            date:new Date(Date.now()),
            shoulder:35,
            neck_front:3.5,
            armhole:20,
        }
    ] as WorkModel[]
};

export const workSlice = createSlice({
    name:'todo_work',
    initialState,
    reducers:{}
})

export default workSlice.reducer