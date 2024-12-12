
export const errorResponse = (
    errorsArray: Array<{field: string, message: string}>
) => {

    let errors_ = {
        errorsMessages: [] as Array<{field: string, message: string}>
    }

    errorsArray.forEach((error) => {
        errors_.errorsMessages.push(error)
    })

    return errors_
}