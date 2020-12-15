import React from 'react';
import '../style/Browsing.css';

export default class BrowsingNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navItems: props.navItems,
            handleClick: props.handleClick,
            selected: props.selected,
        };
    }

    handleClick(item) {
        this.setState({
            selected: item,
        });
        console.log(item.title);
        console.log(this.state.selected.title);
        this.state.handleClick(item);
    }

    render() {
        return (
            <nav>
                <ul className='nav-menu'>
                    {this.state.navItems &&
                        this.state.navItems.map((item, index) => {
                            return (
                                <li
                                    style={{fontWeight: this.state.selected.title === item.title ? 'bold' : 'normal'}}
                                    className='nav-menu-clickable'
                                    onClick={() => this.handleClick(item)}
                                    key={index}>
                                    {item.title}
                                </li>
                            );
                        })}
                </ul>
            </nav>
        );
    }
}
