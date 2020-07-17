import {React} from "../../utils/react";
import './style.less';


export default class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        let option = this.handleVerifyData(props.option) || {};
        this.state = {
            menuArr : option.menuArr || [],
            menuAction : option.menuAction || '',
            forbidClick : option.forbidClick || [],
            moldType : option.moldType || '',
        }
    }

    componentWillReceiveProps(nextProps){
        let option = this.handleVerifyData(nextProps.option);
        if(!option){
            return;
        }
        this.setState({
            ...option
        });
    }

    // 数据校验
    handleVerifyData = (data) => {
        let {moldType, menuArr, menuAction, forbidClick} = data;
        forbidClick = forbidClick || [];
        if(!menuArr || menuArr.constructor !== Array){
            console.error('menuArr 不存在或不是一个Array！');
            return null;
        }
        if(!menuAction || menuAction.constructor !== String){
            console.error('menuAction 不存在或不是一个String！');
            return null;
        }
        if(!moldType || moldType.constructor !== String){
            console.error('moldType 不存在或不是一个String！');
            return null;
        }
        return {moldType, menuArr, menuAction, forbidClick};
    };

    // 菜单被点击
    handleMenuListClick = (item) => {
        let {forbidClick} = this.state;
        if(forbidClick.indexOf(item.key) !== -1){
            return;
        }
        this.setState({
            menuAction : item.key
        }, _ => {
            // 更新完成后 发送当前更新的 item
            let {option} = this.props;
            if(option.clickFun){
                option.clickFun(item);
            }
        });
    };

    render() {
        let {moldType, menuArr, menuAction, forbidClick} = this.state;
        return (
            moldType === 'PC' ?
                <div className={'menuBar_PC'}>
                    {
                        menuArr && menuArr.map(item => {
                            return (
                                <div
                                    key={item.key}
                                    onClick={this.handleMenuListClick.bind(this, item)}
                                    className={`menuBar_list_PC ${menuAction === item.key ? 'menuBar_list_action_PC' : ''} ${forbidClick.indexOf(item.key) !== -1 ? 'menuBar_list_not_PC' : ''}`}
                                >
                                    {item.zn_name}
                                </div>
                            )
                        })
                    }
                </div>
                :
                moldType === 'Mobile' ?
                    <div className={'menuBar_Mobile'}>
                        {
                            menuArr && menuArr.map(item => {
                                return (
                                    <div
                                        key={item.key}
                                        onClick={this.handleMenuListClick.bind(this, item)}
                                        className={`menuBar_Mobile_list`}
                                    >
                                        <span className={`menuBar_Mobile_list_span ${menuAction === item.key ? 'menuBar_Mobile_list_span_active' : ''} ${forbidClick.indexOf(item.key) !== -1 ? 'menuBar_Mobile_list_span_not' : ''}`}>{item.zn_name}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    :
                    ''
        );
    }
}
