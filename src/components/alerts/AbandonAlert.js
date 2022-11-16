import Alert from "../Alert";
import Button from "../Button"

function AbandonAlert({ onCloseClick, onConfirmClick }) {
    return <Alert onCloseClick={onCloseClick}>
        <p><span className="font-bold">Eh! Du bist mit deinen Einträgen noch nicht fertig!</span> <br /><br />
            Bist du sicher, dass du diese Seite verlassen willst? Ohne Deine Einträge können wir die Lokallabore nicht so gut evaluieren :( </p>
        <Button className="text-black w-60 bg-zinc-500 mt-24 mx-auto md:ml-0" onClick={onConfirmClick}>Verlassen</Button>
    </Alert>
}

export default AbandonAlert;