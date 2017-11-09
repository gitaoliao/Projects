import React from 'react';
import Header from './components/header.js'
import Player from './page/playerr.js'
import MusicList from './page/musiclist.js'
import { MUSIC_LIST } from './config/musiclist.js'
import {Router,IndexRoute,Link, Route, hashHistory} from 'react-router'
import Pubsub from 'pubsub-js'

let App = React.createClass({
    getInitialState(){
        return  {
            musicList: MUSIC_LIST,
            currentMusicItem: MUSIC_LIST[0],
            repeatMode: 'cycle'

        }
    },
    playMusic(musicItem) {
        $('#player').jPlayer('setMedia', {
            mp3: musicItem.file
        }).jPlayer('play');
        this.setState({
            currentMusicItem: musicItem
        })
    },
    playNext(type = 'next'){
        let index = this.findMusicIndex(this.state.
            currentMusicItem);
        let newIndex = null;
        let musicListLength = this.state.musicList.length;
        if (type === 'next') {
            newIndex = (index + 1) % musicListLength;
        } else {
            newIndex = (index - 1 + musicListLength) %
                musicListLength;
        }
        this.playMusic(this.state.musicList[newIndex]);
    },
    //don't repeat yourself
    findMusicIndex(musicItem){
        return this.state.musicList.indexOf(musicItem);
    },
    playWhenEnd(){
        if(this.state.repeatMode === 'random'){
            let randomIndex = Math.floor(Math.random() * this.state.musicList.length);
            while(this.state.currentMusicItem === this.state.musicList[randomIndex])
            {
                randomIndex = Math.floor(Math.random() * this.state.musicList.length);
            };
            this.playMusic(this.state.musicList[randomIndex]);
        }else if(this.state.repeatMode === 'once'){
            this.playMusic(this.state.currentMusicItem);
        }else{
            this.playNext();
        }

    },




    //有事件绑定一定要有解绑。
    componentDidMount(){
        $('#player').jPlayer({
            supplied: 'mp3',
            wmode: 'window'

        });
        this.playMusic(this.state.currentMusicItem);
        //监听事件是放在$.jPlayer下
        $('#player').bind($.jPlayer.event.ended, (e) => {
            this.playWhenEnd();
        });

        //订阅器//箭头函数第一个参数是pubsub传递过来的参数，第二个参数是我们的参数
        Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
            this.setState({
                musicList: this.state.musicList.filter(item => {
                    return item !== musicItem;
                })
            });
        });
        Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
            this.playMusic(musicItem);

        });
        Pubsub.subscribe('PLAY_PREV', (msg) => {
            this.playNext('prev');
        });
        Pubsub.subscribe('PLAY_NEXT', (msg) => {
            this.playNext();
        });
        let repeatList = [
            'cycle',
            'random',
            'once'
        ];
        Pubsub.subscribe('REPEAT_CHANGE', (msg) => {
            let index = repeatList.indexOf(this.state.repeatMode);
            let repeatListLength = repeatList.length;
            index = index + 1;
            this.setState({
                repeatMode: repeatList[index % repeatListLength]
            });
        });





    },
    componentWillUnmount() {
        Pubsub.unsubscribe('DELETE_MUSIC');
        Pubsub.unsubscribe('PLAY_MUSIC');
        Pubsub.unsubscribe('PLAY_PREV');
        Pubsub.unsubscribe('PLAY_NEXT');
        Pubsub.unsubscribe('REPEAT_CHANGE');
        $('#player').unbind($.jPlayer.event.ended);
    },

    render(){
        return(
            <div>
                <Header/>
                {React.cloneElement(this.props.children, this.state)}

            </div>

        )
    }
});


let Root = React.createClass({
    render() {
        return(
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Player}></IndexRoute>
                    <Route path="/list" component={MusicList}></Route>
                </Route>
            </Router>
        );
    }

});

export default Root;