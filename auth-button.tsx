'use client'

export default function AuthButton(){
    const handleSignIn = async () => {
        console.log("Clicked");
    }

    return <button onClick={handleSignIn}>Login</button>
}