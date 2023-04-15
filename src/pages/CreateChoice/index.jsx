import { React, useState, useEffect } from 'react'
import { Button, Divider } from 'antd'
import { useNavigate } from 'react-router-dom';
import classes from "./style.module.scss";

function index() {
  const [round, setRound] = useState();
  const [players, setPLayers] = useState([]);
  const [answerList, setAnswerList] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const navigate = useNavigate();

  const handleChangeTurn = (e) => {
    if (currentPlayerIndex + e >= players.length) {
      navigate('/submit')
      return;
    }
    setCurrentPlayerIndex((currentIndex) => {
      const nextIndex = currentIndex + e;
      setAnswerList([]);
      return nextIndex;
    });
  };

  const handChangeChoice = (e, i) => {
    var newList = [...answerList];
    if (answerList[i] == e) {
      newList[i] = "EMPTY";
      setAnswerList(newList);
    }
    else {
      newList[i] = e;
      setAnswerList(newList);
    }
  }

  useEffect(() => {
    setRound(JSON.parse(localStorage.getItem('round')));
    let players = JSON.parse(localStorage.getItem('data'));
    setPLayers(players);
    setAnswerList(players[currentPlayerIndex].answers);
  }, []);

  useEffect(() => {
    if (answerList.length == 0) return;
    let updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex].answers = answerList;
    setPLayers(updatedPlayers);
    localStorage.setItem('data', JSON.stringify(players));
  }, [answerList]
  );

  useEffect(() => {
    localStorage.setItem('turn', JSON.stringify(currentPlayerIndex));
    let players = JSON.parse(localStorage.getItem('data'));
    setAnswerList(players[currentPlayerIndex].answers);
  }, [currentPlayerIndex]);

  return (
    <div>
      <div className={classes["container"]}>
        <div className={classes["choice"]}>
          <div className={classes["choice__name"]}><Divider style={{ fontWeight: "bold", fontSize: "26px" }}>{players[currentPlayerIndex]?.name} turn</Divider></div>
          <div className={classes["choice__selection"]}>
            {[...Array(round)].map((_, i) => (
              <div className={classes["choice__selection__box"]}>
                <div className={classes["box__round"]}><Divider  style={{ fontWeight: "bold", fontSize: "16px" }}>Round {i + 1}</Divider></div>
                <div className={classes["box__btn"]}>
                  <Button className={`${classes["btn"]} ${classes["btn__true"]} ${answerList[i] == 'YES' ? classes["btn__true--select"] : ''}`} onClick={() => { handChangeChoice('YES', i) }}> YES</Button>
                  <Button className={`${classes["btn"]} ${classes["btn__false"]} ${answerList[i] == 'NO' ? classes["btn__false--select"] : ''}`} onClick={() => { handChangeChoice('NO', i) }} >NO</Button>
                </div>
              </div>
            ))}
          </div>
          <div className={classes["choice__nav"]}>
            <Button className={classes["choice__nav__next"]} type='primary' disabled={currentPlayerIndex == 0} onClick={() => handleChangeTurn(-1)} >PREVIOUS</Button>
            <Button className={classes["choice__nav__previus"]} type='primary' onClick={() => handleChangeTurn(1)} >{currentPlayerIndex + 1 == players.length ? "SUBMIT NOW" : "NEXT"}</Button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default index