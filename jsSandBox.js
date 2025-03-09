class SandBox {
    constructor(globalContext) {
        const fakeWindow = {}
        const self = this


        this.proxy = new Proxy(fakeWindow, {
            get(target, p) {
                // 有些是要挂在原生window才能执行的api
                return target[p] || globalContext[p]
            },

            set(target, p, newValue) {
                if(self.isRunning) {
                    // 剥离globalContext不可配置的属性
                    target[p] = newValue
                }
            }
        })
    }

    run() {
        this.isRunning = true
    }

    exit() {
        this.isRunning = false
    }
}

const a = new SandBox(global)
const b = new SandBox(global)


a.run()
b.run()

// console.log('global', global)

a.proxy.b = '1'
b.proxy.b = '2'


console.log(a.proxy.b)
console.log(b.proxy.b)

