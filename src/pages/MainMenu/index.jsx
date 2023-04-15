import { useState, React } from "react";
import { PoweroffOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import classes from "./style.module.scss";

function index() {
    const [isChoice, setIsChoice] = useState(0);

    const handleChoice = (e) => {
        setIsChoice(e);
    }


    const navigate = useNavigate();

    function handleClick() {
        localStorage.setItem('data', null);
        navigate('/create');
    }

    return (
        <div className={classes["container"]}>
            <div className={classes["menu"]}>
                <h1 className={classes["menu__name"]}>WTF ! YES / NO GAME </h1>
                <div className={classes["menu__choice"]}>
                    <div className={classes["choice__start"]}>
                        <Button type="primary" block className={classes[isChoice != 0 ? 'hide' : '']} onClick={handleClick} >
                            CREATE GAME NOW
                        </Button>

                    </div>
                    <div className={classes["choice__how"]}>
                        <Button type="primary" block className={classes[isChoice != 0 ? 'hide' : '']} onClick={() => handleChoice(1)}> HOW TO PLAY ? </Button>
                        <div className={`${classes["how__popup"]} ${isChoice === 0 ? classes["hide"] : ''}`}>

                            <div className={classes["how__popup__depcription"]}>
                                Yes or No is a fun and addicting game, perfect for playing on your own or with friends or family, This game contains hundreds of the best hand picked Yes or No questions. Vote which option you prefer and view real time statistics on what option was the most popular.
                            </div>
                            <Button
                                type="primary"
                                icon={<PoweroffOutlined />}
                                onClick={() => handleChoice(0)}
                            />
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default index



