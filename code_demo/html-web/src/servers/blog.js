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

export function updateBlogDetailApi(params = {}) {
    return request.post('/update', {
        data: params
    })
}

export function setNewBlogApi(params = {}) {
    return request.post('/new', {
        data: params
    })
}
