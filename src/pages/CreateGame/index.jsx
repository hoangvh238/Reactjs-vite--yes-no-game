import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from "./style.module.scss";
import CreatePlayer from '../../components/CreatePlayer/index';
import PlayerManager from '../../components/PlayerManager/index';

function Index() {
    const [players, setPlayers] = useState([]);
    const [isManager, setIsManager] = useState(false);
    const [round, setRound] = useState(0);
    const navigate = useNavigate();

    const columns = [
        {
            title: 'No.',
            dataIndex: 'id',
        },
        {
            title: 'Player',
            dataIndex: 'name',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_text, record) => (
                <a onClick={() => handleDelete(record.name)}>Delete</a>
            ),
        },
    ];

    const handleDelete = (nameToDelete) => {
        const updatedPlayers = players.filter(player => player.name !== nameToDelete);
        const updatedPlayersWithIds = updatedPlayers.map((player, index) => ({ ...player, id: index + 1 }));
        setPlayers(updatedPlayersWithIds);
        localStorage.setItem('data', JSON.stringify(null));
    };


    const onFinish = (values) => {
        const newPlayerName = values.playerName.trim();
        const playersNames = players.map((player) => player.name.toLowerCase());

        if (!newPlayerName) {
            window.alert("Please input!");
            return;
        }

        if (playersNames.includes(newPlayerName.toLowerCase())) {
            window.alert("Name already exists!");
            return;
        }

        const isNameValid = /^[a-zA-Z]+$/.test(newPlayerName);
        if (!isNameValid) {
            window.alert("Invalid name!");
            return;
        }

        const newPlayer = {
            id: players.length + 1,
            name: newPlayerName,
            createAt: new Date().getDate() + '/' + (new Date().getMonth() + 1) + '-' + new Date().toLocaleTimeString(),
            answers: [],
            results: [],
        };

        setPlayers([...players, newPlayer]);
        setIsManager(true);
    };

    const onStart = (values) => {
        const numRounds = parseInt(values.round);
        if (isNaN(numRounds)) {
            window.alert("Invalid round !");
            return;
        }

        if (numRounds < 1) {
            window.alert("Can't small than 1");
            return;
        }
        setRound(numRounds);
        localStorage.setItem('round', numRounds);
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('data'));
        if (data) setPlayers(data);
    }, []);


    useEffect(() => {

        if (players.length > 0) localStorage.setItem('data', JSON.stringify(players));

    }, [players]);

    useEffect(() => {
        if (round == 0) return;
        const newPlayers = players.map((player) => {
            return {
                ...player,
                answers: Array.from({ length: round }, () => "EMPTY")
            };
        });
        localStorage.setItem('data', JSON.stringify(newPlayers));
        navigate('/player-choice');
    }, [round]);

    return (
        <div className={classes["container"]}>
            <div className={classes["create"]}>
                {!isManager && (<CreatePlayer onFinish={onFinish} setIsManager={setIsManager}></CreatePlayer>)}
                {isManager && (<PlayerManager players={players} columns={columns} onStart={onStart} setIsManager={setIsManager}></PlayerManager>)}
            </div>
        </div>
    );
}

export default Index;
