import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default function NewTweet(){

    const addTweet = async(formData: FormData) => {
        'use server'
        const title = String(formData.get('title'));
        const supabase = createServerComponentClient<Database>({cookies});
        const {data:{user}} =  await supabase.auth.getUser();
        if(user){
            await supabase.from('tweets').insert({title, user_id:user.id })
        }
        console.log('New Tweet');
    }

    return (
        <form action={addTweet}>
            <input name="title" className="bg-inherit"/>
        </form>
    )
}