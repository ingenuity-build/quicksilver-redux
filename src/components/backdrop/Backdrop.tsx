import React from 'react';
import './Backdrop.css';
import {  setModalClose } from '../../slices/connectWalletModal';

import { useDispatch} from 'react-redux';

export default function  Backdrop() {
  const dispatch = useDispatch();
  const onBackdropClick = () => {
    // @ts-expect-error
  dispatch(setModalClose());

}
    return <div className='backdrop'  />;
  }
  
