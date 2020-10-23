import React from 'react';
const ToggleSwitch = props => {
	return (
		<div className='ToggleSwitch ToggleSwitch__rounded'>
			<div className='ToggleSwitch__wrapper'>
				<div className={`Slider ${props.checked && 'isChecked'}`} onClick={()=>props.toggleSwitchChange()}></div>
			</div>
		</div>
	);
}

export default ToggleSwitch