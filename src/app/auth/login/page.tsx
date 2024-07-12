"use client"

import { useRef, useState } from "react";
import { signInWithFacebook, signInWithGoogle, signUser } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Signup() {
    const initialized = useRef(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    if (initialized.current) {
        router.refresh();
        router.push("/chat")
    }
    return (
        <main className="h-screen flex justify-center items-center">
            <div className=" md:bg-slate-600 absolute flex flex-col px-16 p-8 z-10 rounded drop-shadow-[-2rem_3rem_3rem_#00000090] text-center">
                <form className="flex flex-col min-w-60">
                    <p className="text-xl font-semibold">Welcome Back !</p>
                    <label className="text-left text-[1rem] md:text-accent font-semibold mt-6 w-full">Email</label>
                    <Input className="signup-input" type='email' value={email} autoComplete='email'
                     onChange={(e) => { setEmail(e.target.value) }} required />
                    <label className="text-left text-[1rem] md:text-accent font-semibold mt-3 w-full">Password</label>
                    <Input className="signup-input" value={password} type='password' autoComplete='new-password'
                    onChange={(e) => { setPassword(e.target.value) }} required />
                    <p>Or Continue with</p>
                    <div className="flex justify-center space-x-10 mt-2 mb-6">
                        <button className="rounded-full hover:opacity-75"
                            onClick={(e) => {
                                e.preventDefault();
                                signInWithGoogle().then(user => {
                                    if (user.uid) {
                                        toast.success("User Signed in Successfully")
                                        setTimeout(() => {
                                            router.refresh();
                                            router.push("/");
                                        }, 2000)

                                    }
                                    else {
                                        toast.error("User Signin Failed")
                                    }
                                })
                            }}
                        ><img src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png" className="h-10" /></button>
                        <button className=" rounded-full hover:opacity-75"
                            onClick={(e) => {
                                e.preventDefault();
                                signInWithFacebook().then(user => {
                                    if (user.uid) {
                                        toast.success("User Signed in Successfully")
                                        setTimeout(() => {
                                            router.refresh();
                                            router.push("/");
                                        }, 2000)

                                    }
                                    else {
                                        toast.error("User Signin Failed")
                                    }
                                })
                            }}
                        ><img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" className="h-10" /></button>
                    </div>

                    <button type='submit' className=" bg-[#1da1f2] p-3 rounded-xl w-2/3 self-center font-semibold"
                        onClick={(e) => {
                            e.preventDefault();
                            if(email && password){signUser(email, password).then((user) => {
                                if (user.uid) {
                                    toast.success("User Signed in Successfully")
                                    setTimeout(() => {
                                        router.refresh();
                                        router.push("/");
                                    }, 2000)

                                }
                                else {
                                    toast.error("User Signin Failed")
                                }
                            })}
                            else{
                                alert("Please fill all the fields")
                            }
                        }}
                    >Login</button>

                    <p onClick={() => {
                        router.push("/auth/register")
                    }}
                        className="text-left mt-10 text-sm text-blue-600 font-semibold hover:underline cursor-pointer">Don&apos;t have an Account? Register</p>
                </form>

            </div>
        </main>
    )
}
