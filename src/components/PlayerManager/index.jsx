import React from 'react';
import { Form, Input, Button, Divider, Table } from 'antd';
import classes from "./style.module.scss";

const index = ({players, columns, onStart, setIsManager }) => {
    return (
        <div className={classes["create__manager"]}>
            <Divider style={{ fontWeight: "bold", fontSize: "26px" }}>PLAYER MANAGER</Divider>
            <Table
                columns={columns}
                dataSource={players}
                size="middle"
                pagination={{ pageSize: 3 }}
            />
            <Divider style={{ fontWeight: "italic", fontSize: "15px",color:"red" }} >{(players.length > 1) ? "" : "ADD AT LEAST 2 PLAYERS TO PLAY"}</Divider>
            <Button onClick={() => setIsManager(false)} >
                ADD MORE PLAYER
            </Button>
            <Divider style={{ fontWeight: "bold", fontSize: "16px" }} >{players.length > 1 ? "INPUT ROUND TO START" : ""}</Divider>
            <Form onFinish={onStart}>
                <Form.Item
                    name="round"
                >
                    <Input placeholder="Enter round..." disabled={players.length > 1 ? false : true} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={players.length > 1 ? false : true}>
                        START GAME
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}

export default index