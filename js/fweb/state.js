export function State(initialValue = undefined) {
    let value = initialValue

    const subscribers = []
    const update = (newValue) => {
        if(typeof newValue == 'function') {
            value = newValue(value)
        }else{
            value = newValue
        }

        subscribers.map(it => it(value))

        return value
    }

    const subscribe = (subscriber) => {
        subscribers.push(subscriber)
        subscriber(value)
    }

    return [
        update,
        subscribe
    ]
}