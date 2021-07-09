import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://www.fastmock.site/mock/634b1071782bcbcd764f06074951b060/jd',
	withCredentials:true,
    //https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd
    timeout:10000
});


export const get = (url, params = {},) => {
    return new Promise((resolve, reject) => {
        instance.get(url, { params }).then((response) => {
            resolve(response.data);
        }, err => {
            reject(err);
        })

    });

}
export const post = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        instance.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            resolve(response.data);
        }, err => {
            reject(err);
        })
    });
}


// 设置临时会话存储
export const setStorage = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};

// 获取临时会话存储
export const getStorage = key => {
    return JSON.parse(sessionStorage.getItem(key));
};



//此方法，仅仅用来演示展示，不适用
export const CreateAxiosNoAway = () => {
    const CancelToken = axios.CancelToken;
    sourceValue.value = CancelToken.source();
    instanceValue.value = axios.create({
        baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
        timeout,
        cancelToken: sourceValue.value
    });
    //console.log(source,source.token);
    //如果存在上一次请求且存在xhr对象
    // if(source.value&&source.value?.token){
    //     source.value.cancel('取消请求')
    // }
}















