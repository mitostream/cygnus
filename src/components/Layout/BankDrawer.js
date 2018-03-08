import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { NavLink, Route } from "react-router-dom"
import { inject } from "../../lib/utils"

import Drawer from "material-ui/Drawer"

import { selectView } from "../../actions/index"

import "./BankDrawer.css"




// ...
class BalancesNavLinkCore extends Component {

    // ...
    selectBalances = this.props.selectView.bind(this, "Balances")


    // ...
    render = () =>
        <NavLink
            className="menu-item"
            onClick={this.selectBalances}
            exact
            activeClassName="active"
            to={this.props.basePath}
        >
            <i className="material-icons">account_balance_wallet</i>
            Balances
        </NavLink>

}


// ...
const BalancesNavLink = connect(
    // map state to props.
    null,

    // map dispatch to props.
    (dispatch) => bindActionCreators({
        selectView,
    }, dispatch)
)(BalancesNavLinkCore)




// ...
class PaymentsNavLinkCore extends Component {

    // ...
    selectPayments = this.props.selectView.bind(this, "Payments")


    // ...
    render = () =>
        this.props.accountInfo.exists ?
            <NavLink
                className="menu-item"
                onClick={this.selectPayments}
                exact
                activeClassName="active"
                to={this.props.basePath}
            >
                <i className="material-icons">payment</i>
                Payments
            </NavLink> :
            null

}


// ...
const PaymentsNavLink = connect(
    // map state to props.
    (state) => ({
        accountInfo: state.accountInfo,
        path : state.router.location.pathname,
    }),

    // map dispatch to props.
    (dispatch) => bindActionCreators({
        selectView,
    }, dispatch)
)(PaymentsNavLinkCore)




// ...
class AccountNavLinkCore extends Component {

    // ...
    selectAccount = this.props.selectView.bind(this, "Account")


    // ...
    render = () =>
        <NavLink
            className="menu-item"
            onClick={this.selectAccount}
            exact
            activeClassName="active"
            to={this.props.basePath}
        >
            <i className="material-icons">account_balance</i>
            Account
        </NavLink>

}


// ...
const AccountNavLink = connect(
    // map state to props.
    null,

    // map dispatch to props.
    (dispatch) => bindActionCreators({
        selectView,
    }, dispatch)
)(AccountNavLinkCore)




// ...
class BankDrawer extends Component {

    // ...
    static style = {
        width: 180,
        height: "calc(100% - 100px)",
        top: 65,
        borderTop: "1px solid #052f5f",
        borderBottom: "1px solid #052f5f",
        borderLeft: "1px solid #052f5f",
        borderTopRightRadius: "3px",
        borderBottomRightRadius: "3px",
        backgroundColor: "#2e5077",
    }


    // ...
    balancesPath = `${this.props.basePath}balances/`
    iBalancesNavLink = inject(BalancesNavLink, { basePath: this.balancesPath, })
    paymentsPath = `${this.props.basePath}payments/`
    iPaymentsNavLink = inject(PaymentsNavLink, { basePath: this.paymentsPath, })
    accountPath = `${this.props.basePath}account/`
    iAccountNavLink = inject(AccountNavLink, { basePath: this.accountPath, })


    // ...
    render = () =>
        <Drawer
            containerStyle={BankDrawer.style}
            open={this.props.drawerOpened}
        >
            <Route component={this.iBalancesNavLink} />
            <Route component={this.iPaymentsNavLink} />
            <Route component={this.iAccountNavLink} />
        </Drawer>

}


//
export default connect(
    // map state to props.
    (state) => ({
        drawerOpened: state.ui.drawer.isOpened,
    })
)(BankDrawer)