import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {

  class ComposedComponent extends Component {

    // ログインを監視するということは、以下を各コンポーネントに入れなければならない
    // DRYではない・・・　ので、HOCによってそれを回避できる。
    // Out component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }

    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if(!this.props.auth) {
        this.props.history.push('/');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth };
  }

  return connect(mapStateToProps)(ComposedComponent);
};
