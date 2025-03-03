class LazyMan {
    constructor(name) {
        this.callbacks = [];
        this.isRunning = false;
        this.init(name);
    }
    init(name) {
        const callback = () => {
            return new Promise((resolve) => {
                console.log(name);
                resolve('');
            });
        };
        this.callbacks.push(callback);
        this.run();
    }
    sleep(n) {
        const callback = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log(`sleep ${n} s`);
                    resolve('');
                }, n * 1000);
            });
        };
        this.callbacks.push(callback);
        this.run();
        return this;
    }
    eat(thing) {
        const callback = () => {
            return Promise.resolve().then(() => {
                console.log(`eat ${thing}`);
            });
        };
        this.callbacks.push(callback);
        this.run();
        return this;
    }
    run() {
        if (!this.isRunning) {
            if (this.callbacks.length > 0) {
                this.isRunning = true;
                const fn = this.callbacks.shift();
                fn().then(() => {
                    this.isRunning = false;
                    this.run();
                });
            }
        }
    }
}
function lazyMan(name) {
    return new LazyMan(name);
}
lazyMan('zk').eat('rice').sleep(5).eat('banna').sleep(2).eat('apples');
