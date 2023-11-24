import React, { useState } from "react";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import axios from "axios";


function App() {
    const [isLogged, setIsLogged] = useState(false);

    // Проверяем валидность токена
    useEffect(() => {
        const getUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.get('http://localhost:8080/users')
                .then(() => setIsLogged(true))
                .catch((error) => {
                    if (error.response.status === 401) {
                        setIsLogged(false);
                    }
                    console.log(error);
                })
            } else {
                setIsLogged(false);
            }
        }
        getUserData();
    }, [])

    return (
        <>
            <Header isLogged={isLogged} setIsLogged={setIsLogged} />
            <Main isLogged={isLogged} />
        </>
    )
}

export default App