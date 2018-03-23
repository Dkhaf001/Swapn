import React from "react";
import io from "socket.io-client";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import randomstring from 'randomstring';
import { addCurrentRoomId } from '../../actions' 
class Chattest extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: [],
            roomId:''
        };
        const addMessage = data => {
            console.log('Username is', this.state.username);
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            console.log('u trying to send a meesage')
            this.props.socket.emit('message', {
                from: this.props.active_user.username,
                to: 'shayne002' || this.props.post.username,
                postId: 1 || this.props.current_post.id || this.props.post.id,
                roomId: this.props.current_roomId,
                message: this.state.message
            })
            this.setState({message: ''});
        }
    }
    async genarateRoomId(){
        return this.props.current_roomId ? this.props.current_roomId : randomstring.generate();
    }
    async componentWillMount () {  
        try{
            console.log('inside of chattest this is the socket', this.props.socket)
            const roomId = await this.genarateRoomId() ;
            this.props.addCurrentRoomId(roomId);
            this.props.socket.emit('joinRoom',  {roomId});
        } catch(err) {
            console.log('err in chattest ', err)
        }
        
    }
    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Barter Chatt</div>
                                <hr/>
                                <div className="messages">
                                    {this.state.messages.map((message,key) => {
                                        return (
                                            <div key={key}>{message.author}: {message.message}</div>
                                        )
                                    })}
                                </div>

                            </div>
                            <div className="card-footer">
                                {/* <input type="text" placeholder="Username" value={this.state.username}
                                 onChange={ev => this.setState({username: ev.target.value})} className="form-control"/> */}
                                <br/>
                                <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                <br/>
                                <button onClick={(e)=>this.sendMessage(e)} className="btn btn-primary form-control">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addCurrentRoomId: addCurrentRoomId
    },dispatch)
}
function mapStateToProps(state) {
    return {
      socket: state.socket,
      active_user: state.active_user,
    //   current_post: current_post,
      dataFromReduxStorage: state.dataReducers,
      current_roomId: state.current_roomId
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Chattest);