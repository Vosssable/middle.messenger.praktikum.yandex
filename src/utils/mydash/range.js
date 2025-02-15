
export const rangeRight = (start, end, step) => {
    return range(start, end, step, true)
}


export function range(start, end, step, isRight) {
    let result = []
    if (!step && step !== 0) {
        step = 1
        if (!end) {
            end = start;
            start = 0
        }
    }
    if (Math.abs(step) === 0) {
        for (let i = start; i < end; i++) result.push(start)
    } else if (end > 0) {
        for (let i = start; i < end; i = i + step) {
            result.push(i)
        }
    } else {
        for (let i = start; i > end; i = i - step) {
            result.push(i)
        }
    }
    if (isRight) {
        return result.reverse()
    } else return result
}

