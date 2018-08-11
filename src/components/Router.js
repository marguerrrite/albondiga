import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppContainer from "./AppContainer";
import Enter from "./Enter/Enter";
import NotFound from "./NotFound/NotFound";


const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/albondiga/" component={Enter} />
            <Route path="/albondiga/:albondigaId" component={AppContainer} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
)

export default Router;