import React, {Component} from 'react'
import {Button, message} from "antd";
import {Redirect} from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'
import ReactEcharts from 'echarts-for-react'

import './style.css'

interface CourseItem {
    title: string;
}

interface State {
    loaded: boolean,
    isLogin: boolean,
    dataList: {
        [key: string]: CourseItem[]
    }
}

// class Home extends Component<{}, State> {
class Home extends Component {
    // constructor(props:{}) {
    //     super(props)
    // }
    state: State = {
        loaded: false,
        isLogin: true,
        dataList: {}
    }

    async componentDidMount() {
        const {data: res} = await axios.get('/api/isLogin')
        if (!res.data) {
            this.setState({
                isLogin: false,
                loaded: true
            })
        } else {
            this.setState({
                loaded: true
            })
        }
    }

    handleClickLoginout = async (e: React.MouseEvent) => {
        const {data: res} = await axios.get('/api/logout')
        console.log(res);
        if (res.data) {
            this.setState({
                isLogin: false,
            })
        }
    }

    handleClickGetData = async (e: React.MouseEvent) => {
        const {data: res} = await axios.get('/api/getData')
        console.log(res);
        if (res.data) {
            message.success('爬取成功')
        }
    }

    handleClickShowData = async (e: React.MouseEvent) => {
        const {data: res} = await axios.get('/api/showData')
        console.log(res);
        if (res.data) {
            this.setState({
                dataList: res.data
            })
            console.log(res.data);
        }
    }
    getOption: () => echarts.EChartOption = () => {
        const {dataList} = this.state
        const courseNames: string[] = []
        const times:string[] = []
        for (let i in dataList) {
            const item = dataList[i]
            times.push(moment(Number(i)).format('MM-DD HH:mm'))
            item.forEach(innerItem => {
                const {title} = innerItem
                if (courseNames.indexOf(title) === -1) {
                    courseNames.push(title)
                }
            })
        }
        console.log(courseNames);
        console.log(times);

        return {
            title: {
                text: '折线图堆叠'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                // data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
                data: courseNames
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                data: times
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '视频广告',
                    type: 'line',
                    stack: '总量',
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: '直接访问',
                    type: 'line',
                    stack: '总量',
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: '搜索引擎',
                    type: 'line',
                    stack: '总量',
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };

    }

    render() {
        const {isLogin, loaded} = this.state
        if (isLogin) {
            if (loaded) {
                return (
                    <div className="home-page">
                        <div className="buttons">
                            <Button type="primary" onClick={this.handleClickGetData}>爬取</Button>
                            <Button type="primary" onClick={this.handleClickShowData}>展示</Button>
                            <Button type="primary" onClick={this.handleClickLoginout}>退出</Button>
                        </div>
                        <ReactEcharts option={this.getOption()}/>
                    </div>
                )
            }
            return null
        } else {
            return (
                <Redirect to="/login"/>
            )
        }
    }
}

export default Home
