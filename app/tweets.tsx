"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Likes from "./likes";
import { useEffect, experimental_useOptimistic as useOptimistic } from 'react'
import { useRouter } from "next/navigation";


export default function Tweets ({tweets}:{tweets:TweetWithAuthor[]}){
    const [optmisticTweets, addOptmisticTweet] = useOptimistic<TweetWithAuthor[], TweetWithAuthor>(
        tweets, 
        (currentOptmisticTweets, newTweet ) => {
            const newOptimisticTweets = [...currentOptmisticTweets]
            const index = newOptimisticTweets.findIndex(
                (tweet) =>  tweet.id === newTweet.id);
                newOptimisticTweets[index] = newTweet;
                return newOptimisticTweets; 
        }
    )

const supabase = createClientComponentClient() 
const router = useRouter()

useEffect(()=>{
const channel = supabase.channel('realtime tweets').on
('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'tweets'
}, (payload)=> {
 router.refresh();
}).subscribe();

return() => {
    supabase.removeChannel(channel);
}

}, [])

    return tweets.map((tweet) => (
        <div key={tweet.id}>
          <p>{tweet.author.name} {tweet.author.username}</p>
          <Likes tweet={tweet} addOptimisticTweet={addOptmisticTweet}></Likes>
          <p>{tweet.title}</p>
        </div>
      ))

}