export const dateSlicer = (language, string) => {
    if (language === "fa") {
        return string.split("،")[0].slice(2)
    } else {
        return string.split(",")[0].slice(0, -2)
    }
}