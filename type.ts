type IReturnType<T extends (...args: any[]) => any> = T extends (...args: any) => infer P ? P : any

type IPick<T extends object, P extends keyof T> = {
    [k in P]: T[k]
}

type IRequired<T extends object, K extends keyof T> = {
    [P in K]-?: T[P]
}