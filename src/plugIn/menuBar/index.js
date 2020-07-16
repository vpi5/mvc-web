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
        let {menuArr, menuAction, forbidClick} = data;
        forbidClick = forbidClick || [];
        if(!menuArr || menuArr.constructor !== Array){
            console.error('menuArr 不存在或不是一个Array！');
            return null;
        }
        if(!menuAction || menuAction.constructor !== String){
            console.error('menuAction 不存在或不是一个String！');
            return null;
        }
        return {menuArr, menuAction, forbidClick};
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
        let {menuArr, menuAction, forbidClick} = this.state;
        return (
            <div className={'menuBar'}>
                {
                    menuArr && menuArr.map(item => {
                        return (
                            <div
                                key={item.key}
                                onClick={this.handleMenuListClick.bind(this, item)}
                                className={`menuBar_list ${menuAction === item.key ? 'menuBar_list_action' : ''} ${forbidClick.indexOf(item.key) !== -1 ? 'menuBar_list_not' : ''}`}
                            >
                                {item.zn_name}
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
