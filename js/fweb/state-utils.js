import {State} from "./state.js";

export const toggle = (state, syncFunction = undefined) => {
    if (typeof syncFunction == 'function') {
        syncFunction(state[0])
    }
    return [() => state[0](it => !it), state[1]]
}

export const StorageState = (name, initialValue = undefined) => {
    const storageValue = localStorage.getItem(name)
    const state = State(
        storageValue ?
            JSON.parse(storageValue).value :
            initialValue
    )
    const update = (it) => {
        const s = state[0](it)
        localStorage.setItem(name, JSON.stringify({
            value: s
        }))

        return s
    }
    const subscribe = state[1]

    return [
        update,
        subscribe
    ]
}