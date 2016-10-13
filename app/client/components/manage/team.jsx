/**
 * Created by YouHan on 2016/9/19.
 */
/* @flow */
"use strict";

import React from "react";
import {Form, Input, Card, Col, Row, Button, message} from "antd";
import Api from "./../api";
import CommonSelect from "./../common/commonSelect";

const FormItem = Form.Item;

const Item = React.createClass({
    getDefaultProps(){
        return {
            data: {}
        }
    },
    render() {
        const {nameChange, descChange, save, memberSelect} = this.props;

        return (
            <Card style={{
                    marginBottom : '15px'
                }}>
                <Form horizontal>
                    <Row gutter={0}>
                        <Col span={8}>
                            <FormItem
                                label="Team Name"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <Input size="default" value={this.props.data.name}
                                       onChange={nameChange}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16}>
                            <FormItem
                                label='Member'
                                labelCol={{span :5}}
                                wrapperCol={{span :19}}
                            >
                                <CommonSelect value={this.props.data.member_ids}
                                              onChange={memberSelect}
                                              url="/member/all" multiple={true}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={0}>
                        <Col span={16}>
                            <FormItem
                                label="Team Description"
                                labelCol={{span : 5}}
                                wrapperCol={{span : 19}}
                            >
                                <Input type="textarea" rows={4} value={this.props.data.desc}
                                       onChange={descChange}/>
                            </FormItem>
                        </Col>
                        <Col span="8" offset={8}>
                            <FormItem
                                labelCol={{span : 10}}
                                wrapperCol={{span : 14}}
                            >
                                <Button type="primary" onClick={save}>{
                                    this.props.data.id ? 'Update' : 'Save'
                                }</Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Card>
        )
    }
});

const Team = React.createClass({
    getInitialState(){
        return {
            list: [],
            obj: {}
        }
    },
    componentWillMount() {
        this.loadData();
    },
    loadData (){
        Api.Team.get().then((res) => {
            if (res && res.data) {
                this.setState({
                    list: res.data,
                    obj: {}
                })
            }
        });
    },
    save(key){
        var me = this;
        if (key) {
            Api.Team.update(this.state.list[key - 1]).then((res) => {
                if (res && res.success) {
                    message.success('Save Success!');
                    me.loadData();
                }
            });
        } else {
            Api.Team.add({
                name: this.state.obj.name,
                desc: this.state.obj.desc
            }).then((res) => {
                if (res && res.success) {
                    message.success('Save Success!');
                    me.loadData();
                }
            });
        }
    },
    nameChange (key, e){
        var value = e.target.value;
        if (key) {
            this.state.list[key - 1].name = value;
        } else {
            this.state.obj.name = value;
        }
        this.setState(this.state);
    },
    descChange(key, e){
        var value = e.target.value;
        if (key) {
            this.state.list[key - 1].desc = value;
        } else {
            this.state.obj.desc = value;
        }
        this.setState(this.state)
    },
    memberSelect (key, value){
        if (key) {
            this.state.list[key - 1].member_ids = value;
        } else {
            this.state.obj.member_ids = value;
        }
        this.setState(this.state)
    },
    render() {
        return (
            <div style={{
                padding : '12px 30px',
                width : '100%',
                height : window.innerHeight,
                overflow : 'auto'
            }}>
                <Item save={this.save.bind(this, null)}
                      nameChange={this.nameChange.bind(this, null)}
                      descChange={this.descChange.bind(this, null)}
                      memberSelect={this.memberSelect.bind(this, null)}
                      data={this.state.obj}
                />
                {this.state.list.map((item, key) => {
                    return (
                        <Item data={item} key={key}
                              save={this.save.bind(this, key+1)}
                              nameChange={this.nameChange.bind(this, key+1)}
                              descChange={this.descChange.bind(this, key+1)}
                              memberSelect={this.memberSelect.bind(this, key+1)}
                        />
                    )
                })}
            </div>
        )
    }
});

export default Team;