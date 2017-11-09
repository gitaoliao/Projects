import React from 'react'
import './musiclistitem.less'
import Pubsub from 'pubsub-js'

let MusicListItem = React.createClass({
    playMusic(musicItem){
        //发布出去的事件名，统一全用大写
        Pubsub.publish('PLAY_MUSIC', musicItem);
    },
    deleteMusic(musicItem, e){
        e.stopPropagation();
        Pubsub.publish('DELETE_MUSIC', musicItem);
    },
    render(){
        let musicItem = this.props.musicItem;
        return (
            //onClick传过去的是一个函数句柄，而不是一个可执行的函数,使用bind进行传参，绑定他的作用域同时传参
            //由于事件冒泡的原因，p元素的click会传递到整个li上。点击删除会触发音乐播放这个事件
            <li onClick={this.playMusic.bind(this, musicItem)} className={`components-musiclistitem row ${this.props.focus? 'focus' :''}`}>
                <p><strong>{musicItem.title}</strong>-{musicItem.artist}</p>
                <p onClick={this.deleteMusic.bind(this, musicItem)} className="-col-auto delete"></p>
            </li>
        );

    }

});

export default MusicListItem;