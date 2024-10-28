import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import MainChat from "./MainChat";
import Register from "./Register";

export default function Home() {
    const userData = localStorage.getItem("userData");

    return (
        <>
            {!userData ? <Login /> : <MainChat />}
        </>
    )
}