import { useCallback } from 'react'

export const useStopPropagation = (fn: (ev: any) => any) => {
    return useCallback((ev) => {
        if (ev) ev.stopPropagation()
        return fn(ev)
    }, [fn])
}

export const usePreventDefault = (fn: (ev: any) => any) => {
    return useCallback((ev) => {
        if (ev) ev.preventDefault()
        return fn(ev)
    }, [fn])
}