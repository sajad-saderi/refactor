import React, { useContext, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import languageCTX from '../../context/languageCTX';
import fa from '../../../public/languages/fa.json';
import en from '../../../public/languages/en.json';
let setTimer = null;

const Toast = (props: IToast) => {
	const { activeLanguage } = useContext(languageCTX);
	useEffect(() => {
		if (props.autoClose) {
			setTimer = setTimeout(
				() => props.closeHandler(),
				props.time * 1000 + 500,
			);
		}

		// reset the timer
		return () => {
			clearTimeout(setTimer);
		};
	}, []);

	return (
		<div className='toast_container'>
			<div
				className='toast_div'
				style={{
					backgroundColor: props.color ? props.color : '#03a596',
				}}
			>
				{/* close icon */}
				<IoMdClose
					size='2rem'
					color='#fafafa'
					onClick={() => props.closeHandler()}
				/>
				{/* message section */}
				<p className='message'>
					{typeof props.message !== 'object'
						? props.message
						: activeLanguage === 'fa'
						? fa.COMMON.thereIsAnError
						: en.COMMON.thereIsAnError}
				</p>
				{/* time bar */}
				{props.time > 0 && !props.hideTimeBar && (
					<span
						style={{
							animationDuration: `${props.time}s`,
						}}
						className='time_bar'
					></span>
				)}
			</div>
		</div>
	);
};

interface IToast {
	/**
	 * @message
	 * set the message of toast
	 */
	message: string;
	/**
	 * @closeHandler
	 * listen to click on a close icon or ending the time
	 */
	closeHandler: any;
	/**
	 * @time
	 *  you can set how many second should toast shown
	 */
	time?: number;
	/**
	 * @autoClose
	 * should component disappear after a while or not
	 */
	autoClose?: boolean;
	color?: string;
	hideTimeBar?: boolean;
}

export default Toast;
