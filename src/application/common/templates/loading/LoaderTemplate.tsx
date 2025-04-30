import React from "react";
import colors from "../../../../colors";

const Loading = require('react-fullscreen-loading').default;


const Loader: React.FC<any> = (props: any) => {
    return <Loading
        loading={props.loading}
        background={`rgba(${colors.primaryLightInRgb}, .5)`}
        loaderColor={colors.primary}
    />
}

export default Loader;
