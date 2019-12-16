import { extend } from 'umi-request';

const request = extend({
    prefix: '/api/blog',
    timeout: 1000,
});

export function getBlogList(params = {}) {
    return request.get('/list', {
        params: params
    })
}