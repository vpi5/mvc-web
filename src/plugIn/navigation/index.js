import {React} from '../../utils/react';
import './style.less';


/**
 *
 *  @param Navigation
 *
*/

export default class Navigation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text : '',
        };
    }

    componentDidMount(){
        let {option} = this.props;
        let text = this.handleData(option);
        if(!text){
            return;
        }
        if(option.btnHTML){
            this.navigation_btn.innerHTML = option.btnHTML;
        }
        this.setState({
            text,
        });
    }

    componentWillReceiveProps(nextProps){
        let {option} = nextProps;
        let text = this.handleData(option);
        if(!text){
            return;
        }
        if(option.btnHTML){
            this.navigation_btn.innerHTML = option.btnHTML;
        }
        this.setState({
            text,
        });
    }

    // 数据验证
    handleData = (data) => {
        if(!data.text || data.text.constructor !== String){
            console.error('text 不存在或不是一个String！');
            return null;
        }
        return data.text;
    };

    render(){
        let {text} = this.state;
        return (
            <div className={'navigation'}>
                <div className={'navigation_text'}>{text}</div>
                <div ref={dom => this.navigation_btn = dom} className={'navigation_btn'}/>
            </div>
        )
    }
}
