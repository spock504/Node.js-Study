import { extend } from 'umi-request';

const request = extend({
    prefix: '/api/blog',
    timeout: 1000,
});

export function getBlogListApi(params = {}) {
    return request.get('/list', {
        params: params
    })
}

export function getBlogDetailApi(params = {}) {
    return request.get('/detail', {
        params: params
    })
}
