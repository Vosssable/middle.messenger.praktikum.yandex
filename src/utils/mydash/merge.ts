import { Indexed } from "../interfaces/frameworkInterfaces"

function merge(firstObj: Indexed, secondObj: Indexed): Indexed {
    for (let key in secondObj) {
        if (!secondObj.hasOwnProperty(key)) {
            continue
        }

        try {
            if (secondObj[key].constructor === Object) {
                secondObj[key] = merge(firstObj[key] as Indexed, secondObj[key] as Indexed)
            } else {
                firstObj[key] = secondObj[key]
            }
        } catch (e) {
            firstObj[key] = secondObj[key]
        }
    }

    return firstObj
}

export default merge