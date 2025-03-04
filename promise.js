const resolvePromise = (promise, x, resolve, reject, status) => {
    if(promise === x) {
        // 避免无限循环
        return reject('error')
    }

    // 只能执行一次，因为状态只能变更一次， 防止重复变更
    let called

    if((typeof x === 'object' && x!==null) || typeof x === 'function') {
        try {
            const then = x.then

            if(typeof then === 'function') {
                then.call(x, (y) => {
                    if(called) return
                    called = true

                    resolvePromise(promise, y, resolve, reject, status)
                }, (e) => {
                    if(called) return
                    called = true

                    reject(e)
                })
            }
            else {
                console.log('xxx', this.status)
                if(status === 'rejected') {
                    reject(x)
                }
                else {
                    resove(x)
                }
            }
        }
        catch(e) {
            if(called) return
            called = true
            reject(e)
        }
    }
    else {
        resolve(x)
    }
}


class MyPromise {
    constructor(exector) {
        this.value = undefined
        this.reason = undefined
        this.status = 'pending'
        this.resolveCallbacks = []
        this.rejectCallbacks = []

        const resolve = (value) => {
            if(this.status === 'pending') {
                this.status = 'resolved'
                this.value = value

                for(let i=0; i<this.resolveCallbacks.length; i++) {
                    const fn = this.resolveCallbacks[i]

                    fn()
                }
            }
        }

        const reject = (e) => {
            if(this.status === 'pending') {
                this.status = 'rejected'
                this.reason = e
                this.rejectCallbacks.forEach(fn => fn())
            }
        }

        try {
            exector(resolve, reject)
        }catch(e) {
            reject(e)
        }
    }

    then(success, fail) {
        const onSuccess = typeof success === 'function' ? success : val=>val
        const onFail = typeof fail === 'function' ? fail : err => {throw err}


        const promise =  new MyPromise((resolve, reject) => {
            if(this.status === 'resolved') {
                setTimeout(() => {
                    try {
                        const x = onSuccess(this.value)

                        resolvePromise(promise,x, resolve, reject, this.status)
                    }
                    catch(e) {
                        reject(e)
                    }
                }, 0)
            }

            if(this.status === 'rejected') {
                setTimeout(() => {
                    try {
                        const x = onFail(this.reason)
                        resolvePromise(promise,x, resolve, reject)
                    }catch(e) {
                        reject(e)
                    }
                }, 0)
            }

            if(this.status === 'pending') {
                const resolveCallback = () => setTimeout(()=> {
                    try {
                        const x = onSuccess(this.value)
                        resolvePromise(promise,x, resolve, reject)
                    }
                    catch(e) {
                        reject(e)
                    }
                },0)
                this.resolveCallbacks.push(resolveCallback)
                const rejectCallback = () => {
                    setTimeout(() => {
                        try {
                            const x = onFail(this.reason)
                            resolvePromise(promise,x, resolve, reject)
                        }
                        catch(e) {
                            reject(e)
                        }
                    }, 0)
                }
                this.rejectCallbacks.push(rejectCallback)
            }
        })


        return promise
    }


}

const promise = new Promise((resolve, reject) => {
    console.log('MyPromise')
    reject('失败');
  }).then().then(null, () => {
    return new Promise((resolve, reject) => {
        resolve('new')
    })
  }).then(data=>{
    console.log(data, 'data');
  },err=>{
    console.log('err',err);
  })
  