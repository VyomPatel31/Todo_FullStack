// import { useState, useEffect } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";

// export default function Signup(){

//     const navigate= useNavigate();

//     useEffect(()=>{
//     const token = localStorage.getItem("token")
//     if(token){
//       navigate("/dashboard")
//     }
//   },[navigate])

//     const[name, setName]= useState("");
//     const[email, setEmail]=useState("");
//     const[password, setPassword]=useState("");

//     const handleSignup = async (e:any)=>{
//     e.preventDefault()

//     await API.post("/auth/signup",{
//       name,
//       email,
//       password
//     })

//     navigate("/login")
//   }

//   return(
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow-md w-full max-w-md">
//          <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

//          <input
//            className="w-full p-2 mb-3 border rounded-4xl"
//            placeholder="Name"
//            onChange={(e)=>setName(e.target.value)}
//          />
//          <input
//            className="w-full p-2 mb-3 border rounded-4xl"
//            placeholder="Email"
//            type="email"
//            onChange={(e)=>setEmail(e.target.value)}
//          />
//          <input
//            className="w-full p-2 mb-3 border rounded-4xl"
//            placeholder="Password"
//            type="password"
//            onChange={(e)=>setPassword(e.target.value)}
//          />

//          <button className="w-full bg-black text-white py-2 rounded-4xl hover:bg-blue-600">Signup</button>

//       </form>
//     </div>
//   )

// }

import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: any) => {
    e.preventDefault();

    await API.post("/auth/signup", {
      name,
      email,
      password
    });

    navigate("/login");
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#2e2a44]">

      <div className="flex w-[900px] bg-[#1f1c2e] rounded-xl shadow-2xl overflow-hidden">

        {/* LEFT IMAGE PANEL */}

        <div className="w-1/2 relative">

          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
            className="h-full w-full object-cover"
          />

         

        </div>


        {/* RIGHT FORM PANEL */}

        <div className="w-1/2 p-10 text-white">

          <h2 className="text-2xl font-semibold mb-2">
            Create an account
          </h2>

          <p className="text-sm text-gray-400 mb-6">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="text-purple-400 cursor-pointer ml-1"
            >
              Login
            </span>
          </p>

          <form onSubmit={handleSignup} className="space-y-4">

            {/* Name */}

            <input
              className="w-full p-2 rounded bg-[#2a263d] border border-gray-600 focus:outline-none focus:border-purple-500"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />

            {/* Email */}

            <input
              className="w-full p-2 rounded bg-[#2a263d] border border-gray-600 focus:outline-none focus:border-purple-500"
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}

            <input
              className="w-full p-2 rounded bg-[#2a263d] border border-gray-600 focus:outline-none focus:border-purple-500"
              placeholder="Enter your password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Terms */}

            <div className="flex items-center text-sm text-gray-400 gap-2">
              <input type="checkbox" />
              <span>I agree to the Terms & Conditions</span>
            </div>

            {/* Button */}

            <button className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded text-white font-semibold">
              Create account
            </button>

          </form>

          {/* Social Login */}

          <div className="flex gap-3 mt-6">

            <button className="flex-1 border border-gray-600 p-2 rounded hover:bg-[#2a263d]">
              Google
            </button>

            <button className="flex-1 border border-gray-600 p-2 rounded hover:bg-[#2a263d]">
              Apple
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}