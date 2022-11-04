import classes from './Modal.module.css';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom'
const Backdrop:React.FC<{onclose:()=>void}> = (props) =>{
    return <div className={classes.backdrop} onClick={props.onclose}/>
}

const ModalOverlay: React.FC<{children:React.ReactNode}> = (props)=>{
    return (<div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>)
}

const portalElement = document.getElementById('overlays')!;

const Modal: React.FC<{children:React.ReactNode, onClose:()=>void}> = (props) =>{

    return (
        <Fragment>
           {ReactDOM.createPortal(<Backdrop onclose={props.onClose}/>,portalElement)}
           {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
        </Fragment>
    )
}

export default Modal;