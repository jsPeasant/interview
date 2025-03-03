class MyPromise {
    constructor(exector) {
        this.state = 'pending';
        this.value = undefined;
        this.error = undefined;
        this.resolveCallbacks = [];
        this.rejectCallbacks = [];
    }
}