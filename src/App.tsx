import React, {Suspense} from 'react';
import AppRouter from "./router/AppRouter";

function App() {

    return (
        <div id='app' className='App' style={{
            width: '80%',margin:"0 auto",
        }} >
                <Suspense fallback="">
                    <div className="content-page">
                        <AppRouter />
                    </div>
                </Suspense>
        </div>
    );
}
export default App;
