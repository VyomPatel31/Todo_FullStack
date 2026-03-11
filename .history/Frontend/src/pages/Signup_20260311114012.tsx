import { useState } from "react";
import Api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup(){

    const navigate= useNavigate();

    const[name, setName]= useState("");
    const[email, setEmail]=useState("");
    const[password, setPasword]=useState("");

}