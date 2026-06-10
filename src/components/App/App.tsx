import css from "./App.module.css"
import CafeInfo from "../CafeInfo/CafeInfo.tsx";
import VoteOptions from "../VoteOptions/VoteOptions.tsx";
import {useState} from "react";
import type {Votes, VoteType} from "../types/votes.ts";
import VoteStats from "../VoteStats/VoteStats.tsx";
import Notification from "../Notification/Notification.tsx";

export default function App() {
    const initialState: Votes = {
        good: 0,
        neutral: 0,
        bad: 0
    }
    const [votes, setVotes] = useState(initialState);

    const handleVote = (type: VoteType) => {
        setVotes((prevState: Votes) => ({
            ...prevState,
            [type]: prevState[type] + 1,
        }));
    };

    const resetVotes = (): void => {
        setVotes(initialState);
    }

    const totalVotes: number = votes.good + votes.neutral + votes.bad;
    const positiveRate: number = totalVotes
        ? Math.round((votes.good / totalVotes) * 100)
        : 0;

    return (
        <div className={css.app}>
            <div>
                <CafeInfo/>
                <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={totalVotes > 0}/>

                {totalVotes > 0
                    ? <VoteStats votes={votes} totalVotes={totalVotes} positiveRate={positiveRate}/>
                    : <Notification/>
                }

            </div>
        </div>
    );
}