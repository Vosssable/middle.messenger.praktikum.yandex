import { Indexed } from "../interfaces/frameworkInterfaces";

function merge(firstObj: Indexed, secondObj: Indexed): Indexed {
    for (const key in secondObj) {
        if (secondObj?.[key] === undefined) {
            continue
        }

        try {
            if (secondObj[key] && secondObj[key].constructor === Object) {
                secondObj[key] = merge(firstObj[key] as Indexed, secondObj[key] as Indexed)
            } else {
                firstObj[key] = secondObj[key]
            }
        } catch {
            firstObj[key] = secondObj[key]
        }
    }

    return firstObj
}

export default merge
