import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props)=>{
  return(
    <div>Something {props.info}</div>
  );
};

const withAdminWarning = (WrappedComponent)=>{
  return (props)=>{
    return (
      <div>
        {props.isAdmin && <p>This is private info</p>}
        <WrappedComponent {...props} />
      </div>
    )
  };
};
const requireAuthentication = (WrappedComponent)=>{
  return (props)=>(
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <p>please login</p>
      )}
    </div>
  );
};
const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo info="These are the details" isAdmin={true} />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info="These are the details" isAdmin={true} />, document.getElementById('app'));