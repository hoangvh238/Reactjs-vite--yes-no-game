import React from 'react';
import { Form, Input, Button } from 'antd';
import classes from "./style.module.scss";

const CreateName = ({onFinish, setIsManager }) => {
  return (
    <div className={classes["create__name"]}>
      <div className={classes["create__name__box"]}>
        <div className={classes["box__tiltle"]}>
          Please enter a new game
        </div>
        <div className={classes["box__group"]}>
          <div>New name</div>
          <Form onFinish={onFinish}>
            <Form.Item
              name="playerName"
            >
              <Input placeholder="Enter name..." />
            </Form.Item>
            <Form.Item className={classes["box__group__btn"]}>
              <Button type="primary" htmlType="submit" >
                Add Player
              </Button>
              <Button danger onClick={() => setIsManager(true)} >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateName;
