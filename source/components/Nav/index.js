// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';

// Actions
import { authActions } from '../../bus/auth/actions';

// Instruments
import Styles from './styles.m.css';
import { book } from '../../navigation/book';

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.get('isAuthenticated'),
        profile:         state.profile,
        isOnline:        state.ui.get('isOnline'),
    };
};

@connect(
    mapStateToProps,
    { logoutAsync: authActions.logoutAsync }
)
export default class Nav extends Component {
    _getNav = () => {
        const { isAuthenticated, profile } = this.props;

        return isAuthenticated ? (
            <>
                <div>
                    <NavLink activeClassName = { Styles.active } to = { book.profile }>
                        <img src = { profile.get('avatar') } />
                        {profile.get('firstName')}
                    </NavLink>
                    <NavLink activeClassName = { Styles.active } to = { book.feed }>
                        Анкетирование
                    </NavLink>
                </div>
                <button onClick = { this._logout }>Выйти</button>
            </>
        ) : (
            <>
                <div>
                    <NavLink activeClassName = { Styles.active } to = { book.login }>
                        Войти
                    </NavLink>
                    <NavLink activeClassName = { Styles.active } to = { book.signup }>
                        Регистрация
                    </NavLink>
                </div>
                <button className = { Styles.hidden }>Выйти</button>
            </>
        );
    };

    _logout = () => {
        this.props.logoutAsync();
    };

    render () {
        const navigation = this._getNav();

        const { isOnline } = this.props;
        const statusStyle = cx(Styles.status, {
            [Styles.online]:  isOnline,
            [Styles.offline]: !isOnline,
        });

        return (
            <section className = { Styles.navigation }>
                {/*<div className = { statusStyle }>*/}
                    {/*<div>{isOnline ? 'Онлайн' : 'Офлайн'}</div>*/}
                    {/*<span />*/}
                {/*</div>*/}
                {navigation}
            </section>
        );
    }
}
