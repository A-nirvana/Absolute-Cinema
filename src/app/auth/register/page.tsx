"use client"

import { useState } from "react";
import { createUser, signInWithFacebook, signInWithGoogle } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { Calendar } from '@/components/ui/calendar';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState<Date|undefined>()
    const router = useRouter();
    return (
        <main className="h-[95vh] flex justify-center items-center">
            <div className=" md:bg-slate-600 absolute flex flex-col px-12 p-8 z-10 rounded-2xl drop-shadow-[0_1rem_2rem_#00000070]  md:drop-shadow-[-2rem_3rem_3rem_#00000090] text-center">
                <p className="text-xl font-semibold text-muted-foreground">Create an Account</p>
                <form className="min-w-60 flex flex-col">
                    <Label className=" text-left text-[1rem] md:text-accent font-semibold mt-6 w-full">Email</Label>
                    <Input className="min-w-60" required={true} type="email" autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <Label className=" text-left text-[1rem] md:text-accent font-semibold mt-3 w-full">Password</Label>
                    <Input className="min-w-60" type="password" autoComplete="new-password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <Label className=" text-left text-[1rem] md:text-accent font-semibold mt-3 w-full">Username</Label>
                    <Input className="min-w-60" type="text" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                    <Label className=" text-left text-[1rem] md:text-accent font-semibold mt-3 w-full">Date of Birth</Label>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline"
                                className={cn(
                                    "w-[240px] pl-3 text-left font-normal bg-input",
                                    date && "text-muted-foreground"
                                )}
                            >
                                {date ? (
                                    format(date, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-max border-0">
                            <DropdownMenuLabel>Choose date</DropdownMenuLabel>
                            <Calendar
                                className="rounded-md shadow"
                                mode="single"
                                selected={date}
                                onSelect={(day) => { if (day) setDate(day) }}
                                disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                } /></DropdownMenuContent>
                    </DropdownMenu>

                    <Label className=" text-[0.9rem] font-semibold mt-3 w-full">Or Signup With</Label>
                    <div className="flex justify-center space-x-10 mt-2 mb-6">
                        <button className="rounded-full hover:opacity-70 h-max"
                            onClick={async (e) => {
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
                        <button className=" rounded-full border-3 h-max hover:opacity-70"
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

                    <input type="submit" className={`bg-[#1da1f2] p-3 rounded-xl w-2/3 self-center font-semibold ${isLoading ? "cursor-wait" : "cursor-pointer"}`}
                        onClick={async (e) => {
                            e.preventDefault();
                            setIsLoading(true);
                            if (date && email && password && userName) {
                                createUser(email, password, userName, date).then((user) => {;
                                if(user){
                                    toast("User "+ user.displayName+" successfully created",{
                                        description: new Date().toLocaleString(),
                                        action:{
                                            label: "View",
                                            onClick: ()=>{router.push("/me")}
                                        }
                                    })
                                }}).catch((error) => {
                                    toast.error("User creation failed")
                                })
                            }
                            else {
                                alert("Please fill all the fields")
                                setIsLoading(false)
                            }
                        }}
                        value={isLoading ? "Loading" : "Signup"}
                    ></input>
                </form>
                <p onClick={() => {
                    router.push("/auth/login")
                }}
                    className="text-left mt-4 text-sm text-blue-600 font-semibold hover:underline cursor-pointer">Already have an account?</p>
            </div>
        </main>
    )
}
