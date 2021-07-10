import React from 'react';
import { Route, Switch } from 'react-router-dom';
import VideoRoomComponent from './VideoRoomComponent';

import { Meet } from './Meet';

function VideoCall({ match }) {
    const { path } = match;
    
    const element = (
        <div className="p-4">
            <div className="container">
                <Switch>
                    <Route exact path={`${path}`} component={Meet} />
                    <Route path={`${path}/room`} component={VideoRoomComponent} />
                </Switch>
            </div>
        </div>
    );
	return element;
}

export { VideoCall };