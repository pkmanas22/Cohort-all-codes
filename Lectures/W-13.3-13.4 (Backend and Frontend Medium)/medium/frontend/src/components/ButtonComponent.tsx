type buttonComponentType = {
    label: string,
    bgColour: string,
    onClickFn: () => void,
    visibility: boolean
}
export const ButtonComponent = ({ label, bgColour, onClickFn, visibility }: buttonComponentType) => {
    const visible = visibility ? "visible" : "hidden"
    return (
        <>
            <button type="button"
                className={` text-white outline ${bgColour} ${visible} opacity-90 hover:opacity-100 font-medium rounded-full text-sm px-4 py-1.5 text-center`}
                onClick={onClickFn}
            >
                {label}
            </button>
        </>
    )
}
