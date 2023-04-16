import { React, useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Card, Skeleton , Divider} from 'antd';
import { useNavigate } from 'react-router-dom';

import classes from "./style.module.scss";

function index() {
    const [players, setPLayers] = useState([]);
    const [round, setRound] = useState(0);
    const [results, setResults] = useState([]);
    const [isAdd, setIsAdd] = useState(false);
    const [winners, setWinners] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const getResultSTring = async () => {
        try {
            setLoading(true);
            const apiPromises = [];
            for (let i = 0; i < round; i++) {
                apiPromises.push(axios.get('https://yesno.wtf/api'));
            }
            const responses = await Promise.all(apiPromises);
            const list = responses.map(response => response.data.answer.toUpperCase());
            setResults(list);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            window.alert("erorr");
        }
    };

    const getWinnerList = () => {
        const matches = [];

        for (let i = 0; i < round; i++) {
            matches.push(getWinCurrent(i));
        }
        setWinners(matches);
    };

    const getWinCurrent = (i) => {
        const result = [];
        players.map((player) => {

            if (player.answers[i] === results[i]) {
                result.push(player.name);
            }
        });

        return result.join(' , ');
    };

    useEffect(() => {
        if (round < 1) return;

        if (players.length > 0) {
            let results = players[0].results;

            if (results.length == 0 || results.length != round) getResultSTring();
            else setResults(results);
        }
    }, [round]);

    useEffect(() => {
        const updatedPlayers = players.map(p => {
            return { ...p, results: results };
        });
        setPLayers(updatedPlayers);
        setIsAdd(true);
        getWinnerList();
    }, [results]);

    useEffect(() => {
        if (!isAdd) return;
        localStorage.setItem('data', JSON.stringify(players));
    }, [players]);

    useEffect(() => {
        let list = JSON.parse(localStorage.getItem('data'));
        let round = JSON.parse(localStorage.getItem('round'));
        setRound(round);
        setPLayers(list);
    }, []);
    return (
        <div className={classes["container"]}>
            <div className={classes["submit"]}>
                <div className={classes["submit__player"]}><Divider style={{ fontWeight: "bold", fontSize: "26px" }} >Player name :{" "}{players.map(player => player.name).join(', ')}</Divider></div>
                <div className={classes["submit__result"]}>
                    {[...Array(round)].map((_, i) => (
                        <div className={classes["submit__result__box"]}>
                            <Card title={"Round " + (i + 1) + " :"} bordered={true} style={{ width: 300,fontWeight:"bold" }}>
                                {loading ? (
                                    <Skeleton active={true} />
                                ) : (
                                    <>
                                        <p>Result :{results[i]}</p>
                                        <p>Winner :{winners[i] || "Empty"}</p>
                                    </>
                                )}
                            </Card>
                        </div>
                    ))}
                </div>
                <Button type='primary' disabled={loading} onClick={() => (navigate('/sumary'))} style={{ width: '30%', fontWeight: "bold", borderRadius: '20px'}} >SUMMARY</Button>
            </div>
        </div>
    )
}

export default index
