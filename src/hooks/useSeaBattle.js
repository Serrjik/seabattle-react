import { useContext } from "react";
import { SeaBattleContext } from "../components/SeaBattle";

const useSeaBattle = () => useContext(SeaBattleContext)

export default useSeaBattle