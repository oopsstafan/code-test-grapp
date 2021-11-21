import axios from 'axios'

export const reqList = (listType)=>{
    return axios.get(`/list?listType=${listType}`)
}

export const reqAdd = (addType, addName)=>{
    return axios.post('/add', {addType, addName})
}

export const reqAssignReward = (selectMem, selectRew)=>{
    return axios.post('/assignreward', {selectMem, selectRew})
}

export const reqSearchMember = (searchMem)=>{
    return axios.post('/searchmember', {searchMem})
}

export const reqDelete = (delType, delName)=>{
    return axios.post('/delete', {delType, delName})
}