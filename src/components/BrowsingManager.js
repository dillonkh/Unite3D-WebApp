import React from 'react';
import BrowsingNav from './BrowsingNav';
import ImageCard from './ImageCard';
import '../style/Browsing.css';
import {withRouter} from 'react-router-dom';
import {urls} from './Main';
import ClipLoader from 'react-spinners/ClipLoader';

import {
    getMyModels,
    getMyOffers,
    getMyJobsInProgress,
    getMyCompletedPrints,
    getNewJobs,
    getMyBids,
    getCurrentJobs,
    getPastJobs,
    refreshJWT,
    setUser,
} from '../Backend';

class BrowsingManger extends React.Component {
    constructor(props) {
        super(props);
        if (!localStorage.authToken) {
            props.history.push(urls.login);
        }
        this.modelerNavItems = [
            {
                title: 'Models',
                api: getMyModels,
            },
            {
                title: 'My Offers',
                api: getMyOffers,
            },
            {
                title: 'Jobs In Progress',
                api: getMyJobsInProgress,
            },
            {
                title: 'Completed Prints',
                api: getMyCompletedPrints,
            },
        ];

        this.vendorNavItems = [
            {
                title: 'New Jobs',
                api: getNewJobs,
            },
            {
                title: 'My Bids',
                api: getMyBids,
            },
            {
                title: 'Current Jobs',
                api: getCurrentJobs,
            },
            {
                title: 'Past Jobs',
                api: getPastJobs,
            },
        ];
        this.state = {
            imageCards: [],
            selectedNavItem: {},
            navItems: {},
        };
    }

    async componentDidMount() {
        let user = await refreshJWT();
        setUser(user);
        if (user.is_vendor) {
            this.setState(
                {
                    selectedNavItem: this.vendorNavItems[0],
                    navItems: this.vendorNavItems,
                },
                await this.gatherModels,
            );
        } else {
            this.setState(
                {
                    selectedNavItem: this.modelerNavItems[0],
                    navItems: this.modelerNavItems,
                },
                await this.gatherModels,
            );
        }
    }

    async gatherModels() {
        let modelInfo = await this.state.selectedNavItem.api();
        let imageCards = [];
        modelInfo.forEach((model) => {
            imageCards.push(<ImageCard selectedNavigation={this.state.selectedNavItem} model={model} key={model.id} />);
        });
        this.setState({imageCards: imageCards});
    }

    handleNavClick = async (navItem) => {
        // console.log(navItem);
        this.setState(
            {
                selectedNavItem: navItem,
            },
            await this.gatherModels, // callback.. notice it doesn't have the () because we're not executing it, we're passing it in.
        );
    };

    render() {
        if (!this.state.navItems.length) {
            return (
                <div className='sweet-loading'>
                    <ClipLoader
                        css={`
                            display: block;
                            margin: 0 auto;
                            border-color: #9d19d5;
                        `}
                        size={150}
                        color={'#123abc'}
                        loading={!this.state.navItems.length}
                    />
                </div>
            );
        } else if (!this.state.imageCards.length) {
            return (
                <BrowsingNav
                    className='browsing-nav'
                    navItems={this.state.navItems}
                    handleClick={this.handleNavClick}
                    selected={this.state.selectedNavItem}
                />
            );
        } else {
            return (
                <div>
                    <BrowsingNav
                        className='browsing-nav'
                        navItems={this.state.navItems}
                        handleClick={this.handleNavClick}
                        selected={this.state.selectedNavItem}
                    />
                    <section className='browsing-grid'>{this.state.imageCards}</section>
                </div>
            );
        }
    }
}
export default withRouter(BrowsingManger);
