import Alert from "../Alert";

function UserExistsAlert({ onCloseClick }) {
    return <Alert onCloseClick={onCloseClick}>
        <p>
            <span className="font-bold">Upsidupsi :( <br /><br /> Diese Kombination aus Name und Geburtstag ist schon vergeben...</span><br /><br />
            Das ist entweder ein verrückter Zufall, oder du hast bereits einen Account. Solltest du schon einen Account haben, aber deinen Nicknamen vergessen haben, dann denke nochmal scharf nach oder wende dich notfalls an deine lokalen Betreuer*innen! </p>
    </Alert>
}

export default UserExistsAlert;