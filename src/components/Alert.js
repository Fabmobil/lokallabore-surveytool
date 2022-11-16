import { ReactComponent as CloseIcon } from "../assets/close-x.svg"

function Alert({ children, onCloseClick = () => { } }) {
    return <>
        <div className="fixed w-screen h-screen top-0 left-0 bg-black opacity-90 mt-20 z-10">
        </div>
        <div className="fixed w-screen h-screen top-0 left-0 mt-20 text-white z-20 p-4 text-lg">
            <CloseIcon className="cursor-pointer absolute top-7 right-6" onClick={onCloseClick} />
            <div className="pt-24">{children}</div>
        </div>
    </>
}

export default Alert;