import React from 'react';
import { Form, Input, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import classes from "./style.module.scss";

const CreateName = ({ onFinish, setIsManager }) => {
  return (
    <div className={classes["create__name"]}>
      <div className={classes["create__name__box"]}>
        <Button className={classes["box__close"]} shape="circle" danger icon={<CloseOutlined />} onClick={() => setIsManager(true)} />
        <div className={classes["box__tiltle"]}>
          Enter new name
        </div>
        <div className={classes["box__group"]}>
          <Form onFinish={onFinish}>
            <Form.Item
              name="playerName"
            >
              <Input placeholder="Enter name..." style={{ width: '100%', fontWeight: "bold" }} />
            </Form.Item>
            <Form.Item className={classes["box__group__btn"]}>
              <Button type="primary" htmlType="submit" style={{ width: '40%', fontWeight: "bold" }} >
                Add Player
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateName;
