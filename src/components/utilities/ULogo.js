import React from 'react';
import BlackOutlined from './../../static/images/extruder/Unite3D-extruder-black-no-background.png';
import PurpleOutlined from './../../static/images/extruder/Unite3D-extruder-purple-no-background.png';
import WhiteOutlined from './../../static/images/extruder/Unite3D-extruder-white-no-background.png';
import Long from './../../static/images/extruder/Unite3D-long-logo.png';

export default (props) => {
    const logoSource = () => {
        if (props.long) {
            return Long;
        }
        switch (props.color) {
            case 'purple':
                return PurpleOutlined;
            case 'white':
                return WhiteOutlined;
            default:
                return BlackOutlined;
        }
    };

    return <img alt={'Unite3D'} src={logoSource()} height={props.height} />;
};
