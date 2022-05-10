import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import propTypes from 'prop-types';

export default function(mapStateToProps,mapDispatchToProps){
   return function(WrapedComponent){
      class ProxyComponent extends Component{
          static contextTypes = {
            store:propTypes.object
          }
          constructor(props,context){
            super(props,context);
            this.store = context.store;
            this.state = mapStateToProps(this.store.getState());
          }
          componentWillMount(){
            this.unsubscribe = this.store.subscribe(()=>{
              this.setState(mapStateToProps(this.store.getState()));
            });
          }
          componentWillUnmount(){
            this.unsubscribe();
          }
          render(){
            let actions= {};
            if(typeof mapDispatchToProps == 'function'){
              actions = mapDispatchToProps(this.store.disaptch);
            }else if(typeof mapDispatchToProps == 'object'){
              console.log('object', mapDispatchToProps)
              // 通过 Redux 的辅助函数 bindActionCreators()，用dispatch监听每一个action。
              actions = bindActionCreators(mapDispatchToProps,this.store.dispatch);
            }
            return <WrapedComponent {...this.state} {...actions}/>
         }
      }
      return ProxyComponent;
   }
}
