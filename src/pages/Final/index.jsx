import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Input } from 'antd';
import classes from './style.module.scss';

function index() {

  const navigate = useNavigate();
  const [score, setScore] = useState({
    name: '',
    score: 0,
    count: 0
  });

  const [data, setData] = useState([]);
  const [round, setRound] = useState();
  const [isCalculate, setIsCalculate] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [fillData, setFillData] = useState([]);
  const columns = [
    {
      title: 'No.',
      dataIndex: 'id',
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 2,
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      },
    },
    {
      title: 'Date',
      dataIndex: 'createAt',
      sorter: {
        compare: (a, b) => a.date - b.date,
        multiple: 0,
      },
    },
    {
      title: 'Answers',
      dataIndex: 'answers',
      render: (answers) => answers.join(', '),
    },
    {
      title: 'Results',
      dataIndex: 'results',
      render: (results) => results.join(', '),
    },
    {
      title: 'Score',
      dataIndex: 'score',
      sorter: {
        compare: (a, b) => a.score - b.score,
        multiple: 2,
      },
    },
  ];

  const summaryColumns = [
    {
      title: 'Summary',
      dataIndex: 'name',

    },
    {
      title: 'Correct percent',
      render: (text, record) => {
        const score = record.score;
        const percent = (score / round) * 100;
        return `${percent.toFixed(2)}%`;
      },

      sorter: {
        compare: (a, b) => a.score - b.score,
        multiple: 1,
      },
    },

    {
      title: 'Total score',
      dataIndex: 'score',
      sorter: {
        compare: (a, b) => a.score - b.score,
        multiple: 1,
      },
    }
  ];

  const getScore = (() => {
    return data.map((data) => {
      let count = 0;
      for (let i = 0; i < round; i++) {
        if (data.answers[i] == data.results[i]) count++;
      }
      return { ...data, score: count };
    });
  });

  const findWinner = (name, newScore) => {
    setScore((prevScore) => {
      if (newScore > prevScore.score) {
        return {
          name: name,
          score: newScore,
          count: 0
        };
      } else if (newScore === prevScore.score) {
        return {
          ...prevScore,
          count: prevScore.count + 1
        };
      } else {
        return prevScore;
      }
    });
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data'));
    const round = JSON.parse(localStorage.getItem('round'));
    setData(data);
    setRound(round);
  }, []);

  useEffect(() => {
    if (data.length == 0 || isCalculate) return;
    let playerScore = getScore();
    setData(playerScore);

    playerScore.map((playerScore) => {
      findWinner(playerScore.name, playerScore.score);
    });

    setIsCalculate(true);
  }, [data]);

  useEffect(() => {
    if (searchKey == "") return;
    setFillData(data.filter(obj => obj.name === searchKey));
  }, [searchKey]);

  return (

    <div className={classes["container"]}>
      <div className={classes["summary"]}>
        SUMMARY
        <div className={classes["summary__information"]}>

          <div className={classes["summary__information__total"]}>
            <Input value={searchKey} onChange={(e) => setSearchKey(e.target.value)} onBlur={() => setSearchKey("")} placeholder="Enter name..." style={{ width: '40%',border:"1px solid black" }}></Input>
            <Table pagination={{ pageSize: 3 }} style={{ fontWeight: "bold" }} columns={columns} dataSource={!searchKey ? data : fillData}></Table>
          </div>
          <div className={classes["summary__information__specific"]}>
            <Table pagination={{ pageSize: 3 }} style={{ fontWeight: "bold" }} columns={summaryColumns} dataSource={data}></Table>
          </div>
        </div>
        <div className={classes["summary__winner"]}>{score.count != 0 ? "THE MATCH IS DRAWN !" : "THE WINNER IS : " + score.name.toLocaleUpperCase()}</div>
        <Button type='primary' onClick={() => { localStorage.setItem('data', null); navigate('/create') }} style={{ width: '30%', fontWeight: "bold", borderRadius: '20px' }} >PLAY AGAIN</Button>
      </div>
    </div>
  )
}

export default index


