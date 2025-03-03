class App {
    constructor() {
        this.middlewares = []
        this.isRunning = false
    }

    pushTask(fn) {
        this.middlewares.push((next) => fn(next))

        this.next()

        return this
    }

    next() {
        if(!this.isRunning) {
            const fn = this.middlewares.shift()
            if(fn) {
                this.isRunning = true
                fn(() => {
                    this.isRunning = false
                    this.next()
                })
            }
        }
    }
}

const app = new App()

app.pushTask((next) => {
    console.log('zk')
    next()
}).pushTask((next) => {
    setTimeout(() => {
        console.log('sleep 5s')
        next()
    }, 5000)
}).pushTask((next) => {
    setTimeout(() => {
        console.log('eat rice')
        next()
    },0)
})

// let a = true
// while(a){
//     setTimeout(() => {
//         a = false
//     },10000)
// }

setTimeout(() => {
    app.pushTask((next) => {
        setTimeout(() => {
            console.log('eat apple')
            next()
        }, 1000)
    })
}, 10000);