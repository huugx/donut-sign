import WalletInfo from "./components/wallet/WalletInfo";
import Optin from "./pages/optin";
import { Connect } from "./components/containers";
import { useState } from "react";


function App() {
    const [ active, setActive ] = useState(false);

    return (
        <div>
            <WalletInfo onConnect={() => setActive(true)} />
            { active ? <Optin /> : <Connect /> }
        </div>
    )
}

export default App;