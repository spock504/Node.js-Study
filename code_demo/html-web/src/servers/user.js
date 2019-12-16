import { extend } from 'umi-request';
import { message } from 'antd'

const request = extend({
    prefix: '/api/user',
    timeout: 1000,
});


request.use(async (ctx, next) => {
    await next();
    const { res } = ctx;
    const { errno = -1  } = res; // 假设返回结果为 : { errno: -1, message: '账号或密码错误' }
    if (errno === -1) {
        message.error(res.message || '好像除了点问题');
        // 对异常情况做对应处理
    }
})

export function setUserLogin(params) {
    return request.post('/login',{
        data: params
    })
}