import React from 'react'
import MusciListItem from '../components/musiclistitem'

let MusicList = React.createClass({
    render() {
        let listEle = null;
        listEle = this.props.musicList.map((item) => {
            return (
                <MusciListItem
                    focus = {item === this.props.currentMusicItem}
                    key = {item.id}
                    musicItem = {item}
                >

                </MusciListItem>
            )
        });

        return(
            <ul>
                { listEle }
            </ul>
        );
    }


});

export default MusicList;