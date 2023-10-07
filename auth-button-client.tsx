'use client'

import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function AuthButtonClient({session}:{session: Session | null}){
    const supabase = createClientComponentClient<Database>()
    const router = useRouter();


    const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: `${location.origin}/auth/callback`
        }
    })
        }

        const handleSignOut = async() => {
            await supabase.auth.signOut();
            router.refresh();
        }

    return session?(<button onClick={handleSignOut} className="text-xs text-gray-400">Logout</button>): 
    (<button onClick={handleSignIn} className="text-xs text-gray-400">Login</button> )
}
